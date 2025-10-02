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

// Mock bookings data
const bookings = [
  {
    id: 1,
    caregiver: {
      name: "María González",
      avatar: "/woman-caregiver.png",
      category: "ninos",
    },
    service: "Niñera por horas",
    date: "2025-02-15",
    time: "15:00 - 19:00",
    status: "confirmed",
    price: 32000,
    location: "Mi domicilio",
  },
  {
    id: 2,
    caregiver: {
      name: "Carlos Muñoz",
      avatar: "/man-dog-walker.jpg",
      category: "mascotas",
    },
    service: "Paseo de perros",
    date: "2025-02-10",
    time: "10:00 - 11:00",
    status: "pending",
    price: 6000,
    location: "Parque Bicentenario",
  },
  {
    id: 3,
    caregiver: {
      name: "Patricia Silva",
      avatar: "/elderly-caregiver.jpg",
      category: "mayores",
    },
    service: "Compañía diurna",
    date: "2025-01-28",
    time: "09:00 - 17:00",
    status: "completed",
    price: 72000,
    location: "Domicilio del adulto mayor",
    rating: 5,
    reviewed: true,
  },
  {
    id: 4,
    caregiver: {
      name: "Javiera Rojas",
      avatar: "/young-woman-nanny.jpg",
      category: "ninos",
    },
    service: "Cuidado nocturno",
    date: "2025-01-20",
    time: "20:00 - 08:00",
    status: "completed",
    price: 90000,
    location: "Mi domicilio",
    rating: 4,
    reviewed: true,
  },
]

// Mock favorites
const favorites = [
  {
    id: 1,
    name: "María González",
    avatar: "/woman-caregiver.png",
    category: "ninos",
    rating: 4.9,
    reviews: 127,
    hourlyRate: 8000,
  },
  {
    id: 2,
    name: "Carlos Muñoz",
    avatar: "/man-dog-walker.jpg",
    category: "mascotas",
    rating: 5.0,
    reviews: 89,
    hourlyRate: 6000,
  },
  {
    id: 3,
    name: "Ana Martínez",
    avatar: "/professional-caregiver.jpg",
    category: "mayores",
    rating: 5.0,
    reviews: 78,
    hourlyRate: 10000,
  },
]

// Mock messages
const messages = [
  {
    id: 1,
    caregiver: {
      name: "María González",
      avatar: "/woman-caregiver.png",
    },
    lastMessage: "Perfecto, nos vemos el viernes a las 15:00. ¡Gracias!",
    timestamp: "Hace 2 horas",
    unread: false,
  },
  {
    id: 2,
    caregiver: {
      name: "Carlos Muñoz",
      avatar: "/man-dog-walker.jpg",
    },
    lastMessage: "¿Tu perro tiene alguna restricción alimentaria?",
    timestamp: "Hace 5 horas",
    unread: true,
  },
  {
    id: 3,
    caregiver: {
      name: "Roberto Fernández",
      avatar: "/man-with-pets.png",
    },
    lastMessage: "Hola, vi tu solicitud. ¿Podemos coordinar una videollamada?",
    timestamp: "Ayer",
    unread: true,
  },
]

