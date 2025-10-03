import { NextResponse } from "next/server"
import pool from "@/lib/db"

// Get all message threads for a user
export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url)
    const userId = searchParams.get("userId")

    if (!userId) {
      return NextResponse.json({ message: "User ID is required" }, { status: 400 })
    }

    const connection = await pool.getConnection()

    try {
      // This query gets the last message for each conversation a user is part of.
      const [threads]: any = await connection.execute(
        `
        WITH LastMessage AS (
          SELECT
            LEAST(sender_id, receiver_id) as user1,
            GREATEST(sender_id, receiver_id) as user2,
            MAX(message_id) as last_message_id
          FROM messages
          WHERE sender_id = ? OR receiver_id = ?
          GROUP BY user1, user2
        )
        SELECT
          m.message_id,
          m.message,
          m.created_at as timestamp,
          m.is_read,
          m.sender_id,
          other_user.user_id as other_user_id,
          other_user.name as other_user_name,
          other_user.avatar as other_user_avatar
        FROM messages m
        JOIN LastMessage lm ON m.message_id = lm.last_message_id
        JOIN users other_user ON (
          (lm.user1 = ? AND other_user.user_id = lm.user2) OR
          (lm.user2 = ? AND other_user.user_id = lm.user1)
        )
        ORDER BY m.created_at DESC;
      `,
        [userId, userId, userId, userId]
      )

      return NextResponse.json(threads, { status: 200 })
    } finally {
      connection.release()
    }
  } catch (error) {
    console.error("Messages GET error:", error)
    return NextResponse.json({ message: "Internal server error" }, { status: 500 })
  }
}

// Send a new message
export async function POST(req: Request) {
  try {
    const { senderId, receiverId, message } = await req.json()

    if (!senderId || !receiverId || !message) {
      return NextResponse.json({ message: "Sender, receiver, and message are required" }, { status: 400 })
    }

    const connection = await pool.getConnection()

    try {
      await connection.execute("INSERT INTO messages (sender_id, receiver_id, message) VALUES (?, ?, ?)", [
        senderId,
        receiverId,
        message,
      ])

      return NextResponse.json({ message: "Message sent successfully" }, { status: 201 })
    } finally {
      connection.release()
    }
  } catch (error) {
    console.error("Messages POST error:", error)
    return NextResponse.json({ message: "Internal server error" }, { status: 500 })
  }
}