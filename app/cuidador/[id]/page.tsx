"use client"

import { useState } from "react"
import Link from "next/link"
import {
  ArrowLeft,
  MapPin,
  Star,
  Shield,
  CheckCircle2,
  Heart,
  Share2,
  Calendar,
  MessageCircle,
  Clock,
  Award,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Progress } from "@/components/ui/progress"

// Mock data for a caregiver profile
const caregiverProfile = {
  id: 1,
  name: "María González",
  category: "ninos",
  rating: 4.9,
  reviews: 127,
  hourlyRate: 8000,
  location: "Providencia, Santiago",
  experience: "5 años",
  image: "/woman-caregiver.png",
  verified: true,
  badges: ["Elite", "Verificado Plus", "Respuesta Rápida", "Certificado"],
  services: [
    "Niñera por horas",
    "Transporte escolar",
    "Apoyo con tareas",
    "Cuidado nocturno",
    "Actividades recreativas",
  ],
  description:
    "Educadora de párvulos con amplia experiencia en cuidado infantil. Me encanta crear actividades educativas y divertidas para los niños. Tengo certificación en primeros auxilios pediátricos y referencias comprobables de familias con las que he trabajado durante años.",
  about:
    "Soy María, educadora de párvulos titulada con más de 5 años de experiencia trabajando con niños de todas las edades. Mi pasión es crear un ambiente seguro, divertido y educativo para cada niño que cuido. Me especializo en actividades creativas, apoyo escolar y desarrollo de habilidades sociales. Cuento con certificación en primeros auxilios pediátricos actualizada y referencias verificables de todas las familias con las que he trabajado.",
  responseTime: "2 horas",
  responseRate: 98,
  repeatClients: 85,
  totalServices: 234,
  memberSince: "Enero 2020",
  languages: ["Español", "Inglés básico"],
  certifications: [
    "Educadora de Párvulos - Universidad de Chile",
    "Primeros Auxilios Pediátricos - Cruz Roja",
    "Certificado de Inhabilidades vigente",
    "Certificado de Antecedentes vigente",
  ],
  availability: {
    lunes: ["09:00-13:00", "15:00-19:00"],
    martes: ["09:00-13:00", "15:00-19:00"],
    miercoles: ["09:00-19:00"],
    jueves: ["09:00-13:00", "15:00-19:00"],
    viernes: ["09:00-17:00"],
    sabado: ["10:00-14:00"],
    domingo: [],
  },
  reviews: [
    {
      id: 1,
      author: "Carolina P.",
      rating: 5,
      date: "15 de Enero, 2025",
      comment:
        "María es excepcional. Mi hija de 4 años la adora y siempre está emocionada cuando sabe que María vendrá. Es puntual, responsable y muy creativa con las actividades. 100% recomendada.",
      service: "Niñera por horas",
    },
    {
      id: 2,
      author: "Roberto M.",
      rating: 5,
      date: "8 de Enero, 2025",
      comment:
        "Excelente profesional. Ayudó a mi hijo con sus tareas de matemáticas y logró que entendiera conceptos que llevaba semanas sin comprender. Muy paciente y dedicada.",
      service: "Apoyo con tareas",
    },
    {
      id: 3,
      author: "Francisca L.",
      rating: 5,
      date: "28 de Diciembre, 2024",
      comment:
        "María cuidó a mis dos hijos durante nuestras vacaciones. Fue increíble, los mantuvo entretenidos, seguros y felices. Nos mandaba fotos y actualizaciones constantemente. La volveremos a contratar sin dudarlo.",
      service: "Cuidado nocturno",
    },
    {
      id: 4,
      author: "Andrés S.",
      rating: 4,
      date: "15 de Diciembre, 2024",
      comment:
        "Muy buena experiencia. María es profesional y cariñosa con los niños. Solo un pequeño retraso en una ocasión, pero avisó con anticipación.",
      service: "Niñera por horas",
    },
  ],
  photos: [
    "/children-playing.jpg",
    "/educational-activities.jpg",
    "/outdoor-activities-kids.jpg",
    "/arts-and-crafts-children.jpg",
  ],
}

