import { NextRequest, NextResponse } from "next/server"
import formidable, { File } from "formidable"
import fs from "fs/promises"
import path from "path"
import pool from "@/lib/db"

export const config = {
  api: {
    bodyParser: false,
  },
}

const REQUIRED_DOCUMENTS = ["antecedentes", "identidad", "referencia"]

const parseForm = (req: NextRequest): Promise<{ fields: formidable.Fields; files: formidable.Files }> => {
  return new Promise((resolve, reject) => {
    const uploadDir = path.join(process.cwd(), "public", "uploads")

    const form = formidable({
      uploadDir: uploadDir,
      keepExtensions: true,
      filename: (name, ext, part) => {
        // Sanitize filename and make it unique
        const sanitizedName = part.originalFilename?.replace(/[^a-zA-Z0-9_.-]/g, '_') || 'document';
        return `${sanitizedName}-${Date.now()}${ext}`
      },
    })

    form.parse(req as any, (err, fields, files) => {
      if (err) {
        reject(err)
      } else {
        resolve({ fields, files })
      }
    })
  })
}

export async function POST(req: NextRequest) {
  const connection = await pool.getConnection();
  let uploadedFilePath: string | undefined;

  try {
    const { fields, files } = await parseForm(req)

    const caregiverId = fields.caregiverId?.[0]
    const documentType = fields.documentType?.[0]
    const file = files.document?.[0] as File | undefined

    uploadedFilePath = file?.filepath;

    if (!caregiverId || !documentType || !file) {
      return NextResponse.json({ message: "Missing required fields or file" }, { status: 400 })
    }

    const documentUrl = `/uploads/${path.basename(file.filepath)}`

    await connection.beginTransaction()

    // Insert document record
    await connection.execute(
      "INSERT INTO caregiver_documents (caregiver_id, document_type, document_url, is_verified) VALUES (?, ?, ?, ?)",
      [caregiverId, documentType, documentUrl, false] // Documents are not verified automatically by default
    )

    // Check if all required documents are now uploaded
    const [uploadedDocs]: any = await connection.execute(
      "SELECT DISTINCT document_type FROM caregiver_documents WHERE caregiver_id = ?",
      [caregiverId]
    )

    const uploadedDocTypes = uploadedDocs.map((doc: any) => doc.document_type)
    const allDocsUploaded = REQUIRED_DOCUMENTS.every((docType) => uploadedDocTypes.includes(docType))

    // In a real-world scenario, verification would be a separate admin process.
    // For this project, we'll assume uploading all documents makes the caregiver available.
    if (allDocsUploaded) {
      await connection.execute("UPDATE caregivers SET is_available = TRUE WHERE caregiver_id = ?", [caregiverId])
    }

    await connection.commit()

    return NextResponse.json({ message: "Document uploaded successfully", documentUrl }, { status: 201 })
  } catch (error) {
    await connection.rollback()

    // If an error occurs after the file is uploaded, delete the orphaned file
    if (uploadedFilePath) {
      await fs.unlink(uploadedFilePath).catch(console.error)
    }

    console.error("Document upload error:", error)
    return NextResponse.json({ message: "Internal server error" }, { status: 500 })
  } finally {
    connection.release()
  }
}