"use client"
import Link from "next/link"
import {
  ArrowLeft,
  MapPin,
  Star,
  Shield,
  Heart,
  Share2,
  MessageCircle,
  Calendar,
  Award,
  CheckCircle2,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Progress } from "@/components/ui/progress"

// Mock data for a user profile
const userProfile = {
  id: 1,
  name: "Carolina Pérez",
  rating: 4.8,
  reviews: 23,
  location: "Providencia, Santiago",
  memberSince: "Marzo 2024",
  image: "/professional-woman-smiling.png",
  verified: true,
  badges: ["Usuario Verificado", "Pago Puntual", "Comunicación Clara"],
  servicesUsed: ["Cuidado de Niños", "Cuidado de Mascotas"],
  about:
    "Madre de dos niños y dueña de un golden retriever. Valoro mucho la puntualidad, la comunicación clara y el profesionalismo. Siempre trato de crear un ambiente de respeto y confianza con los cuidadores que contrato.",
  totalBookings: 47,
  repeatBookings: 32,
  responseRate: 95,
  reviews: [
    {
      id: 1,
      author: "María González",
      authorType: "Cuidadora de Niños",
      rating: 5,
      date: "10 de Enero, 2025",
      comment:
        "Carolina es una cliente excepcional. Muy clara con sus expectativas, puntual con los pagos y siempre amable. Sus hijos son adorables y el ambiente familiar es muy acogedor. Definitivamente volvería a trabajar con ella.",
    },
    {
      id: 2,
      author: "Carlos Muñoz",
      authorType: "Paseador de Perros",
      rating: 5,
      date: "5 de Enero, 2025",
      comment:
        "Excelente dueña de mascota. Max es un perro muy bien educado y Carolina siempre deja todo preparado para el paseo. Comunicación perfecta y pago inmediato. 100% recomendada.",
    },
    {
      id: 3,
      author: "Javiera Rojas",
      authorType: "Niñera",
      rating: 5,
      date: "28 de Diciembre, 2024",
      comment:
        "Una de mis mejores experiencias como niñera. Carolina es muy organizada, respetuosa y generosa. Los niños son encantadores y siempre me siento bienvenida en su hogar.",
    },
    {
      id: 4,
      author: "Roberto Fernández",
      authorType: "Cuidador de Mascotas",
      rating: 4,
      date: "15 de Diciembre, 2024",
      comment:
        "Buena experiencia en general. Carolina es responsable y comunicativa. Solo un pequeño malentendido con el horario, pero lo resolvimos rápidamente.",
    },
  ],
}

