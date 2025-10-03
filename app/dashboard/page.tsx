"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import {
  Calendar,
  Heart,
  MessageCircle,
  Settings,
  Bell,
  Clock,
  Star,
  MapPin,
  User,
  CreditCard,
  Shield,
  LogOut,
} from "lucide-react"
import { useAuth } from "@/lib/auth-context"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

// Type definitions for API data
interface Booking {
  booking_id: number
  caregiver_name: string
  caregiver_avatar: string | null
  service_name: string
  booking_date: string
  booking_time: string
  status: "confirmed" | "pending" | "completed" | "cancelled"
  price: number
  location: string
  rating?: number
  reviewed?: boolean
}

interface Favorite {
  caregiver_id: number
  name: string
  avatar: string | null
  category: string
  rating: number | null
  reviews: number
  hourly_rate: number
}

interface Message {
  message_id: number
  other_user_id: number
  other_user_name: string
  other_user_avatar: string | null
  message: string
  timestamp: string
  is_read: boolean
  sender_id: number
}

export default function DashboardPage() {
  const { user, isAuthenticated, logout, token } = useAuth()
  const router = useRouter()
  const [activeTab, setActiveTab] = useState("bookings")

  const [bookings, setBookings] = useState<Booking[]>([])
  const [favorites, setFavorites] = useState<Favorite[]>([])
  const [messages, setMessages] = useState<Message[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    // If auth state is still loading, do nothing.
    if (isAuthenticated === null) return

    // If not authenticated, redirect to login.
    if (!isAuthenticated) {
      router.push("/login")
      return
    }

    // If authenticated, fetch data.
    if (user && token) {
      const fetchData = async () => {
        setIsLoading(true)
        setError(null)
        try {
          const headers = { Authorization: `Bearer ${token}` }
          const [bookingsRes, favoritesRes, messagesRes] = await Promise.all([
            fetch(`/api/bookings?userId=${user.user_id}`, { headers }),
            fetch(`/api/favorites?userId=${user.user_id}`, { headers }),
            fetch(`/api/messages?userId=${user.user_id}`, { headers }),
          ])

          if (!bookingsRes.ok || !favoritesRes.ok || !messagesRes.ok) {
            throw new Error("Failed to fetch dashboard data")
          }

          setBookings(await bookingsRes.json())
          setFavorites(await favoritesRes.json())
          setMessages(await messagesRes.json())
        } catch (err: any) {
          setError(err.message)
          console.error("Failed to fetch dashboard data:", err)
        } finally {
          setIsLoading(false)
        }
      }
      fetchData()
    }
  }, [isAuthenticated, router, user, token])

  if (!isAuthenticated || !user) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-muted-foreground">Cargando...</p>
        </div>
      </div>
    )
  }

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "confirmed":
        return <Badge className="bg-green-500 text-white">Confirmada</Badge>
      case "pending":
        return <Badge className="bg-orange-500 text-white">Pendiente</Badge>
      case "completed":
        return <Badge className="bg-gray-500 text-white">Completada</Badge>
      case "cancelled":
        return <Badge variant="destructive">Cancelada</Badge>
      default:
        return <Badge variant="secondary">{status}</Badge>
    }
  }

  const upcomingBookings = bookings.filter((b) => b.status === "confirmed" || b.status === "pending")
  const pastBookings = bookings.filter((b) => b.status === "completed" || b.status === "cancelled")
  const unreadMessages = messages.filter((m) => !m.is_read && m.sender_id !== user.user_id).length

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container mx-auto flex h-16 items-center justify-between px-4">
          <Link href="/" className="flex items-center gap-2">
            <img src="/yotecuido_logo.svg" alt="YoTeCuido.cl Logo" className="h-10 w-auto" />
            <span className="text-xl font-bold text-foreground">YoTeCuido.cl</span>
          </Link>

          <div className="flex items-center gap-3">
            <Button variant="ghost" size="icon" className="relative">
              <Bell className="h-5 w-5" />
              {unreadMessages > 0 && (
                <span className="absolute right-1 top-1 flex h-4 w-4 items-center justify-center rounded-full bg-red-500 text-xs text-white">
                  {unreadMessages}
                </span>
              )}
            </Button>
            <Avatar className="h-8 w-8">
              <AvatarImage src={user.avatar || "/placeholder.svg"} alt={user.name} />
              <AvatarFallback>
                {user.name
                  .split(" ")
                  .map((n) => n[0])
                  .join("")}
              </AvatarFallback>
            </Avatar>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="mb-2 text-3xl font-bold text-foreground">Mi Dashboard</h1>
          <p className="text-muted-foreground">Gestiona tus reservas, favoritos y mensajes</p>
        </div>

        <div className="grid gap-8 lg:grid-cols-[280px_1fr]">
          {/* Sidebar */}
          <aside className="space-y-6">
            <Card>
              <CardContent className="p-6">
                <div className="mb-4 flex items-center gap-3">
                  <Avatar className="h-16 w-16">
                    <AvatarImage src={user.avatar || "/placeholder.svg"} alt={user.name} />
                    <AvatarFallback>
                      {user.name
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <h3 className="font-semibold text-foreground">{user.name}</h3>
                      {user.is_verified && <Shield className="h-4 w-4 text-primary" />}
                    </div>
                    <p className="text-sm text-muted-foreground">{user.email}</p>
                  </div>
                </div>
                <div className="space-y-2 border-t pt-4 text-sm">
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <MapPin className="h-4 w-4" />
                    <span>{user.location}</span>
                  </div>
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <Calendar className="h-4 w-4" />
                    <span>
                      Miembro desde{" "}
                      {new Date(user.created_at).toLocaleDateString("es-CL", { month: "long", year: "numeric" })}
                    </span>
                  </div>
                </div>
                <Button variant="outline" className="mt-4 w-full bg-transparent" asChild>
                  <Link href="/perfil/editar">
                    <User className="mr-2 h-4 w-4" />
                    Editar Perfil
                  </Link>
                </Button>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle className="text-base">Estadísticas</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">Reservas activas</span>
                  <span className="font-semibold text-foreground">{upcomingBookings.length}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">Servicios completados</span>
                  <span className="font-semibold text-foreground">{pastBookings.length}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">Favoritos</span>
                  <span className="font-semibold text-foreground">{favorites.length}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">Mensajes sin leer</span>
                  <span className="font-semibold text-foreground">{unreadMessages}</span>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-3">
                <nav className="space-y-1">
                  <Button variant="ghost" className="w-full justify-start" onClick={logout}>
                    <LogOut className="mr-2 h-4 w-4" />
                    Cerrar Sesión
                  </Button>
                </nav>
              </CardContent>
            </Card>
          </aside>

          {/* Main Content */}
          <div>
            <Tabs value={activeTab} onValueChange={setActiveTab}>
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="bookings">Reservas</TabsTrigger>
                <TabsTrigger value="favorites">Favoritos</TabsTrigger>
                <TabsTrigger value="messages">Mensajes</TabsTrigger>
              </TabsList>
              <TabsContent value="bookings" className="space-y-6">
                {isLoading ? (
                  <p>Cargando reservas...</p>
                ) : error ? (
                  <p className="text-red-500">Error al cargar las reservas.</p>
                ) : bookings.length === 0 ? (
                  <Card>
                    <CardContent className="p-12 text-center">
                      <h3 className="mb-2 text-lg font-semibold">No tienes reservas</h3>
                      <Button asChild><Link href="/buscar">Buscar Cuidadores</Link></Button>
                    </CardContent>
                  </Card>
                ) : (
                  <>
                    {upcomingBookings.length > 0 && (
                      <div className="space-y-4">
                        <h2 className="text-xl font-semibold">Próximas Reservas</h2>
                        {upcomingBookings.map((booking) => (
                          <Card key={booking.booking_id}><CardContent className="p-4">{booking.service_name}</CardContent></Card>
                        ))}
                      </div>
                    )}
                    {pastBookings.length > 0 && (
                      <div className="space-y-4">
                        <h2 className="text-xl font-semibold">Historial</h2>
                        {pastBookings.map((booking) => (
                          <Card key={booking.booking_id}><CardContent className="p-4">{booking.service_name}</CardContent></Card>
                        ))}
                      </div>
                    )}
                  </>
                )}
              </TabsContent>
              <TabsContent value="favorites">
                {isLoading ? (
                  <p>Cargando favoritos...</p>
                ) : error ? (
                  <p className="text-red-500">Error al cargar los favoritos.</p>
                ) : favorites.length === 0 ? (
                  <Card>
                    <CardContent className="p-12 text-center">
                      <h3 className="mb-2 text-lg font-semibold">No tienes favoritos</h3>
                      <Button asChild><Link href="/buscar">Explorar Cuidadores</Link></Button>
                    </CardContent>
                  </Card>
                ) : (
                  <div className="space-y-4">
                    {favorites.map((fav) => (
                      <Card key={fav.caregiver_id}><CardContent className="p-4">{fav.name}</CardContent></Card>
                    ))}
                  </div>
                )}
              </TabsContent>
              <TabsContent value="messages">
                {isLoading ? (
                  <p>Cargando mensajes...</p>
                ) : error ? (
                  <p className="text-red-500">Error al cargar los mensajes.</p>
                ) : messages.length === 0 ? (
                  <Card>
                    <CardContent className="p-12 text-center">
                      <h3 className="mb-2 text-lg font-semibold">No tienes mensajes</h3>
                    </CardContent>
                  </Card>
                ) : (
                  <div className="space-y-4">
                    {messages.map((msg) => (
                      <Card key={msg.message_id}><CardContent className="p-4">{msg.message}</CardContent></Card>
                    ))}
                  </div>
                )}
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>
    </div>
  )
}