export default function DashboardPage() {
  const { user, isAuthenticated, logout } = useAuth()
  const router = useRouter()
  const [activeTab, setActiveTab] = useState("bookings")

  // Redirect to login if not authenticated
  useEffect(() => {
    if (!isAuthenticated) {
      router.push("/login")
    }
  }, [isAuthenticated, router])

  // Show loading or redirect if not authenticated
  if (!isAuthenticated || !user) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-muted-foreground">Redirigiendo al inicio de sesión...</p>
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

  const getCategoryColor = (category: string) => {
    switch (category) {
      case "ninos":
        return "text-orange-500"
      case "mascotas":
        return "text-green-500"
      case "mayores":
        return "text-sky-500"
      default:
        return "text-primary"
    }
  }

  const upcomingBookings = bookings.filter((b) => b.status === "confirmed" || b.status === "pending")
  const pastBookings = bookings.filter((b) => b.status === "completed" || b.status === "cancelled")
  const unreadMessages = messages.filter((m) => m.unread).length

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container mx-auto flex h-16 items-center justify-between px-4">
          <Link href="/" className="flex items-center gap-2">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary">
              <Heart className="h-5 w-5 text-white" fill="white" />
            </div>
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
            {/* User Profile Card */}
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
                      {user.verified && <Shield className="h-4 w-4 text-primary" />}
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
                    <span>Miembro desde {user.memberSince}</span>
                  </div>
                </div>

                <Button variant="outline" className="mt-4 w-full bg-transparent" asChild>
                  <Link href="/dashboard/perfil">
                    <User className="mr-2 h-4 w-4" />
                    Editar Perfil
                  </Link>
                </Button>
              </CardContent>
            </Card>

            {/* Quick Stats */}
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

            {/* Navigation */}
            <Card>
              <CardContent className="p-3">
                <nav className="space-y-1">
                  <Button variant="ghost" className="w-full justify-start" asChild>
                    <Link href="/dashboard/pagos">
                      <CreditCard className="mr-2 h-4 w-4" />
                      Métodos de Pago
                    </Link>
                  </Button>
                  <Button variant="ghost" className="w-full justify-start" asChild>
                    <Link href="/dashboard/configuracion">
                      <Settings className="mr-2 h-4 w-4" />
                      Configuración
                    </Link>
                  </Button>
                  <Button
                    variant="ghost"
                    className="w-full justify-start text-red-600 hover:bg-red-50 hover:text-red-700"
                    onClick={logout}
                  >
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
                <TabsTrigger value="bookings" className="relative">
                  Reservas
                  {upcomingBookings.length > 0 && (
                    <Badge className="ml-2 h-5 w-5 rounded-full p-0 text-xs" variant="secondary">
                      {upcomingBookings.length}
                    </Badge>
                  )}
                </TabsTrigger>
                <TabsTrigger value="favorites">Favoritos</TabsTrigger>
                <TabsTrigger value="messages" className="relative">
                  Mensajes
                  {unreadMessages > 0 && (
                    <Badge className="ml-2 h-5 w-5 rounded-full bg-red-500 p-0 text-xs text-white">
                      {unreadMessages}
                    </Badge>
                  )}
                </TabsTrigger>
              </TabsList>

              {/* Bookings Tab */}
              <TabsContent value="bookings" className="space-y-6">
                {/* Upcoming Bookings */}
                {upcomingBookings.length > 0 && (
                  <div>
                    <h2 className="mb-4 text-xl font-semibold text-foreground">Próximas Reservas</h2>
                    <div className="space-y-4">
                      {upcomingBookings.map((booking) => (
                        <Card key={booking.id}>
                          <CardContent className="p-6">
                            <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                              <div className="flex gap-4">
                                <Avatar className="h-16 w-16">
                                  <AvatarImage
                                    src={booking.caregiver.avatar || "/placeholder.svg"}
                                    alt={booking.caregiver.name}
                                  />
                                  <AvatarFallback>
                                    {booking.caregiver.name
                                      .split(" ")
                                      .map((n) => n[0])
                                      .join("")}
                                  </AvatarFallback>
                                </Avatar>
                                <div className="flex-1">
                                  <div className="mb-1 flex items-center gap-2">
                                    <h3 className="font-semibold text-foreground">{booking.caregiver.name}</h3>
                                    {getStatusBadge(booking.status)}
                                  </div>
                                  <p className="mb-2 text-sm text-muted-foreground">{booking.service}</p>
                                  <div className="flex flex-wrap gap-3 text-sm text-muted-foreground">
                                    <div className="flex items-center gap-1">
                                      <Calendar className="h-4 w-4" />
                                      <span>
                                        {new Date(booking.date).toLocaleDateString("es-CL", {
                                          day: "numeric",
                                          month: "long",
                                          year: "numeric",
                                        })}
                                      </span>
                                    </div>
                                    <div className="flex items-center gap-1">
                                      <Clock className="h-4 w-4" />
                                      <span>{booking.time}</span>
                                    </div>
                                    <div className="flex items-center gap-1">
                                      <MapPin className="h-4 w-4" />
                                      <span>{booking.location}</span>
                                    </div>
                                  </div>
                                </div>
                              </div>
                              <div className="flex flex-col gap-2 md:items-end">
                                <div className="text-2xl font-bold text-foreground">${booking.price.toLocaleString()}</div>
                                <div className="flex gap-2">
                                  <Button variant="outline" size="sm">
                                    <MessageCircle className="mr-1 h-4 w-4" />
                                    Mensaje
                                  </Button>
                                  {booking.status === "pending" && (
                                    <Button size="sm" className="bg-primary hover:bg-primary-hover">
                                      Confirmar
                                    </Button>
                                  )}
                                </div>
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                  </div>
                )}

                {/* Past Bookings */}
                {pastBookings.length > 0 && (
                  <div>
                    <h2 className="mb-4 text-xl font-semibold text-foreground">Historial</h2>
                    <div className="space-y-4">
                      {pastBookings.map((booking) => (
                        <Card key={booking.id} className="opacity-75">
                          <CardContent className="p-6">
                            <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                              <div className="flex gap-4">
                                <Avatar className="h-16 w-16">
                                  <AvatarImage
                                    src={booking.caregiver.avatar || "/placeholder.svg"}
                                    alt={booking.caregiver.name}
                                  />
                                  <AvatarFallback>
                                    {booking.caregiver.name
                                      .split(" ")
                                      .map((n) => n[0])
                                      .join("")}
                                  </AvatarFallback>
                                </Avatar>
                                <div className="flex-1">
                                  <div className="mb-1 flex items-center gap-2">
                                    <h3 className="font-semibold text-foreground">{booking.caregiver.name}</h3>
                                    {getStatusBadge(booking.status)}
                                  </div>
                                  <p className="mb-2 text-sm text-muted-foreground">{booking.service}</p>
                                  <div className="flex flex-wrap gap-3 text-sm text-muted-foreground">
                                    <div className="flex items-center gap-1">
                                      <Calendar className="h-4 w-4" />
                                      <span>
                                        {new Date(booking.date).toLocaleDateString("es-CL", {
                                          day: "numeric",
                                          month: "long",
                                          year: "numeric",
                                        })}
                                      </span>
                                    </div>
                                    {booking.rating && (
                                      <div className="flex items-center gap-1">
                                        <Star className="h-4 w-4 fill-secondary text-secondary" />
                                        <span>{booking.rating}.0</span>
                                      </div>
                                    )}
                                  </div>
                                </div>
                              </div>
                              <div className="flex flex-col gap-2 md:items-end">
                                <div className="text-xl font-bold text-foreground">${booking.price.toLocaleString()}</div>
                                {booking.status === "completed" && !booking.reviewed && (
                                  <Button variant="outline" size="sm">
                                    <Star className="mr-1 h-4 w-4" />
                                    Calificar
                                  </Button>
                                )}
                                {booking.reviewed && <span className="text-sm text-green-500">✓ Calificado</span>}
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                  </div>
                )}

                {bookings.length === 0 && (
                  <Card>
                    <CardContent className="p-12 text-center">
                      <Calendar className="mx-auto mb-4 h-12 w-12 text-muted-foreground" />
                      <h3 className="mb-2 text-lg font-semibold text-foreground">No tienes reservas</h3>
                      <p className="mb-4 text-muted-foreground">Comienza a buscar cuidadores para tus necesidades</p>
                      <Button asChild>
                        <Link href="/buscar">Buscar Cuidadores</Link>
                      </Button>
                    </CardContent>
                  </Card>
                )}
              </TabsContent>

              {/* Favorites Tab */}
              <TabsContent value="favorites" className="space-y-4">
                {favorites.length > 0 ? (
                  favorites.map((favorite) => (
                    <Card key={favorite.id}>
                      <CardContent className="p-6">
                        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                          <div className="flex gap-4">
                            <Avatar className="h-16 w-16">
                              <AvatarImage src={favorite.avatar || "/placeholder.svg"} alt={favorite.name} />
                              <AvatarFallback>
                                {favorite.name
                                  .split(" ")
                                  .map((n) => n[0])
                                  .join("")}
                              </AvatarFallback>
                            </Avatar>
                            <div className="flex-1">
                              <h3 className="mb-1 font-semibold text-foreground">{favorite.name}</h3>
                              <div className="mb-2 flex items-center gap-2">
                                <div className="flex items-center gap-1">
                                  <Star className="h-4 w-4 fill-secondary text-secondary" />
                                  <span className="text-sm font-medium text-foreground">{favorite.rating}</span>
                                </div>
                                <span className="text-sm text-muted-foreground">({favorite.reviews} reseñas)</span>
                              </div>
                              <div className="text-lg font-bold text-foreground">
                                ${favorite.hourlyRate.toLocaleString()}/hora
                              </div>
                            </div>
                          </div>
                          <div className="flex gap-2">
                            <Button variant="outline" size="sm">
                              <Heart className="mr-1 h-4 w-4 fill-red-500 text-red-500" />
                              Guardado
                            </Button>
                            <Button size="sm" className="bg-primary hover:bg-primary-hover" asChild>
                              <Link href={`/cuidador/${favorite.id}`}>Ver Perfil</Link>
                            </Button>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))
                ) : (
                  <Card>
                    <CardContent className="p-12 text-center">
                      <Heart className="mx-auto mb-4 h-12 w-12 text-muted-foreground" />
                      <h3 className="mb-2 text-lg font-semibold text-foreground">No tienes favoritos</h3>
                      <p className="mb-4 text-muted-foreground">
                        Guarda tus cuidadores favoritos para acceder rápidamente
                      </p>
                      <Button asChild>
                        <Link href="/buscar">Explorar Cuidadores</Link>
                      </Button>
                    </CardContent>
                  </Card>
                )}
              </TabsContent>

              {/* Messages Tab */}
              <TabsContent value="messages" className="space-y-4">
                {messages.length > 0 ? (
                  messages.map((message) => (
                    <Card key={message.id} className={message.unread ? "border-primary" : ""}>
                      <CardContent className="p-6">
                        <div className="flex gap-4">
                          <Avatar className="h-12 w-12">
                            <AvatarImage
                              src={message.caregiver.avatar || "/placeholder.svg"}
                              alt={message.caregiver.name}
                            />
                            <AvatarFallback>
                              {message.caregiver.name
                                .split(" ")
                                .map((n) => n[0])
                                .join("")}
                            </AvatarFallback>
                          </Avatar>
                          <div className="flex-1">
                            <div className="mb-1 flex items-center justify-between">
                              <h3 className="font-semibold text-foreground">{message.caregiver.name}</h3>
                              <span className="text-xs text-muted-foreground">{message.timestamp}</span>
                            </div>
                            <p
                              className={`text-sm ${message.unread ? "font-medium text-foreground" : "text-muted-foreground"}`}
                            >
                              {message.lastMessage}
                            </p>
                            {message.unread && <Badge className="mt-2 bg-primary text-xs">Nuevo</Badge>}
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))
                ) : (
                  <Card>
                    <CardContent className="p-12 text-center">
                      <MessageCircle className="mx-auto mb-4 h-12 w-12 text-muted-foreground" />
                      <h3 className="mb-2 text-lg font-semibold text-foreground">No tienes mensajes</h3>
                      <p className="text-muted-foreground">Tus conversaciones con cuidadores aparecerán aquí</p>
                    </CardContent>
                  </Card>
                )}
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>
    </div>
  )
}
