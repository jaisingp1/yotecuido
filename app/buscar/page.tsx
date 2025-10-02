"use client"

import { useState } from "react"
import Link from "next/link"
import { Search, SlidersHorizontal, MapPin, Star, Heart, Shield } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { Slider } from "@/components/ui/slider"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"

// Mock data for caregivers
const caregivers = [
  {
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
    badges: ["Elite", "Verificado Plus", "Respuesta Rápida"],
    services: ["Niñera por horas", "Transporte escolar", "Apoyo con tareas"],
    description:
      "Educadora de párvulos con amplia experiencia en cuidado infantil. Me encanta crear actividades educativas y divertidas.",
  },
  {
    id: 2,
    name: "Carlos Muñoz",
    category: "mascotas",
    rating: 5.0,
    reviews: 89,
    hourlyRate: 6000,
    location: "Las Condes, Santiago",
    experience: "3 años",
    image: "/man-dog-walker.jpg",
    verified: true,
    badges: ["Favorito", "Certificado"],
    services: ["Paseo de perros", "Cuidado en casa", "Visitas diarias"],
    description:
      "Amante de los animales con experiencia en adiestramiento canino. Trato a cada mascota como si fuera mía.",
  },
  {
    id: 3,
    name: "Patricia Silva",
    category: "mayores",
    rating: 4.8,
    reviews: 64,
    hourlyRate: 9000,
    location: "Ñuñoa, Santiago",
    experience: "8 años",
    image: "/elderly-caregiver.jpg",
    verified: true,
    badges: ["Elite", "Certificado", "Verificado Plus"],
    services: ["Compañía diurna", "Ayuda con movilidad", "Preparación de alimentos"],
    description: "Técnico en enfermería con especialización en geriatría. Paciencia y dedicación en cada servicio.",
  },
  {
    id: 4,
    name: "Javiera Rojas",
    category: "ninos",
    rating: 4.7,
    reviews: 52,
    hourlyRate: 7500,
    location: "Vitacura, Santiago",
    experience: "4 años",
    image: "/young-woman-nanny.jpg",
    verified: true,
    badges: ["Respuesta Rápida", "Verificado Plus"],
    services: ["Niñera por horas", "Cuidado nocturno", "Actividades recreativas"],
    description: "Estudiante de pedagogía con certificación en primeros auxilios pediátricos. Creativa y responsable.",
  },
  {
    id: 5,
    name: "Roberto Fernández",
    category: "mascotas",
    rating: 4.9,
    reviews: 103,
    hourlyRate: 5500,
    location: "La Reina, Santiago",
    experience: "6 años",
    image: "/man-with-pets.png",
    verified: true,
    badges: ["Elite", "Favorito"],
    services: ["Paseo de perros", "Administración de medicamentos", "Cuidado en casa del cuidador"],
    description: "Veterinario con espacio amplio y seguro para alojar mascotas. Referencias comprobables.",
  },
  {
    id: 6,
    name: "Ana Martínez",
    category: "mayores",
    rating: 5.0,
    reviews: 78,
    hourlyRate: 10000,
    location: "Lo Barnechea, Santiago",
    experience: "10 años",
    image: "/professional-caregiver.jpg",
    verified: true,
    badges: ["Elite", "Certificado", "Favorito"],
    services: ["Compañía nocturna", "Recordatorio de medicamentos", "Acompañamiento a citas médicas"],
    description: "Enfermera profesional especializada en cuidado de adultos mayores. Trato cálido y profesional.",
  },
]

