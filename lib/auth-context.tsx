"use client"

import { createContext, useContext, useState, useEffect, type ReactNode } from "react"
import { useRouter } from "next/navigation"

interface User {
  user_id: string
  name: string
  email: string
  phone: string
  location: string
  user_type: "client" | "caregiver"
  avatar?: string
  is_verified: boolean
  created_at: string
}

interface AuthContextType {
  user: User | null
  token: string | null
  login: (email: string, password: string) => Promise<boolean>
  register: (data: any) => Promise<boolean>
  logout: () => void
  isAuthenticated: boolean
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [token, setToken] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const router = useRouter()

  // Load user and token from localStorage on mount
  useEffect(() => {
    try {
      const storedUser = localStorage.getItem("yotecuido_user")
      const storedToken = localStorage.getItem("yotecuido_token")
      if (storedUser && storedToken) {
        setUser(JSON.parse(storedUser))
        setToken(storedToken)
      }
    } catch (error) {
      console.error("Failed to parse user data from localStorage", error)
      // Clear corrupted data
      localStorage.removeItem("yotecuido_user")
      localStorage.removeItem("yotecuido_token")
    } finally {
      setIsLoading(false)
    }
  }, [])

  const login = async (email: string, password: string): Promise<boolean> => {
    try {
      const response = await fetch("/api/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      })

      if (!response.ok) {
        // Optionally, you could parse the error message from the response
        return false
      }

      const data = await response.json()
      const { token: newToken, user: userData } = data

      setUser(userData)
      setToken(newToken)
      localStorage.setItem("yotecuido_user", JSON.stringify(userData))
      localStorage.setItem("yotecuido_token", newToken)

      return true
    } catch (error) {
      console.error("Login failed:", error)
      return false
    }
  }

  const register = async (data: any): Promise<boolean> => {
    try {
      const response = await fetch("/api/registro", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      })

      if (!response.ok) {
        return false
      }

      // After successful registration, automatically log the user in
      return await login(data.email, data.password)
    } catch (error) {
      console.error("Registration failed:", error)
      return false
    }
  }

  const logout = () => {
    setUser(null)
    setToken(null)
    localStorage.removeItem("yotecuido_user")
    localStorage.removeItem("yotecuido_token")
    router.push("/")
  }

  // Prevent rendering children until the auth state is determined
  if (isLoading) {
    return null
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        login,
        register,
        logout,
        isAuthenticated: !!user && !!token,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}