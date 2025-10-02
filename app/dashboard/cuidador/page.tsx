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
  DollarSign,
  TrendingUp,
  Users,
  Star,
  Clock,
  CheckCircle,
  XCircle,
  Eye,
  MapPin,
  LogOut,
} from "lucide-react"
import { useAuth } from "@/lib/auth-context"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

// Mock earnings data
const earningsData = {
  thisMonth: 450000,
  lastMonth: 380000,
  thisYear: 4200000,
  pending: 120000,
  available: 330000,
}

// Mock bookings for caregiver
const caregiverBookings = [
  {
    id: 1,
    client: {
      name: "Carolina Pérez",
      avatar: "/placeholder.svg?key=user1",
    },
    service: "Niñera por horas",
    date: "2025-02-15",
    time: "15:00 - 19:00",
    status: "confirmed",
    earnings: 32000,
    location: "Providencia, Santiago",
  },
  {
    id: 2,
    client: {
      name: "Roberto Fernández",
      avatar: "/man-with-pets.png",
    },
    service: "Paseo de perros",
    date: "2025-02-12",
    time: "10:00 - 11:00",
    status: "pending",
    earnings: 6000,
    location: "Ñuñoa, Santiago",
  },
  {
    id: 3,
    client: {
      name: "Ana Martínez",
      avatar: "/professional-woman-smiling.png",
    },
    service: "Cuidado nocturno",
    date: "2025-01-28",
    time: "20:00 - 08:00",
    status: "completed",
    earnings: 90000,
    location: "Las Condes, Santiago",
    rating: 5,
  },
]

// Mock stats
const stats = {
  totalClients: 24,
  completedServices: 156,
  averageRating: 4.9,
  responseRate: 98,
}