export default function SearchPage() {
  const [selectedCategory, setSelectedCategory] = useState<string>("all")
  const [priceRange, setPriceRange] = useState([5000, 15000])
  const [searchQuery, setSearchQuery] = useState("")
  const [favorites, setFavorites] = useState<number[]>([])

  const toggleFavorite = (id: number) => {
    setFavorites((prev) => (prev.includes(id) ? prev.filter((fav) => fav !== id) : [...prev, id]))
  }

  const filteredCaregivers = caregivers.filter((caregiver) => {
    const matchesCategory = selectedCategory === "all" || caregiver.category === selectedCategory
    const matchesPrice = caregiver.hourlyRate >= priceRange[0] && caregiver.hourlyRate <= priceRange[1]
    const matchesSearch =
      searchQuery === "" ||
      caregiver.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      caregiver.location.toLowerCase().includes(searchQuery.toLowerCase())

    return matchesCategory && matchesPrice && matchesSearch
  })

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
        return "bg-pink-50 border-accent-children"
      case "mascotas":
        return "bg-green-50 border-accent-pets"
      case "mayores":
        return "bg-purple-50 border-accent-elderly"
      default:
        return "bg-blue-50 border-primary"
    }
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
        {/* Search Header */}
        <div className="mb-8">
          <h1 className="mb-4 text-3xl font-bold text-text md:text-4xl">Encuentra tu Cuidador Ideal</h1>

          {/* Search and Filter Bar */}
          <div className="flex flex-col gap-4 md:flex-row">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-text-secondary" />
              <Input
                placeholder="Buscar por nombre o ubicación..."
                className="pl-10"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>

            <Select value={selectedCategory} onValueChange={setSelectedCategory}>
              <SelectTrigger className="w-full md:w-[200px]">
                <SelectValue placeholder="Categoría" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Todas las categorías</SelectItem>
                <SelectItem value="ninos">Cuidado de Niños</SelectItem>
                <SelectItem value="mascotas">Cuidado de Mascotas</SelectItem>
                <SelectItem value="mayores">Cuidado de Mayores</SelectItem>
              </SelectContent>
            </Select>

            {/* Mobile Filter Sheet */}
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="outline" className="md:hidden bg-transparent">
                  <SlidersHorizontal className="mr-2 h-4 w-4" />
                  Filtros
                </Button>
              </SheetTrigger>
              <SheetContent side="left">
                <SheetHeader>
                  <SheetTitle>Filtros</SheetTitle>
                  <SheetDescription>Refina tu búsqueda de cuidadores</SheetDescription>
                </SheetHeader>
                <div className="mt-6 space-y-6">
                  <div>
                    <Label className="mb-3 block text-sm font-medium">Rango de Precio (por hora)</Label>
                    <Slider
                      min={3000}
                      max={20000}
                      step={500}
                      value={priceRange}
                      onValueChange={setPriceRange}
                      className="mb-2"
                    />
                    <div className="flex justify-between text-sm text-text-secondary">
                      <span>${priceRange[0].toLocaleString()}</span>
                      <span>${priceRange[1].toLocaleString()}</span>
                    </div>
                  </div>

                  <div>
                    <Label className="mb-3 block text-sm font-medium">Verificación</Label>
                    <div className="space-y-2">
                      <div className="flex items-center space-x-2">
                        <Checkbox id="verified" defaultChecked />
                        <label htmlFor="verified" className="text-sm">
                          Solo verificados
                        </label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Checkbox id="elite" />
                        <label htmlFor="elite" className="text-sm">
                          Cuidadores Elite
                        </label>
                      </div>
                    </div>
                  </div>

                  <div>
                    <Label className="mb-3 block text-sm font-medium">Calificación</Label>
                    <div className="space-y-2">
                      <div className="flex items-center space-x-2">
                        <Checkbox id="5stars" />
                        <label htmlFor="5stars" className="text-sm flex items-center gap-1">
                          <Star className="h-4 w-4 fill-secondary text-secondary" />
                          5.0
                        </label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Checkbox id="4stars" defaultChecked />
                        <label htmlFor="4stars" className="text-sm flex items-center gap-1">
                          <Star className="h-4 w-4 fill-secondary text-secondary" />
                          4.5+
                        </label>
                      </div>
                    </div>
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          </div>

          <div className="mt-4 flex items-center gap-2 text-sm text-text-secondary">
            <span>{filteredCaregivers.length} cuidadores encontrados</span>
          </div>
        </div>

        <div className="grid gap-8 lg:grid-cols-[280px_1fr]">
          {/* Desktop Filters Sidebar */}
          <aside className="hidden lg:block">
            <Card className="sticky top-24">
              <CardContent className="p-6">
                <h3 className="mb-4 font-semibold text-text">Filtros</h3>

                <div className="space-y-6">
                  <div>
                    <Label className="mb-3 block text-sm font-medium">Rango de Precio (por hora)</Label>
                    <Slider
                      min={3000}
                      max={20000}
                      step={500}
                      value={priceRange}
                      onValueChange={setPriceRange}
                      className="mb-2"
                    />
                    <div className="flex justify-between text-sm text-text-secondary">
                      <span>${priceRange[0].toLocaleString()}</span>
                      <span>${priceRange[1].toLocaleString()}</span>
                    </div>
                  </div>

                  <div>
                    <Label className="mb-3 block text-sm font-medium">Verificación</Label>
                    <div className="space-y-2">
                      <div className="flex items-center space-x-2">
                        <Checkbox id="verified-desktop" defaultChecked />
                        <label htmlFor="verified-desktop" className="text-sm">
                          Solo verificados
                        </label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Checkbox id="elite-desktop" />
                        <label htmlFor="elite-desktop" className="text-sm">
                          Cuidadores Elite
                        </label>
                      </div>
                    </div>
                  </div>

                  <div>
                    <Label className="mb-3 block text-sm font-medium">Calificación</Label>
                    <div className="space-y-2">
                      <div className="flex items-center space-x-2">
                        <Checkbox id="5stars-desktop" />
                        <label htmlFor="5stars-desktop" className="text-sm flex items-center gap-1">
                          <Star className="h-4 w-4 fill-secondary text-secondary" />
                          5.0
                        </label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Checkbox id="4stars-desktop" defaultChecked />
                        <label htmlFor="4stars-desktop" className="text-sm flex items-center gap-1">
                          <Star className="h-4 w-4 fill-secondary text-secondary" />
                          4.5+
                        </label>
                      </div>
                    </div>
                  </div>

                  <div>
                    <Label className="mb-3 block text-sm font-medium">Experiencia</Label>
                    <div className="space-y-2">
                      <div className="flex items-center space-x-2">
                        <Checkbox id="exp1" />
                        <label htmlFor="exp1" className="text-sm">
                          1-3 años
                        </label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Checkbox id="exp2" />
                        <label htmlFor="exp2" className="text-sm">
                          3-5 años
                        </label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Checkbox id="exp3" />
                        <label htmlFor="exp3" className="text-sm">
                          5+ años
                        </label>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </aside>

          {/* Caregiver Results */}
          <div className="space-y-4">
            {filteredCaregivers.map((caregiver) => (
              <Card key={caregiver.id} className="overflow-hidden transition-shadow hover:shadow-lg">
                <CardContent className="p-0">
                  <div className="flex flex-col md:flex-row">
                    {/* Image */}
                    <div className={`relative h-48 w-full md:h-auto md:w-48 ${getCategoryBg(caregiver.category)}`}>
                      <img
                        src={caregiver.image || "/placeholder.svg"}
                        alt={caregiver.name}
                        className="h-full w-full object-cover"
                      />
                      {caregiver.verified && (
                        <div className="absolute right-2 top-2 rounded-full bg-white p-1.5 shadow-md">
                          <Shield className="h-4 w-4 text-primary" />
                        </div>
                      )}
                      <button
                        onClick={() => toggleFavorite(caregiver.id)}
                        className="absolute left-2 top-2 rounded-full bg-white p-1.5 shadow-md transition-colors hover:bg-gray-50"
                      >
                        <Heart
                          className={`h-4 w-4 ${
                            favorites.includes(caregiver.id) ? "fill-red-500 text-red-500" : "text-gray-400"
                          }`}
                        />
                      </button>
                    </div>

                    {/* Content */}
                    <div className="flex flex-1 flex-col p-6">
                      <div className="mb-3 flex flex-wrap items-start justify-between gap-2">
                        <div>
                          <Link href={`/cuidador/${caregiver.id}`}>
                            <h3 className="text-xl font-bold text-text hover:text-primary transition-colors">
                              {caregiver.name}
                            </h3>
                          </Link>
                          <div className="mt-1 flex items-center gap-2 text-sm text-text-secondary">
                            <MapPin className="h-4 w-4" />
                            <span>{caregiver.location}</span>
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="text-2xl font-bold text-text">${caregiver.hourlyRate.toLocaleString()}</div>
                          <div className="text-sm text-text-secondary">por hora</div>
                        </div>
                      </div>

                      {/* Rating */}
                      <div className="mb-3 flex items-center gap-2">
                        <div className="flex items-center gap-1">
                          <Star className="h-5 w-5 fill-secondary text-secondary" />
                          <span className="font-semibold text-text">{caregiver.rating}</span>
                        </div>
                        <span className="text-sm text-text-secondary">({caregiver.reviews} reseñas)</span>
                        <span className="text-sm text-text-secondary">•</span>
                        <span className="text-sm text-text-secondary">{caregiver.experience} de experiencia</span>
                      </div>

                      {/* Badges */}
                      <div className="mb-3 flex flex-wrap gap-2">
                        {caregiver.badges.map((badge) => (
                          <Badge key={badge} variant="secondary" className="text-xs">
                            {badge === "Elite" && "⭐"}
                            {badge === "Verificado Plus" && "✓"}
                            {badge === "Respuesta Rápida" && "⚡"}
                            {badge === "Favorito" && "❤️"}
                            {badge === "Certificado" && "🎓"} {badge}
                          </Badge>
                        ))}
                      </div>

                      {/* Description */}
                      <p className="mb-4 text-sm text-text-secondary line-clamp-2">{caregiver.description}</p>

                      {/* Services */}
                      <div className="mb-4 flex flex-wrap gap-2">
                        {caregiver.services.slice(0, 3).map((service) => (
                          <span
                            key={service}
                            className="rounded-full bg-surface-secondary px-3 py-1 text-xs text-text-secondary"
                          >
                            {service}
                          </span>
                        ))}
                      </div>

                      {/* Actions */}
                      <div className="mt-auto flex gap-2">
                        <Button asChild className="flex-1 bg-primary hover:bg-primary-hover">
                          <Link href={`/cuidador/${caregiver.id}`}>Ver Perfil</Link>
                        </Button>
                        <Button variant="outline" className="flex-1 bg-transparent">
                          Contactar
                        </Button>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}

            {filteredCaregivers.length === 0 && (
              <Card>
                <CardContent className="p-12 text-center">
                  <p className="text-lg text-text-secondary">
                    No se encontraron cuidadores con los filtros seleccionados.
                  </p>
                  <Button
                    variant="outline"
                    className="mt-4 bg-transparent"
                    onClick={() => {
                      setSelectedCategory("all")
                      setPriceRange([5000, 15000])
                      setSearchQuery("")
                    }}
                  >
                    Limpiar filtros
                  </Button>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
