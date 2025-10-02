"use client"

import { createContext, useContext, useState, useEffect, type ReactNode } from "react"
import { useRouter } from "next/navigation"

interface User {
  id: string
  name: string
  email: string
  phone: string
  location: string
  role: "client" | "caregiver" | "both"
  avatar?: string
  verified: boolean
  memberSince: string
}

interface AuthContextType {
  user: User | null
  login: (email: string, password: string) => Promise<boolean>
  register: (data: any) => Promise<boolean>
  logout: () => void
  isAuthenticated: boolean
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

// Mock users database
const MOCK_USERS: Record<string, User & { password: string }> = {
  "carolina.perez@email.com": {
    id: "1",
    name: "Carolina Pérez",
    email: "carolina.perez@email.com",
    password: "demo123",
    phone: "+56 9 1234 5678",
    location: "Providencia, Santiago",
    role: "client",
    avatar: "/placeholder.svg?key=user1",
    verified: true,
    memberSince: "Marzo 2024",
  },
  "maria.gonzalez@email.com": {
    id: "2",
    name: "María González",
    email: "maria.gonzalez@email.com",
    password: "demo123",
    phone: "+56 9 8765 4321",
    location: "Las Condes, Santiago",
    role: "caregiver",
    avatar: "/woman-caregiver.png",
    verified: true,
    memberSince: "Enero 2024",
  },
  "usuario.dual@email.com": {
    id: "3",
    name: "Roberto Fernández",
    email: "usuario.dual@email.com",
    password: "demo123",
    phone: "+56 9 5555 5555",
    location: "Ñuñoa, Santiago",
    role: "both",
    avatar: "/man-with-pets.png",
    verified: true,
    memberSince: "Febrero 2024",
  },
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const router = useRouter()

  // Load user from localStorage on mount
  useEffect(() => {
    const storedUser = localStorage.getItem("yotecuido_user")
    if (storedUser) {
      setUser(JSON.parse(storedUser))
    }
    setIsLoading(false)
  }, [])

  const login = async (email: string, password: string): Promise<boolean> => {
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 500))

    const mockUser = MOCK_USERS[email.toLowerCase()]
    if (mockUser && mockUser.password === password) {
      const { password: _, ...userWithoutPassword } = mockUser
      setUser(userWithoutPassword)
      localStorage.setItem("yotecuido_user", JSON.stringify(userWithoutPassword))
      return true
    }
    return false
  }

  const register = async (data: any): Promise<boolean> => {
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 500))

    const newUser: User = {
      id: Date.now().toString(),
      name: data.name,
      email: data.email,
      phone: data.phone,
      location: data.location,
      role: data.userType,
      verified: false,
      memberSince: new Date().toLocaleDateString("es-CL", { month: "long", year: "numeric" }),
    }

    setUser(newUser)
    localStorage.setItem("yotecuido_user", JSON.stringify(newUser))
    return true
  }

  const logout = () => {
    setUser(null)
    localStorage.removeItem("yotecuido_user")
    router.push("/")
  }

  if (isLoading) {
    return null // Or a loading spinner
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        login,
        register,
        logout,
        isAuthenticated: !!user,
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