export default function CaregiverProfilePage() {
  const [isFavorite, setIsFavorite] = useState(false)

  const getCategoryColor = (category: string) => {
    switch (category) {
      case "ninos":
        return "text-accent-children"
      case "mascotas":
        return "text-accent-pets"
      case "mayores":
        return "text-accent-elderly"
      default:
        return "text-primary"
    }
  }

  const getCategoryBg = (category: string) => {
    switch (category) {
      case "ninos":
        return "bg-pink-50"
      case "mascotas":
        return "bg-green-50"
      case "mayores":
        return "bg-purple-50"
      default:
        return "bg-blue-50"
    }
  }

  const getCategoryName = (category: string) => {
    switch (category) {
      case "ninos":
        return "Cuidado de Niños"
      case "mascotas":
        return "Cuidado de Mascotas"
      case "mayores":
        return "Cuidado de Mayores"
      default:
        return "Cuidado"
    }
  }

  const dayNames: { [key: string]: string } = {
    lunes: "Lunes",
    martes: "Martes",
    miercoles: "Miércoles",
    jueves: "Jueves",
    viernes: "Viernes",
    sabado: "Sábado",
    domingo: "Domingo",
  }

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
          href="/buscar"
          className="mb-6 inline-flex items-center gap-2 text-sm text-text-secondary hover:text-text"
        >
          <ArrowLeft className="h-4 w-4" />
          Volver a resultados
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
                      <AvatarImage src={caregiverProfile.image || "/placeholder.svg"} alt={caregiverProfile.name} />
                      <AvatarFallback>
                        {caregiverProfile.name
                          .split(" ")
                          .map((n) => n[0])
                          .join("")}
                      </AvatarFallback>
                    </Avatar>
                    {caregiverProfile.verified && (
                      <div className="absolute -bottom-2 -right-2 rounded-full bg-primary p-2 shadow-lg">
                        <Shield className="h-5 w-5 text-white" />
                      </div>
                    )}
                  </div>

                  {/* Info */}
                  <div className="flex-1">
                    <div className="mb-2 flex flex-wrap items-start justify-between gap-4">
                      <div>
                        <h1 className="mb-1 text-3xl font-bold text-text">{caregiverProfile.name}</h1>
                        <div className="flex items-center gap-2 text-text-secondary">
                          <MapPin className="h-4 w-4" />
                          <span>{caregiverProfile.location}</span>
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <Button variant="outline" size="icon" onClick={() => setIsFavorite(!isFavorite)}>
                          <Heart className={`h-5 w-5 ${isFavorite ? "fill-red-500 text-red-500" : ""}`} />
                        </Button>
                        <Button variant="outline" size="icon">
                          <Share2 className="h-5 w-5" />
                        </Button>
                      </div>
                    </div>

                    {/* Rating */}
                    <div className="mb-3 flex items-center gap-4">
                      <div className="flex items-center gap-1">
                        <Star className="h-5 w-5 fill-secondary text-secondary" />
                        <span className="text-lg font-semibold text-text">{caregiverProfile.rating}</span>
                        <span className="text-sm text-text-secondary">({caregiverProfile.reviews} reseñas)</span>
                      </div>
                      <span className="text-sm text-text-secondary">•</span>
                      <span className="text-sm text-text-secondary">{caregiverProfile.experience} de experiencia</span>
                    </div>

                    {/* Category Badge */}
                    <Badge className={`mb-3 ${getCategoryBg(caregiverProfile.category)}`} variant="secondary">
                      {getCategoryName(caregiverProfile.category)}
                    </Badge>

                    {/* Badges */}
                    <div className="flex flex-wrap gap-2">
                      {caregiverProfile.badges.map((badge) => (
                        <Badge key={badge} variant="outline" className="text-xs">
                          {badge === "Elite" && "⭐"}
                          {badge === "Verificado Plus" && "✓"}
                          {badge === "Respuesta Rápida" && "⚡"}
                          {badge === "Certificado" && "🎓"} {badge}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Stats */}
                <div className="mt-6 grid grid-cols-2 gap-4 border-t border-border pt-6 md:grid-cols-4">
                  <div className="text-center">
                    <div className="mb-1 text-2xl font-bold text-text">{caregiverProfile.responseRate}%</div>
                    <div className="text-xs text-text-secondary">Tasa de respuesta</div>
                  </div>
                  <div className="text-center">
                    <div className="mb-1 text-2xl font-bold text-text">{caregiverProfile.responseTime}</div>
                    <div className="text-xs text-text-secondary">Tiempo de respuesta</div>
                  </div>
                  <div className="text-center">
                    <div className="mb-1 text-2xl font-bold text-text">{caregiverProfile.repeatClients}%</div>
                    <div className="text-xs text-text-secondary">Clientes repetidos</div>
                  </div>
                  <div className="text-center">
                    <div className="mb-1 text-2xl font-bold text-text">{caregiverProfile.totalServices}</div>
                    <div className="text-xs text-text-secondary">Servicios completados</div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Tabs */}
            <Tabs defaultValue="about" className="w-full">
              <TabsList className="grid w-full grid-cols-4">
                <TabsTrigger value="about">Sobre mí</TabsTrigger>
                <TabsTrigger value="services">Servicios</TabsTrigger>
                <TabsTrigger value="reviews">Reseñas</TabsTrigger>
                <TabsTrigger value="photos">Fotos</TabsTrigger>
              </TabsList>

              {/* About Tab */}
              <TabsContent value="about" className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Acerca de {caregiverProfile.name.split(" ")[0]}</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <p className="text-text-secondary leading-relaxed">{caregiverProfile.about}</p>

                    <div>
                      <h3 className="mb-3 font-semibold text-text">Idiomas</h3>
                      <div className="flex flex-wrap gap-2">
                        {caregiverProfile.languages.map((lang) => (
                          <Badge key={lang} variant="secondary">
                            {lang}
                          </Badge>
                        ))}
                      </div>
                    </div>

                    <div>
                      <h3 className="mb-3 font-semibold text-text">Certificaciones y Verificaciones</h3>
                      <ul className="space-y-2">
                        {caregiverProfile.certifications.map((cert) => (
                          <li key={cert} className="flex items-start gap-2">
                            <CheckCircle2 className="mt-0.5 h-5 w-5 flex-shrink-0 text-accent-pets" />
                            <span className="text-sm text-text-secondary">{cert}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div>
                      <h3 className="mb-3 font-semibold text-text">Disponibilidad</h3>
                      <div className="space-y-2">
                        {Object.entries(caregiverProfile.availability).map(([day, hours]) => (
                          <div key={day} className="flex items-center justify-between border-b border-border py-2">
                            <span className="font-medium text-text">{dayNames[day]}</span>
                            <span className="text-sm text-text-secondary">
                              {hours.length > 0 ? hours.join(", ") : "No disponible"}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              {/* Services Tab */}
              <TabsContent value="services" className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Servicios Ofrecidos</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid gap-3 md:grid-cols-2">
                      {caregiverProfile.services.map((service) => (
                        <div key={service} className="flex items-center gap-3 rounded-lg border border-border p-4">
                          <CheckCircle2 className="h-5 w-5 flex-shrink-0 text-primary" />
                          <span className="text-sm font-medium text-text">{service}</span>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              {/* Reviews Tab */}
              <TabsContent value="reviews" className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Reseñas ({caregiverProfile.reviews.length})</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    {/* Rating Breakdown */}
                    <div className="rounded-lg bg-surface-secondary p-4">
                      <div className="mb-4 flex items-center gap-4">
                        <div className="text-4xl font-bold text-text">{caregiverProfile.rating}</div>
                        <div>
                          <div className="flex items-center gap-1">
                            {[1, 2, 3, 4, 5].map((star) => (
                              <Star
                                key={star}
                                className={`h-5 w-5 ${
                                  star <= Math.round(caregiverProfile.rating)
                                    ? "fill-secondary text-secondary"
                                    : "text-gray-300"
                                }`}
                              />
                            ))}
                          </div>
                          <div className="text-sm text-text-secondary">
                            Basado en {caregiverProfile.reviews.length} reseñas
                          </div>
                        </div>
                      </div>

                      <div className="space-y-2">
                        {[5, 4, 3, 2, 1].map((rating) => {
                          const count = caregiverProfile.reviews.filter((r) => r.rating === rating).length
                          const percentage = (count / caregiverProfile.reviews.length) * 100
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
                      {caregiverProfile.reviews.map((review) => (
                        <div key={review.id} className="border-b border-border pb-4 last:border-0">
                          <div className="mb-2 flex items-start justify-between">
                            <div>
                              <div className="font-semibold text-text">{review.author}</div>
                              <div className="flex items-center gap-2">
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
                          <Badge variant="secondary" className="mb-2 text-xs">
                            {review.service}
                          </Badge>
                          <p className="text-sm text-text-secondary leading-relaxed">{review.comment}</p>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              {/* Photos Tab */}
              <TabsContent value="photos" className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Galería de Fotos</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-2 gap-4 md:grid-cols-3">
                      {caregiverProfile.photos.map((photo, index) => (
                        <div key={index} className="aspect-square overflow-hidden rounded-lg bg-surface-secondary">
                          <img
                            src={photo || "/placeholder.svg"}
                            alt={`Foto ${index + 1}`}
                            className="h-full w-full object-cover transition-transform hover:scale-105"
                          />
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
            {/* Booking Card */}
            <Card className="sticky top-24">
              <CardContent className="p-6">
                <div className="mb-6 text-center">
                  <div className="mb-1 text-4xl font-bold text-text">
                    ${caregiverProfile.hourlyRate.toLocaleString()}
                  </div>
                  <div className="text-sm text-text-secondary">por hora</div>
                </div>

                <div className="space-y-3">
                  <Button className="w-full bg-primary hover:bg-primary-hover" size="lg">
                    <Calendar className="mr-2 h-5 w-5" />
                    Reservar Ahora
                  </Button>
                  <Button variant="outline" className="w-full bg-transparent" size="lg">
                    <MessageCircle className="mr-2 h-5 w-5" />
                    Enviar Mensaje
                  </Button>
                </div>

                <div className="mt-6 space-y-3 border-t border-border pt-6">
                  <div className="flex items-center gap-3 text-sm">
                    <Clock className="h-5 w-5 text-text-secondary" />
                    <div>
                      <div className="font-medium text-text">Respuesta rápida</div>
                      <div className="text-text-secondary">Responde en {caregiverProfile.responseTime}</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 text-sm">
                    <Shield className="h-5 w-5 text-text-secondary" />
                    <div>
                      <div className="font-medium text-text">Verificado</div>
                      <div className="text-text-secondary">Antecedentes al día</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 text-sm">
                    <Award className="h-5 w-5 text-text-secondary" />
                    <div>
                      <div className="font-medium text-text">Miembro desde</div>
                      <div className="text-text-secondary">{caregiverProfile.memberSince}</div>
                    </div>
                  </div>
                </div>

                <div className="mt-6 rounded-lg bg-blue-50 p-4 text-center">
                  <Shield className="mx-auto mb-2 h-8 w-8 text-primary" />
                  <div className="text-sm font-medium text-text">Pago Seguro</div>
                  <div className="text-xs text-text-secondary">
                    Tu pago está protegido hasta que el servicio se complete
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Safety Tips */}
            <Card>
              <CardHeader>
                <CardTitle className="text-base">Consejos de Seguridad</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3 text-sm text-text-secondary">
                <div className="flex items-start gap-2">
                  <CheckCircle2 className="mt-0.5 h-4 w-4 flex-shrink-0 text-accent-pets" />
                  <span>Siempre comunícate a través de la plataforma</span>
                </div>
                <div className="flex items-start gap-2">
                  <CheckCircle2 className="mt-0.5 h-4 w-4 flex-shrink-0 text-accent-pets" />
                  <span>Verifica las referencias antes de contratar</span>
                </div>
                <div className="flex items-start gap-2">
                  <CheckCircle2 className="mt-0.5 h-4 w-4 flex-shrink-0 text-accent-pets" />
                  <span>Nunca pagues fuera de la plataforma</span>
                </div>
                <div className="flex items-start gap-2">
                  <CheckCircle2 className="mt-0.5 h-4 w-4 flex-shrink-0 text-accent-pets" />
                  <span>Reporta cualquier comportamiento sospechoso</span>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
