"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { ArrowLeft, Clock, Shield, AlertCircle, Heart } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"

// Mock caregiver data
const caregiver = {
  id: 1,
  name: "María González",
  category: "ninos",
  rating: 4.9,
  reviews: 127,
  hourlyRate: 8000,
  image: "/woman-caregiver.png",
  services: ["Niñera por horas", "Transporte escolar", "Apoyo con tareas", "Cuidado nocturno"],
}

export default function BookingPage() {
  const router = useRouter()
  const [selectedService, setSelectedService] = useState("")
  const [selectedDate, setSelectedDate] = useState("")
  const [startTime, setStartTime] = useState("")
  const [endTime, setEndTime] = useState("")
  const [location, setLocation] = useState("")
  const [notes, setNotes] = useState("")
  const [agreedToTerms, setAgreedToTerms] = useState(false)

  const calculateHours = () => {
    if (!startTime || !endTime) return 0
    const start = Number.parseInt(startTime.split(":")[0])
    const end = Number.parseInt(endTime.split(":")[0])
    return Math.max(0, end - start)
  }

  const hours = calculateHours()
  const subtotal = hours * caregiver.hourlyRate
  const serviceFee = Math.round(subtotal * 0.1)
  const total = subtotal + serviceFee

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // In a real app, this would process the booking
    router.push("/pago/confirmar")
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
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        <Link
          href={`/cuidador/${caregiver.id}`}
          className="mb-6 inline-flex items-center gap-2 text-sm text-text-secondary hover:text-text"
        >
          <ArrowLeft className="h-4 w-4" />
          Volver al perfil
        </Link>

        <div className="mb-6">
          <h1 className="mb-2 text-3xl font-bold text-text">Solicitar Reserva</h1>
          <p className="text-text-secondary">Completa los detalles de tu reserva</p>
        </div>

        <div className="grid gap-8 lg:grid-cols-[1fr_400px]">
          {/* Booking Form */}
          <div>
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Caregiver Info */}
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center gap-4">
                    <Avatar className="h-16 w-16">
                      <AvatarImage src={caregiver.image || "/placeholder.svg"} alt={caregiver.name} />
                      <AvatarFallback>
                        {caregiver.name
                          .split(" ")
                          .map((n) => n[0])
                          .join("")}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <h3 className="font-semibold text-text">{caregiver.name}</h3>
                      <div className="flex items-center gap-2 text-sm text-text-secondary">
                        <span className="flex items-center gap-1">⭐ {caregiver.rating}</span>
                        <span>•</span>
                        <span>{caregiver.reviews} reseñas</span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Service Selection */}
              <Card>
                <CardHeader>
                  <CardTitle>Servicio</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <Label htmlFor="service">Selecciona el servicio</Label>
                    <Select value={selectedService} onValueChange={setSelectedService} required>
                      <SelectTrigger id="service">
                        <SelectValue placeholder="Elige un servicio" />
                      </SelectTrigger>
                      <SelectContent>
                        {caregiver.services.map((service) => (
                          <SelectItem key={service} value={service}>
                            {service}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </CardContent>
              </Card>

              {/* Date and Time */}
              <Card>
                <CardHeader>
                  <CardTitle>Fecha y Horario</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <Label htmlFor="date">Fecha</Label>
                    <Input
                      id="date"
                      type="date"
                      value={selectedDate}
                      onChange={(e) => setSelectedDate(e.target.value)}
                      min={new Date().toISOString().split("T")[0]}
                      required
                    />
                  </div>
                  <div className="grid gap-4 md:grid-cols-2">
                    <div>
                      <Label htmlFor="start-time">Hora de inicio</Label>
                      <Input
                        id="start-time"
                        type="time"
                        value={startTime}
                        onChange={(e) => setStartTime(e.target.value)}
                        required
                      />
                    </div>
                    <div>
                      <Label htmlFor="end-time">Hora de término</Label>
                      <Input
                        id="end-time"
                        type="time"
                        value={endTime}
                        onChange={(e) => setEndTime(e.target.value)}
                        required
                      />
                    </div>
                  </div>
                  {hours > 0 && (
                    <div className="rounded-lg bg-blue-50 p-3 text-sm text-text">
                      <Clock className="mb-1 inline h-4 w-4" /> Duración: {hours} {hours === 1 ? "hora" : "horas"}
                    </div>
                  )}
                </CardContent>
              </Card>

              {/* Location */}
              <Card>
                <CardHeader>
                  <CardTitle>Ubicación</CardTitle>
                </CardHeader>
                <CardContent>
                  <Label htmlFor="location">Dirección del servicio</Label>
                  <Input
                    id="location"
                    type="text"
                    placeholder="Ej: Av. Providencia 1234, Providencia"
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    required
                  />
                </CardContent>
              </Card>

              {/* Additional Notes */}
              <Card>
                <CardHeader>
                  <CardTitle>Notas Adicionales</CardTitle>
                </CardHeader>
                <CardContent>
                  <Label htmlFor="notes">Información adicional para el cuidador (opcional)</Label>
                  <Textarea
                    id="notes"
                    placeholder="Ej: Mi hijo tiene alergia al maní, por favor no traer snacks con frutos secos..."
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                    rows={4}
                  />
                </CardContent>
              </Card>

              {/* Terms */}
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-start gap-3">
                    <Checkbox
                      id="terms"
                      checked={agreedToTerms}
                      onCheckedChange={(checked) => setAgreedToTerms(checked as boolean)}
                      required
                    />
                    <div className="text-sm">
                      <Label htmlFor="terms" className="cursor-pointer font-normal">
                        Acepto los{" "}
                        <Link href="/terminos" className="text-primary hover:underline">
                          términos y condiciones
                        </Link>{" "}
                        y la{" "}
                        <Link href="/politica-cancelacion" className="text-primary hover:underline">
                          política de cancelación
                        </Link>
                      </Label>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Button
                type="submit"
                size="lg"
                className="w-full bg-primary hover:bg-primary-hover"
                disabled={!agreedToTerms || hours === 0}
              >
                Continuar al Pago
              </Button>
            </form>
          </div>

          {/* Summary Sidebar */}
          <div className="space-y-6">
            <Card className="sticky top-24">
              <CardHeader>
                <CardTitle>Resumen de Reserva</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3 border-b border-border pb-4">
                  <div className="flex justify-between text-sm">
                    <span className="text-text-secondary">Tarifa por hora</span>
                    <span className="font-medium text-text">${caregiver.hourlyRate.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-text-secondary">Horas</span>
                    <span className="font-medium text-text">{hours}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-text-secondary">Subtotal</span>
                    <span className="font-medium text-text">${subtotal.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-text-secondary">Tarifa de servicio (10%)</span>
                    <span className="font-medium text-text">${serviceFee.toLocaleString()}</span>
                  </div>
                </div>
                <div className="flex justify-between">
                  <span className="font-semibold text-text">Total</span>
                  <span className="text-2xl font-bold text-text">${total.toLocaleString()}</span>
                </div>

                <div className="rounded-lg bg-blue-50 p-4">
                  <div className="mb-2 flex items-center gap-2">
                    <Shield className="h-5 w-5 text-primary" />
                    <span className="font-medium text-text">Pago Seguro</span>
                  </div>
                  <p className="text-xs text-text-secondary">
                    Tu pago está protegido. El cuidador recibirá el pago solo después de que el servicio se complete
                    satisfactoriamente.
                  </p>
                </div>

                <div className="rounded-lg border border-border bg-surface-secondary p-4">
                  <div className="mb-2 flex items-center gap-2">
                    <AlertCircle className="h-5 w-5 text-secondary" />
                    <span className="font-medium text-text">Política de Cancelación</span>
                  </div>
                  <p className="text-xs text-text-secondary">
                    Cancelación gratuita hasta 24 horas antes del servicio. Después de ese plazo se aplicará un cargo
                    del 50%.
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
