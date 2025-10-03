import { NextResponse } from "next/server"
import pool from "@/lib/db"

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url)
    const category = searchParams.get("category")
    const minPrice = searchParams.get("minPrice")
    const maxPrice = searchParams.get("maxPrice")
    const searchQuery = searchParams.get("searchQuery")

    let query = `
      SELECT
        u.user_id,
        u.name,
        u.location,
        u.avatar,
        c.caregiver_id,
        c.category,
        c.experience,
        c.hourly_rate,
        c.description,
        c.is_available,
        (SELECT AVG(r.rating) FROM reviews r JOIN bookings b ON r.booking_id = b.booking_id WHERE b.caregiver_id = c.caregiver_id) as rating,
        (SELECT COUNT(r.review_id) FROM reviews r JOIN bookings b ON r.booking_id = b.booking_id WHERE b.caregiver_id = c.caregiver_id) as reviews
      FROM users u
      JOIN caregivers c ON u.user_id = c.user_id
      WHERE c.is_available = TRUE
    `
    const params: (string | number)[] = []

    if (category && category !== "all") {
      query += " AND c.category = ?"
      params.push(category)
    }

    if (minPrice) {
      query += " AND c.hourly_rate >= ?"
      params.push(parseFloat(minPrice))
    }

    if (maxPrice) {
      query += " AND c.hourly_rate <= ?"
      params.push(parseFloat(maxPrice))
    }

    if (searchQuery) {
      query += " AND (u.name LIKE ? OR u.location LIKE ?)"
      params.push(`%${searchQuery}%`, `%${searchQuery}%`)
    }

    const connection = await pool.getConnection()

    try {
      const [rows] = await connection.execute(query, params)
      return NextResponse.json(rows, { status: 200 })
    } finally {
      connection.release()
    }
  } catch (error) {
    console.error("Search error:", error)
    return NextResponse.json({ message: "Internal server error" }, { status: 500 })
  }
}