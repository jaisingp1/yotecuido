"use client"

import { useState, useEffect, useCallback } from "react"
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
import { useAuth } from "@/lib/auth-context"

interface Caregiver {
  caregiver_id: number
  user_id: number
  name: string
  location: string
  avatar: string | null
  category: "ninos" | "mascotas" | "mayores"
  experience: string
  hourly_rate: number
  description: string
  rating: number | null
  reviews: number
  is_verified: boolean // Assuming this comes from the user table
}

export default function SearchPage() {
  const { user, token } = useAuth()
  const [caregivers, setCaregivers] = useState<Caregiver[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  // Filters
  const [selectedCategory, setSelectedCategory] = useState<string>("all")
  const [priceRange, setPriceRange] = useState([3000, 20000])
  const [searchQuery, setSearchQuery] = useState("")
  const [favorites, setFavorites] = useState<number[]>([])

  const fetchCaregivers = useCallback(async () => {
    setIsLoading(true)
    setError(null)
    try {
      const params = new URLSearchParams()
      if (selectedCategory !== "all") params.append("category", selectedCategory)
      params.append("minPrice", priceRange[0].toString())
      params.append("maxPrice", priceRange[1].toString())
      if (searchQuery) params.append("searchQuery", searchQuery)

      const response = await fetch(`/api/buscar?${params.toString()}`)
      if (!response.ok) {
        throw new Error("Failed to fetch caregivers")
      }
      const data = await response.json()
      setCaregivers(data)
    } catch (err: any) {
      setError(err.message)
    } finally {
      setIsLoading(false)
    }
  }, [selectedCategory, priceRange, searchQuery])

  useEffect(() => {
    fetchCaregivers()
  }, [fetchCaregivers])

  // Fetch user's favorites when the component mounts or user changes
  useEffect(() => {
    if (user) {
      const fetchFavorites = async () => {
        try {
          const response = await fetch(`/api/favorites?userId=${user.user_id}`, {
            headers: { Authorization: `Bearer ${token}` },
          })
          if (response.ok) {
            const data = await response.json()
            setFavorites(data.map((fav: any) => fav.caregiver_id))
          }
        } catch (error) {
          console.error("Failed to fetch favorites:", error)
        }
      }
      fetchFavorites()
    }
  }, [user, token])

  const toggleFavorite = async (caregiverId: number) => {
    if (!user) {
      alert("Debes iniciar sesión para guardar cuidadores favoritos.")
      return
    }

    const isFavorite = favorites.includes(caregiverId)
    const originalFavorites = [...favorites]

    // Optimistic UI update
    setFavorites((prev) => (isFavorite ? prev.filter((id) => id !== caregiverId) : [...prev, caregiverId]))

    try {
      const response = await fetch("/api/favorites", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ userId: user.user_id, caregiverId, favorite: !isFavorite }),
      })

      if (!response.ok) {
        // Revert on failure
        setFavorites(originalFavorites)
      }
    } catch (error) {
      console.error("Failed to update favorite status:", error)
      setFavorites(originalFavorites)
    }
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-50 w-full border-b border-border bg-surface/95 backdrop-blur supports-[backdrop-filter]:bg-surface/60">
        <div className="container mx-auto flex h-16 items-center justify-between px-4">
          <Link href="/" className="flex items-center gap-2">
            <img src="/yotecuido_logo.svg" alt="YoTeCuido.cl Logo" className="h-10 w-auto" />
            <span className="text-xl font-bold text-text">YoTeCuido.cl</span>
          </Link>

          <div className="flex items-center gap-3">
            {user ? (
              <Link href="/dashboard">
                <Button variant="ghost" size="sm">Dashboard</Button>
              </Link>
            ) : (
              <>
                <Link href="/login">
                  <Button variant="ghost" size="sm" className="hidden md:flex">
                    Iniciar Sesión
                  </Button>
                </Link>
                <Link href="/registro">
                  <Button size="sm" className="bg-primary hover:bg-primary-hover">
                    Registrarse
                  </Button>
                </Link>
              </>
            )}
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        {/* Search Header */}
        <div className="mb-8">
          <h1 className="mb-4 text-3xl font-bold text-text md:text-4xl">Encuentra tu Cuidador Ideal</h1>

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
          </div>

          <div className="mt-4 flex items-center gap-2 text-sm text-text-secondary">
            <span>{isLoading ? "Buscando..." : `${caregivers.length} cuidadores encontrados`}</span>
          </div>
        </div>

        <div className="grid gap-8 lg:grid-cols-[280px_1fr]">
          {/* Filters Sidebar */}
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
                </div>
              </CardContent>
            </Card>
          </aside>

          {/* Caregiver Results */}
          <div className="space-y-4">
            {isLoading ? (
              <p>Cargando cuidadores...</p>
            ) : error ? (
              <p className="text-red-500">Error: {error}</p>
            ) : caregivers.length > 0 ? (
              caregivers.map((caregiver) => (
                <Card key={caregiver.caregiver_id} className="overflow-hidden transition-shadow hover:shadow-lg">
                  <CardContent className="p-0">
                    <div className="flex flex-col md:flex-row">
                      <div className="relative h-48 w-full md:h-auto md:w-48">
                        <img
                          src={caregiver.avatar || "/placeholder.svg"}
                          alt={caregiver.name}
                          className="h-full w-full object-cover"
                        />
                        {caregiver.is_verified && (
                          <div className="absolute right-2 top-2 rounded-full bg-white p-1.5 shadow-md">
                            <Shield className="h-4 w-4 text-primary" />
                          </div>
                        )}
                        <button
                          onClick={() => toggleFavorite(caregiver.caregiver_id)}
                          className="absolute left-2 top-2 rounded-full bg-white p-1.5 shadow-md transition-colors hover:bg-gray-50"
                        >
                          <Heart
                            className={`h-4 w-4 ${
                              favorites.includes(caregiver.caregiver_id)
                                ? "fill-red-500 text-red-500"
                                : "text-gray-400"
                            }`}
                          />
                        </button>
                      </div>
                      <div className="flex flex-1 flex-col p-6">
                        <div className="mb-3 flex flex-wrap items-start justify-between gap-2">
                          <div>
                            <Link href={`/cuidador/${caregiver.caregiver_id}`}>
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
                            <div className="text-2xl font-bold text-text">
                              ${caregiver.hourly_rate.toLocaleString()}
                            </div>
                            <div className="text-sm text-text-secondary">por hora</div>
                          </div>
                        </div>
                        <div className="mb-3 flex items-center gap-2">
                          <div className="flex items-center gap-1">
                            <Star className="h-5 w-5 fill-secondary text-secondary" />
                            <span className="font-semibold text-text">{caregiver.rating?.toFixed(1) ?? "N/A"}</span>
                          </div>
                          <span className="text-sm text-text-secondary">({caregiver.reviews} reseñas)</span>
                          {caregiver.experience && <span className="text-sm text-text-secondary">•</span>}
                          {caregiver.experience && <span className="text-sm text-text-secondary">{caregiver.experience} de experiencia</span>}
                        </div>
                        <p className="mb-4 text-sm text-text-secondary line-clamp-2">{caregiver.description}</p>
                        <div className="mt-auto flex gap-2">
                          <Button asChild className="flex-1 bg-primary hover:bg-primary-hover">
                            <Link href={`/cuidador/${caregiver.caregiver_id}`}>Ver Perfil</Link>
                          </Button>
                          <Button variant="outline" className="flex-1 bg-transparent">
                            Contactar
                          </Button>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))
            ) : (
              <Card>
                <CardContent className="p-12 text-center">
                  <p className="text-lg text-text-secondary">
                    No se encontraron cuidadores con los filtros seleccionados.
                  </p>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}