export default function UserProfilePage() {
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
            <Button variant="ghost" size="sm" className="hidden md:flex">
              Iniciar Sesión
            </Button>
            <Button size="sm" className="bg-primary hover:bg-primary-hover">
              Registrarse
            </Button>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        {/* Back Button */}
        <Link
          href="/dashboard"
          className="mb-6 inline-flex items-center gap-2 text-sm text-text-secondary hover:text-text"
        >
          <ArrowLeft className="h-4 w-4" />
          Volver
        </Link>

        <div className="grid gap-8 lg:grid-cols-[1fr_380px]">
          {/* Main Content */}
          <div className="space-y-6">
            {/* Profile Header */}
            <Card>
              <CardContent className="p-6">
                <div className="flex flex-col gap-6 md:flex-row">
                  {/* Avatar */}
                  <div className="relative">
                    <Avatar className="h-32 w-32 border-4 border-white shadow-lg">
                      <AvatarImage src={userProfile.image || "/placeholder.svg"} alt={userProfile.name} />
                      <AvatarFallback>
                        {userProfile.name
                          .split(" ")
                          .map((n) => n[0])
                          .join("")}
                      </AvatarFallback>
                    </Avatar>
                    {userProfile.verified && (
                      <div className="absolute -bottom-2 -right-2 rounded-full bg-primary p-2 shadow-lg">
                        <Shield className="h-5 w-5 text-white" />
                      </div>
                    )}
                  </div>

                  {/* Info */}
                  <div className="flex-1">
                    <div className="mb-2 flex flex-wrap items-start justify-between gap-4">
                      <div>
                        <h1 className="mb-1 text-3xl font-bold text-text">{userProfile.name}</h1>
                        <div className="flex items-center gap-2 text-text-secondary">
                          <MapPin className="h-4 w-4" />
                          <span>{userProfile.location}</span>
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <Button variant="outline" size="icon">
                          <Share2 className="h-5 w-5" />
                        </Button>
                      </div>
                    </div>

                    {/* Rating */}
                    <div className="mb-3 flex items-center gap-4">
                      <div className="flex items-center gap-1">
                        <Star className="h-5 w-5 fill-secondary text-secondary" />
                        <span className="text-lg font-semibold text-text">{userProfile.rating}</span>
                        <span className="text-sm text-text-secondary">({userProfile.reviews} reseñas)</span>
                      </div>
                      <span className="text-sm text-text-secondary">•</span>
                      <span className="text-sm text-text-secondary">Miembro desde {userProfile.memberSince}</span>
                    </div>

                    {/* Badges */}
                    <div className="flex flex-wrap gap-2">
                      {userProfile.badges.map((badge) => (
                        <Badge key={badge} variant="outline" className="text-xs">
                          <CheckCircle2 className="mr-1 h-3 w-3" />
                          {badge}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Stats */}
                <div className="mt-6 grid grid-cols-2 gap-4 border-t border-border pt-6 md:grid-cols-4">
                  <div className="text-center">
                    <div className="mb-1 text-2xl font-bold text-text">{userProfile.totalBookings}</div>
                    <div className="text-xs text-text-secondary">Servicios contratados</div>
                  </div>
                  <div className="text-center">
                    <div className="mb-1 text-2xl font-bold text-text">{userProfile.repeatBookings}</div>
                    <div className="text-xs text-text-secondary">Reservas repetidas</div>
                  </div>
                  <div className="text-center">
                    <div className="mb-1 text-2xl font-bold text-text">{userProfile.responseRate}%</div>
                    <div className="text-xs text-text-secondary">Tasa de respuesta</div>
                  </div>
                  <div className="text-center">
                    <div className="mb-1 text-2xl font-bold text-text">{userProfile.reviews}</div>
                    <div className="text-xs text-text-secondary">Reseñas recibidas</div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Tabs */}
            <Tabs defaultValue="about" className="w-full">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="about">Sobre mí</TabsTrigger>
                <TabsTrigger value="reviews">Reseñas de Cuidadores</TabsTrigger>
              </TabsList>

              {/* About Tab */}
              <TabsContent value="about" className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Acerca de {userProfile.name.split(" ")[0]}</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <p className="text-text-secondary leading-relaxed">{userProfile.about}</p>

                    <div>
                      <h3 className="mb-3 font-semibold text-text">Servicios Utilizados</h3>
                      <div className="flex flex-wrap gap-2">
                        {userProfile.servicesUsed.map((service) => (
                          <Badge key={service} variant="secondary">
                            {service}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              {/* Reviews Tab */}
              <TabsContent value="reviews" className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Reseñas de Cuidadores ({userProfile.reviews.length})</CardTitle>
                    <p className="text-sm text-text-secondary">
                      Lo que los cuidadores dicen sobre trabajar con {userProfile.name.split(" ")[0]}
                    </p>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    {/* Rating Breakdown */}
                    <div className="rounded-lg bg-surface-secondary p-4">
                      <div className="mb-4 flex items-center gap-4">
                        <div className="text-4xl font-bold text-text">{userProfile.rating}</div>
                        <div>
                          <div className="flex items-center gap-1">
                            {[1, 2, 3, 4, 5].map((star) => (
                              <Star
                                key={star}
                                className={`h-5 w-5 ${
                                  star <= Math.round(userProfile.rating)
                                    ? "fill-secondary text-secondary"
                                    : "text-gray-300"
                                }`}
                              />
                            ))}
                          </div>
                          <div className="text-sm text-text-secondary">
                            Basado en {userProfile.reviews.length} reseñas
                          </div>
                        </div>
                      </div>

                      <div className="space-y-2">
                        {[5, 4, 3, 2, 1].map((rating) => {
                          const count = userProfile.reviews.filter((r) => r.rating === rating).length
                          const percentage = (count / userProfile.reviews.length) * 100
                          return (
                            <div key={rating} className="flex items-center gap-3">
                              <span className="w-12 text-sm text-text-secondary">{rating} ⭐</span>
                              <Progress value={percentage} className="flex-1" />
                              <span className="w-12 text-right text-sm text-text-secondary">{count}</span>
                            </div>
                          )
                        })}
                      </div>
                    </div>

                    {/* Individual Reviews */}
                    <div className="space-y-4">
                      {userProfile.reviews.map((review) => (
                        <div key={review.id} className="border-b border-border pb-4 last:border-0">
                          <div className="mb-2 flex items-start justify-between">
                            <div>
                              <div className="font-semibold text-text">{review.author}</div>
                              <div className="text-xs text-text-secondary">{review.authorType}</div>
                              <div className="mt-1 flex items-center gap-2">
                                <div className="flex items-center gap-1">
                                  {[1, 2, 3, 4, 5].map((star) => (
                                    <Star
                                      key={star}
                                      className={`h-4 w-4 ${
                                        star <= review.rating ? "fill-secondary text-secondary" : "text-gray-300"
                                      }`}
                                    />
                                  ))}
                                </div>
                                <span className="text-xs text-text-secondary">• {review.date}</span>
                              </div>
                            </div>
                          </div>
                          <p className="text-sm text-text-secondary leading-relaxed">{review.comment}</p>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Contact Card */}
            <Card className="sticky top-24">
              <CardContent className="p-6">
                <div className="space-y-3">
                  <Button className="w-full bg-primary hover:bg-primary-hover" size="lg">
                    <MessageCircle className="mr-2 h-5 w-5" />
                    Enviar Mensaje
                  </Button>
                </div>

                <div className="mt-6 space-y-3 border-t border-border pt-6">
                  <div className="flex items-center gap-3 text-sm">
                    <Shield className="h-5 w-5 text-text-secondary" />
                    <div>
                      <div className="font-medium text-text">Usuario Verificado</div>
                      <div className="text-text-secondary">Identidad confirmada</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 text-sm">
                    <Award className="h-5 w-5 text-text-secondary" />
                    <div>
                      <div className="font-medium text-text">Cliente Confiable</div>
                      <div className="text-text-secondary">Excelente historial</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 text-sm">
                    <Calendar className="h-5 w-5 text-text-secondary" />
                    <div>
                      <div className="font-medium text-text">Miembro desde</div>
                      <div className="text-text-secondary">{userProfile.memberSince}</div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Info Card */}
            <Card>
              <CardHeader>
                <CardTitle className="text-base">Información</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3 text-sm text-text-secondary">
                <p>
                  Este perfil muestra las reseñas que los cuidadores han dejado sobre su experiencia trabajando con este
                  usuario.
                </p>
                <p>Las reseñas ayudan a crear confianza y transparencia en nuestra comunidad.</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
