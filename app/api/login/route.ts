import { NextResponse } from "next/server"
import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken"
import pool from "@/lib/db"

const JWT_SECRET = process.env.JWT_SECRET || "your-super-secret-key-that-should-be-in-env"

export async function POST(req: Request) {
  try {
    const { email, password } = await req.json()

    if (!email || !password) {
      return NextResponse.json({ message: "Email and password are required" }, { status: 400 })
    }

    const connection = await pool.getConnection()

    try {
      const [users]: any = await connection.execute("SELECT * FROM users WHERE email = ?", [email])

      if (users.length === 0) {
        return NextResponse.json({ message: "Invalid credentials" }, { status: 401 })
      }

      const user = users[0]

      const isPasswordValid = await bcrypt.compare(password, user.password)

      if (!isPasswordValid) {
        return NextResponse.json({ message: "Invalid credentials" }, { status: 401 })
      }

      const token = jwt.sign(
        {
          userId: user.user_id,
          name: user.name,
          email: user.email,
          userType: user.user_type,
        },
        JWT_SECRET,
        { expiresIn: "1h" }
      )

      // Exclude password from the returned user object
      const { password: _, ...userWithoutPassword } = user

      return NextResponse.json({ token, user: userWithoutPassword }, { status: 200 })
    } finally {
      connection.release()
    }
  } catch (error) {
    console.error("Login error:", error)
    return NextResponse.json({ message: "Internal server error" }, { status: 500 })
  }
}