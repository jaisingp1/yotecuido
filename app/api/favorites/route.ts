import { NextResponse } from "next/server"
import pool from "@/lib/db"

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url)
    const userId = searchParams.get("userId")

    if (!userId) {
      return NextResponse.json({ message: "User ID is required" }, { status: 400 })
    }

    const connection = await pool.getConnection()

    try {
      const [favorites]: any = await connection.execute(
        `
        SELECT
          c.caregiver_id,
          u.name,
          u.avatar,
          c.category,
          c.hourly_rate,
          (SELECT AVG(r.rating) FROM reviews r JOIN bookings b ON r.booking_id = b.booking_id WHERE b.caregiver_id = c.caregiver_id) as rating,
          (SELECT COUNT(r.review_id) FROM reviews r JOIN bookings b ON r.booking_id = b.booking_id WHERE b.caregiver_id = c.caregiver_id) as reviews
        FROM favorites f
        JOIN caregivers c ON f.caregiver_id = c.caregiver_id
        JOIN users u ON c.user_id = u.user_id
        WHERE f.client_id = ?
      `,
        [userId]
      )

      return NextResponse.json(favorites, { status: 200 })
    } finally {
      connection.release()
    }
  } catch (error) {
    console.error("Favorites GET error:", error)
    return NextResponse.json({ message: "Internal server error" }, { status: 500 })
  }
}

export async function POST(req: Request) {
  try {
    const { userId, caregiverId, favorite } = await req.json()

    if (!userId || !caregiverId) {
      return NextResponse.json({ message: "User ID and Caregiver ID are required" }, { status: 400 })
    }

    const connection = await pool.getConnection()

    try {
      if (favorite) {
        // Add to favorites, ignoring if it already exists to prevent errors
        await connection.execute("INSERT IGNORE INTO favorites (client_id, caregiver_id) VALUES (?, ?)", [userId, caregiverId])
        return NextResponse.json({ message: "Favorite added" }, { status: 201 })
      } else {
        // Remove from favorites
        await connection.execute("DELETE FROM favorites WHERE client_id = ? AND caregiver_id = ?", [userId, caregiverId])
        return NextResponse.json({ message: "Favorite removed" }, { status: 200 })
      }
    } finally {
      connection.release()
    }
  } catch (error) {
    console.error("Favorites POST error:", error)
    return NextResponse.json({ message: "Internal server error" }, { status: 500 })
  }
}