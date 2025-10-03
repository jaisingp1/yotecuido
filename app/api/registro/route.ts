import { NextResponse } from "next/server"
import bcrypt from "bcryptjs"
import pool from "@/lib/db"

export async function POST(req: Request) {
  try {
    const { name, email, phone, location, password, userType } = await req.json()

    if (!name || !email || !password || !userType) {
      return NextResponse.json({ message: "Missing required fields" }, { status: 400 })
    }

    const connection = await pool.getConnection()

    try {
      // Check if user already exists
      const [existingUsers]: any = await connection.execute("SELECT * FROM users WHERE email = ?", [email])
      if (existingUsers.length > 0) {
        return NextResponse.json({ message: "User already exists" }, { status: 409 })
      }

      // Hash password
      const hashedPassword = await bcrypt.hash(password, 10)

      // Insert into users table
      const [userResult]: any = await connection.execute(
        "INSERT INTO users (name, email, password, phone, location, user_type) VALUES (?, ?, ?, ?, ?, ?)",
        [name, email, hashedPassword, phone, location, userType]
      )

      const userId = userResult.insertId

      // If user is a caregiver, insert into caregivers table with a default category
      // The category can be updated later in their profile
      if (userType === "caregiver") {
        await connection.execute("INSERT INTO caregivers (user_id, category) VALUES (?, ?)", [userId, 'ninos'])
      }

      return NextResponse.json({ message: "User created successfully", userId }, { status: 201 })
    } finally {
      connection.release()
    }
  } catch (error) {
    console.error("Registration error:", error)
    return NextResponse.json({ message: "Internal server error" }, { status: 500 })
  }
}