"use client"

import { useState } from "react"
import Link from "next/link"
import { Heart, ArrowRight, ArrowLeft, Upload, CheckCircle2, Calendar, DollarSign, FileText } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Textarea } from "@/components/ui/textarea"
import { Checkbox } from "@/components/ui/checkbox"
import { Progress } from "@/components/ui/progress"

type Step = 1 | 2 | 3 | 4

export default function CrearPerfilPage() {
  const [currentStep, setCurrentStep] = useState<Step>(1)
  const [profileData, setProfileData] = useState({
    // Step 1: Basic Info
    bio: "",
    experience: "",
    profilePhoto: null as File | null,
    // Step 2: Services
    services: [] as string[],
    childrenAges: [] as string[],
    petTypes: [] as string[],
    elderlyServices: [] as string[],
    // Step 3: Availability & Pricing
    availability: [] as string[],
    hourlyRate: "",
    // Step 4: Verification
    idDocument: null as File | null,
    backgroundCheck: null as File | null,
    references: "",
  })

  const progress = (currentStep / 4) * 100

  const handleNext = () => {
    if (currentStep < 4) {
      setCurrentStep((currentStep + 1) as Step)
    }
  }

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep((currentStep - 1) as Step)
    }
  }

  const handleSubmit = () => {
    console.log("Profile data:", profileData)
    // Handle profile creation
  }

  const toggleArrayItem = (array: string[], item: string) => {
    return array.includes(item) ? array.filter((i) => i !== item) : [...array, item]
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-background">
      {/* Header */}
      <header className="border-b border-border bg-surface/95 backdrop-blur">
        <div className="container mx-auto flex h-16 items-center justify-between px-4">
          <Link href="/" className="flex items-center gap-2">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary">
              <Heart className="h-5 w-5 text-white" fill="white" />
            </div>
            <span className="text-xl font-bold text-text">YoTeCuido.cl</span>
          </Link>

          <Button variant="ghost" size="sm" asChild>
            <Link href="/dashboard">Salir</Link>
          </Button>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        <div className="mx-auto max-w-3xl">
          {/* Progress Bar */}
          <div className="mb-8">
            <div className="mb-2 flex items-center justify-between text-sm">
              <span className="font-medium text-text">Paso {currentStep} de 4</span>
              <span className="text-text-secondary">{Math.round(progress)}% completado</span>
            </div>
            <Progress value={progress} className="h-2" />
          </div>

          <Card>
            <CardHeader>
              <CardTitle>
                {currentStep === 1 && "Información básica"}
                {currentStep === 2 && "Servicios que ofreces"}
                {currentStep === 3 && "Disponibilidad y tarifas"}
                {currentStep === 4 && "Verificación"}
              </CardTitle>
              <CardDescription>
                {currentStep === 1 && "Cuéntanos sobre ti y tu experiencia"}
                {currentStep === 2 && "Selecciona los servicios que puedes ofrecer"}
                {currentStep === 3 && "Define tu disponibilidad y precio por hora"}
                {currentStep === 4 && "Completa tu verificación para ganar confianza"}
              </CardDescription>
            </CardHeader>
            <CardContent>
              {/* Step 1: Basic Info */}
              {currentStep === 1 && (
                <div className="space-y-6">
                  <div className="space-y-2">
                    <Label htmlFor="profilePhoto">Foto de perfil</Label>
                    <div className="flex items-center gap-4">
                      <div className="flex h-24 w-24 items-center justify-center rounded-full bg-surface-secondary">
                        {profileData.profilePhoto ? (
                          <img
                            src={URL.createObjectURL(profileData.profilePhoto) || "/placeholder.svg"}
                            alt="Profile"
                            className="h-24 w-24 rounded-full object-cover"
                          />
                        ) : (
                          <Upload className="h-8 w-8 text-text-secondary" />
                        )}
                      </div>
                      <div>
                        <Button variant="outline" size="sm" asChild>
                          <label htmlFor="photo-upload" className="cursor-pointer">
                            Subir foto
                          </label>
                        </Button>
                        <input
                          id="photo-upload"
                          type="file"
                          accept="image/*"
                          className="hidden"
                          onChange={(e) =>
                            setProfileData({ ...profileData, profilePhoto: e.target.files?.[0] || null })
                          }
                        />
                        <p className="mt-1 text-xs text-text-secondary">JPG, PNG o GIF (máx. 5MB)</p>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="bio">Sobre ti</Label>
                    <Textarea
                      id="bio"
                      placeholder="Cuéntanos sobre ti, tu personalidad y por qué te apasiona cuidar..."
                      rows={5}
                      value={profileData.bio}
                      onChange={(e) => setProfileData({ ...profileData, bio: e.target.value })}
                    />
                    <p className="text-xs text-text-secondary">{profileData.bio.length}/500 caracteres</p>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="experience">Experiencia</Label>
                    <Textarea
                      id="experience"
                      placeholder="Describe tu experiencia previa en cuidado, certificaciones, cursos, etc..."
                      rows={4}
                      value={profileData.experience}
                      onChange={(e) => setProfileData({ ...profileData, experience: e.target.value })}
                    />
                  </div>
                </div>
              )}

              {/* Step 2: Services */}
              {currentStep === 2 && (
                <div className="space-y-6">
                  <div className="space-y-3">
                    <Label>Categorías de servicio</Label>
                    <div className="space-y-2">
                      {["Cuidado de niños", "Cuidado de mascotas", "Cuidado de adultos mayores"].map((service) => (
                        <div key={service} className="flex items-center space-x-2">
                          <Checkbox
                            id={service}
                            checked={profileData.services.includes(service)}
                            onCheckedChange={() =>
                              setProfileData({
                                ...profileData,
                                services: toggleArrayItem(profileData.services, service),
                              })
                            }
                          />
                          <label htmlFor={service} className="text-sm font-medium leading-none">
                            {service}
                          </label>
                        </div>
                      ))}
                    </div>
                  </div>

                  {profileData.services.includes("Cuidado de niños") && (
                    <div className="space-y-3 rounded-lg border border-border bg-pink-50 p-4">
                      <Label>Edades de niños que puedes cuidar</Label>
                      <div className="grid grid-cols-2 gap-2">
                        {["0-1 años", "1-3 años", "3-5 años", "5-10 años", "10+ años"].map((age) => (
                          <div key={age} className="flex items-center space-x-2">
                            <Checkbox
                              id={age}
                              checked={profileData.childrenAges.includes(age)}
                              onCheckedChange={() =>
                                setProfileData({
                                  ...profileData,
                                  childrenAges: toggleArrayItem(profileData.childrenAges, age),
                                })
                              }
                            />
                            <label htmlFor={age} className="text-sm">
                              {age}
                            </label>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {profileData.services.includes("Cuidado de mascotas") && (
                    <div className="space-y-3 rounded-lg border border-border bg-green-50 p-4">
                      <Label>Tipos de mascotas</Label>
                      <div className="grid grid-cols-2 gap-2">
                        {["Perros pequeños", "Perros grandes", "Gatos", "Aves", "Otros"].map((pet) => (
                          <div key={pet} className="flex items-center space-x-2">
                            <Checkbox
                              id={pet}
                              checked={profileData.petTypes.includes(pet)}
                              onCheckedChange={() =>
                                setProfileData({
                                  ...profileData,
                                  petTypes: toggleArrayItem(profileData.petTypes, pet),
                                })
                              }
                            />
                            <label htmlFor={pet} className="text-sm">
                              {pet}
                            </label>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {profileData.services.includes("Cuidado de adultos mayores") && (
                    <div className="space-y-3 rounded-lg border border-border bg-purple-50 p-4">
                      <Label>Servicios para adultos mayores</Label>
                      <div className="space-y-2">
                        {["Compañía", "Asistencia médica", "Movilidad", "Preparación de comidas"].map((service) => (
                          <div key={service} className="flex items-center space-x-2">
                            <Checkbox
                              id={service}
                              checked={profileData.elderlyServices.includes(service)}
                              onCheckedChange={() =>
                                setProfileData({
                                  ...profileData,
                                  elderlyServices: toggleArrayItem(profileData.elderlyServices, service),
                                })
                              }
                            />
                            <label htmlFor={service} className="text-sm">
                              {service}
                            </label>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              )}

              {/* Step 3: Availability & Pricing */}
              {currentStep === 3 && (
                <div className="space-y-6">
                  <div className="space-y-3">
                    <Label className="flex items-center gap-2">
                      <Calendar className="h-4 w-4" />
                      Disponibilidad
                    </Label>
                    <div className="grid grid-cols-2 gap-2 md:grid-cols-3">
                      {[
                        "Lunes",
                        "Martes",
                        "Miércoles",
                        "Jueves",
                        "Viernes",
                        "Sábado",
                        "Domingo",
                        "Mañanas",
                        "Tardes",
                        "Noches",
                        "Fines de semana",
                        "Emergencias",
                      ].map((day) => (
                        <div key={day} className="flex items-center space-x-2">
                          <Checkbox
                            id={day}
                            checked={profileData.availability.includes(day)}
                            onCheckedChange={() =>
                              setProfileData({
                                ...profileData,
                                availability: toggleArrayItem(profileData.availability, day),
                              })
                            }
                          />
                          <label htmlFor={day} className="text-sm">
                            {day}
                          </label>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="hourlyRate" className="flex items-center gap-2">
                      <DollarSign className="h-4 w-4" />
                      Tarifa por hora (CLP)
                    </Label>
                    <Input
                      id="hourlyRate"
                      type="number"
                      placeholder="8000"
                      value={profileData.hourlyRate}
                      onChange={(e) => setProfileData({ ...profileData, hourlyRate: e.target.value })}
                    />
                    <p className="text-xs text-text-secondary">Tarifa promedio en tu zona: $8.000 - $15.000 por hora</p>
                  </div>

                  <div className="rounded-lg bg-blue-50 p-4">
                    <h4 className="mb-2 font-semibold text-sm">Consejos para establecer tu tarifa:</h4>
                    <ul className="space-y-1 text-sm text-text-secondary">
                      <li>• Considera tu experiencia y certificaciones</li>
                      <li>• Investiga las tarifas en tu zona</li>
                      <li>• Puedes ajustar tu tarifa en cualquier momento</li>
                      <li>• Las tarifas más competitivas reciben más solicitudes</li>
                    </ul>
                  </div>
                </div>
              )}

              {/* Step 4: Verification */}
              {currentStep === 4 && (
                <div className="space-y-6">
                  <div className="rounded-lg bg-blue-50 p-4">
                    <p className="text-sm text-text-secondary">
                      La verificación es obligatoria para garantizar la seguridad de las familias. Todos los documentos
                      son revisados por nuestro equipo.
                    </p>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="idDocument" className="flex items-center gap-2">
                      <FileText className="h-4 w-4" />
                      Cédula de identidad o pasaporte
                    </Label>
                    <div className="flex items-center gap-3">
                      <Button variant="outline" size="sm" asChild>
                        <label htmlFor="id-upload" className="cursor-pointer">
                          <Upload className="mr-2 h-4 w-4" />
                          Subir documento
                        </label>
                      </Button>
                      <input
                        id="id-upload"
                        type="file"
                        accept="image/*,.pdf"
                        className="hidden"
                        onChange={(e) => setProfileData({ ...profileData, idDocument: e.target.files?.[0] || null })}
                      />
                      {profileData.idDocument && (
                        <span className="flex items-center gap-2 text-sm text-green-600">
                          <CheckCircle2 className="h-4 w-4" />
                          {profileData.idDocument.name}
                        </span>
                      )}
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="backgroundCheck">Certificado de antecedentes</Label>
                    <div className="flex items-center gap-3">
                      <Button variant="outline" size="sm" asChild>
                        <label htmlFor="background-upload" className="cursor-pointer">
                          <Upload className="mr-2 h-4 w-4" />
                          Subir certificado
                        </label>
                      </Button>
                      <input
                        id="background-upload"
                        type="file"
                        accept="image/*,.pdf"
                        className="hidden"
                        onChange={(e) =>
                          setProfileData({ ...profileData, backgroundCheck: e.target.files?.[0] || null })
                        }
                      />
                      {profileData.backgroundCheck && (
                        <span className="flex items-center gap-2 text-sm text-green-600">
                          <CheckCircle2 className="h-4 w-4" />
                          {profileData.backgroundCheck.name}
                        </span>
                      )}
                    </div>
                    <p className="text-xs text-text-secondary">
                      Puedes obtenerlo en{" "}
                      <a
                        href="https://www.registrocivil.cl"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-primary hover:underline"
                      >
                        Registro Civil
                      </a>
                    </p>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="references">Referencias (opcional)</Label>
                    <Textarea
                      id="references"
                      placeholder="Nombres y contactos de personas que puedan dar referencias sobre tu trabajo..."
                      rows={4}
                      value={profileData.references}
                      onChange={(e) => setProfileData({ ...profileData, references: e.target.value })}
                    />
                  </div>

                  <div className="rounded-lg border border-green-200 bg-green-50 p-4">
                    <h4 className="mb-2 flex items-center gap-2 font-semibold text-sm text-green-800">
                      <CheckCircle2 className="h-5 w-5" />
                      Beneficios de la verificación
                    </h4>
                    <ul className="space-y-1 text-sm text-green-700">
                      <li>• Insignia de "Verificado" en tu perfil</li>
                      <li>• Mayor confianza de las familias</li>
                      <li>• Más solicitudes de servicio</li>
                      <li>• Acceso a trabajos premium</li>
                    </ul>
                  </div>
                </div>
              )}

              {/* Navigation Buttons */}
              <div className="mt-8 flex items-center justify-between gap-4">
                <Button variant="outline" onClick={handleBack} disabled={currentStep === 1}>
                  <ArrowLeft className="mr-2 h-4 w-4" />
                  Anterior
                </Button>

                {currentStep < 4 ? (
                  <Button onClick={handleNext} className="bg-primary hover:bg-primary-hover">
                    Siguiente
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                ) : (
                  <Button onClick={handleSubmit} className="bg-primary hover:bg-primary-hover">
                    Completar perfil
                    <CheckCircle2 className="ml-2 h-4 w-4" />
                  </Button>
                )}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