export default function CaregiverDashboard() {
  const { user, logout, isAuthenticated } = useAuth()
  const router = useRouter()
  const [activeTab, setActiveTab] = useState("overview")

  useEffect(() => {
    if (!isAuthenticated) {
      router.push("/login")
    } else if (user?.role === "client") {
      router.push("/dashboard")
    }
  }, [isAuthenticated, user, router])

  if (!user || user.role === "client") {
    return null
  }

  const upcomingBookings = caregiverBookings.filter((b) => b.status === "confirmed" || b.status === "pending")
  const completedBookings = caregiverBookings.filter((b) => b.status === "completed")

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "confirmed":
        return <Badge className="bg-accent-pets text-white">Confirmada</Badge>
      case "pending":
        return <Badge className="bg-secondary text-white">Pendiente</Badge>
      case "completed":
        return <Badge className="bg-gray-500 text-white">Completada</Badge>
      default:
        return <Badge variant="secondary">{status}</Badge>
    }
  }

  const growthPercentage = (((earningsData.thisMonth - earningsData.lastMonth) / earningsData.lastMonth) * 100).toFixed(
    1,
  )

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-50 w-full border-b border-border bg-surface/95 backdrop-blur supports-[backdrop-filter]:bg-surface/60">
        <div className="container mx-auto flex h-16 items-center justify-between px-4">
          <Link href="/" className="flex items-center gap-2">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary">
              <Heart className="h-5 w-5 text-white" fill="white" />
            </div>
            <span className="text-xl font-bold text-text">YoTeCuido.cl</span>
          </Link>

          <div className="flex items-center gap-3">
            <Button variant="ghost" size="icon">
              <Bell className="h-5 w-5" />
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
          <h1 className="mb-2 text-3xl font-bold text-text">Dashboard de Cuidador</h1>
          <p className="text-text-secondary">Gestiona tus servicios y ganancias</p>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid w-full grid-cols-3 lg:w-auto">
            <TabsTrigger value="overview">Resumen</TabsTrigger>
            <TabsTrigger value="bookings">Reservas</TabsTrigger>
            <TabsTrigger value="earnings">Ganancias</TabsTrigger>
          </TabsList>

          {/* Overview Tab */}
          <TabsContent value="overview" className="space-y-6">
            {/* Stats Grid */}
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Ganancias del Mes</CardTitle>
                  <DollarSign className="h-4 w-4 text-text-secondary" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">${earningsData.thisMonth.toLocaleString()}</div>
                  <p className="text-xs text-accent-pets">
                    <TrendingUp className="mr-1 inline h-3 w-3" />+{growthPercentage}% vs mes anterior
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Servicios Completados</CardTitle>
                  <CheckCircle className="h-4 w-4 text-text-secondary" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{stats.completedServices}</div>
                  <p className="text-xs text-text-secondary">Total histórico</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Calificación Promedio</CardTitle>
                  <Star className="h-4 w-4 text-secondary" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{stats.averageRating}</div>
                  <p className="text-xs text-text-secondary">De 5.0 estrellas</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Clientes Activos</CardTitle>
                  <Users className="h-4 w-4 text-text-secondary" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{stats.totalClients}</div>
                  <p className="text-xs text-text-secondary">Tasa de respuesta {stats.responseRate}%</p>
                </CardContent>
              </Card>
            </div>

            {/* Upcoming Bookings */}
            <Card>
              <CardHeader>
                <CardTitle>Próximas Reservas</CardTitle>
              </CardHeader>
              <CardContent>
                {upcomingBookings.length > 0 ? (
                  <div className="space-y-4">
                    {upcomingBookings.map((booking) => (
                      <div
                        key={booking.id}
                        className="flex items-center justify-between border-b border-border pb-4 last:border-0 last:pb-0"
                      >
                        <div className="flex gap-3">
                          <Avatar>
                            <AvatarImage src={booking.client.avatar || "/placeholder.svg"} alt={booking.client.name} />
                            <AvatarFallback>
                              {booking.client.name
                                .split(" ")
                                .map((n) => n[0])
                                .join("")}
                            </AvatarFallback>
                          </Avatar>
                          <div>
                            <p className="font-semibold text-text">{booking.client.name}</p>
                            <p className="text-sm text-text-secondary">{booking.service}</p>
                            <div className="mt-1 flex gap-3 text-xs text-text-secondary">
                              <span className="flex items-center gap-1">
                                <Calendar className="h-3 w-3" />
                                {new Date(booking.date).toLocaleDateString("es-CL")}
                              </span>
                              <span className="flex items-center gap-1">
                                <Clock className="h-3 w-3" />
                                {booking.time}
                              </span>
                            </div>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="font-bold text-text">${booking.earnings.toLocaleString()}</p>
                          {getStatusBadge(booking.status)}
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-center text-text-secondary">No tienes reservas próximas</p>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          {/* Bookings Tab */}
          <TabsContent value="bookings" className="space-y-6">
            <div className="space-y-4">
              {caregiverBookings.map((booking) => (
                <Card key={booking.id}>
                  <CardContent className="p-6">
                    <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                      <div className="flex gap-4">
                        <Avatar className="h-16 w-16">
                          <AvatarImage src={booking.client.avatar || "/placeholder.svg"} alt={booking.client.name} />
                          <AvatarFallback>
                            {booking.client.name
                              .split(" ")
                              .map((n) => n[0])
                              .join("")}
                          </AvatarFallback>
                        </Avatar>
                        <div className="flex-1">
                          <div className="mb-1 flex items-center gap-2">
                            <h3 className="font-semibold text-text">{booking.client.name}</h3>
                            {getStatusBadge(booking.status)}
                          </div>
                          <p className="mb-2 text-sm text-text-secondary">{booking.service}</p>
                          <div className="flex flex-wrap gap-3 text-sm text-text-secondary">
                            <div className="flex items-center gap-1">
                              <Calendar className="h-4 w-4" />
                              <span>{new Date(booking.date).toLocaleDateString("es-CL")}</span>
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
                        <div className="text-2xl font-bold text-text">${booking.earnings.toLocaleString()}</div>
                        <div className="flex gap-2">
                          <Button variant="outline" size="sm" asChild>
                            <Link href="/mensajes">
                              <MessageCircle className="mr-1 h-4 w-4" />
                              Mensaje
                            </Link>
                          </Button>
                          {booking.status === "pending" && (
                            <>
                              <Button size="sm" className="bg-accent-pets hover:bg-accent-pets/90">
                                <CheckCircle className="mr-1 h-4 w-4" />
                                Aceptar
                              </Button>
                              <Button
                                size="sm"
                                variant="outline"
                                className="text-red-600 hover:bg-red-50 bg-transparent"
                              >
                                <XCircle className="mr-1 h-4 w-4" />
                                Rechazar
                              </Button>
                            </>
                          )}
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Earnings Tab */}
          <TabsContent value="earnings" className="space-y-6">
            <div className="grid gap-4 md:grid-cols-3">
              <Card>
                <CardHeader>
                  <CardTitle className="text-sm font-medium">Disponible para Retiro</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold text-accent-pets">${earningsData.available.toLocaleString()}</div>
                  <Button className="mt-4 w-full bg-primary hover:bg-primary-hover">Solicitar Retiro</Button>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-sm font-medium">Pendiente de Pago</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold text-secondary">${earningsData.pending.toLocaleString()}</div>
                  <p className="mt-2 text-xs text-text-secondary">Se liberará después del servicio</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-sm font-medium">Total del Año</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold text-text">${earningsData.thisYear.toLocaleString()}</div>
                  <p className="mt-2 text-xs text-text-secondary">Enero - Febrero 2025</p>
                </CardContent>
              </Card>
            </div>

            <Card>
              <CardHeader>
                <CardTitle>Historial de Ganancias</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {completedBookings.map((booking) => (
                    <div
                      key={booking.id}
                      className="flex items-center justify-between border-b border-border pb-4 last:border-0 last:pb-0"
                    >
                      <div>
                        <p className="font-semibold text-text">{booking.service}</p>
                        <p className="text-sm text-text-secondary">
                          {booking.client.name} • {new Date(booking.date).toLocaleDateString("es-CL")}
                        </p>
                      </div>
                      <div className="text-right">
                        <p className="font-bold text-accent-pets">+${booking.earnings.toLocaleString()}</p>
                        {booking.rating && (
                          <div className="flex items-center gap-1 text-sm">
                            <Star className="h-3 w-3 fill-secondary text-secondary" />
                            <span>{booking.rating}.0</span>
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        {/* Quick Actions */}
        <Card className="mt-6">
          <CardHeader>
            <CardTitle>Acciones Rápidas</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid gap-3 md:grid-cols-4">
              <Button variant="outline" className="justify-start bg-transparent" asChild>
                <Link href={`/cuidador/${user.id}`}>
                  <Eye className="mr-2 h-4 w-4" />
                  Ver mi Perfil Público
                </Link>
              </Button>
              <Button variant="outline" className="justify-start bg-transparent" asChild>
                <Link href="/perfil/crear">
                  <Settings className="mr-2 h-4 w-4" />
                  Editar Perfil
                </Link>
              </Button>
              <Button variant="outline" className="justify-start bg-transparent" asChild>
                <Link href="/mensajes">
                  <MessageCircle className="mr-2 h-4 w-4" />
                  Mensajes
                </Link>
              </Button>
              <Button
                variant="outline"
                className="justify-start text-red-600 hover:bg-red-50 bg-transparent"
                onClick={logout}
              >
                <LogOut className="mr-2 h-4 w-4" />
                Cerrar Sesión
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
