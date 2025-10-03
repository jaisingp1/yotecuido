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
      const [bookings]: any = await connection.execute(
        `
        SELECT
          b.booking_id,
          b.booking_date,
          b.booking_time,
          b.status,
          b.price,
          b.location,
          s.name as service_name,
          u.name as caregiver_name,
          u.avatar as caregiver_avatar,
          c.category as caregiver_category
        FROM bookings b
        JOIN caregivers c ON b.caregiver_id = c.caregiver_id
        JOIN users u ON c.user_id = u.user_id
        JOIN services s ON b.service_id = s.service_id
        WHERE b.client_id = ?
        ORDER BY b.booking_date DESC
      `,
        [userId]
      )

      return NextResponse.json(bookings, { status: 200 })
    } finally {
      connection.release()
    }
  } catch (error) {
    console.error("Bookings error:", error)
    return NextResponse.json({ message: "Internal server error" }, { status: 500 })
  }
}