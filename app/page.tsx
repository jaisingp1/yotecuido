import Link from "next/link"
import { Search, Shield, Star, Clock, Heart, CheckCircle2, ArrowRight, Menu } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

export default function HomePage() {
  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container mx-auto flex h-16 items-center justify-between px-4">
          <Link href="/" className="flex items-center gap-2">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary">
              <Heart className="h-5 w-5 text-primary-foreground" fill="currentColor" />
            </div>
            <span className="text-xl font-bold text-foreground">YoTeCuido.cl</span>
          </Link>

          <nav className="hidden items-center gap-6 md:flex">
            <Link href="/buscar" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
              Buscar Cuidadores
            </Link>
            <Link
              href="/como-funciona"
              className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
            >
              Cómo Funciona
            </Link>
            <Link
              href="/ser-cuidador"
              className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
            >
              Ser Cuidador
            </Link>
          </nav>

          <div className="flex items-center gap-3">
            <Link href="/login">
              <Button variant="ghost" size="sm" className="hidden md:flex">
                Iniciar Sesión
              </Button>
            </Link>
            <Link href="/registro">
              <Button size="sm">
                Registrarse
              </Button>
            </Link>
            <Button variant="ghost" size="icon" className="md:hidden">
              <Menu className="h-5 w-5" />
            </Button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-b from-sky-50 to-background py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-3xl text-center">
            <Badge className="mb-4 bg-primary/10 text-primary hover:bg-primary/20">
              Cuidadores Verificados en Chile
            </Badge>
            <h1 className="mb-6 text-4xl font-bold leading-tight text-foreground text-balance md:text-5xl lg:text-6xl">
              Cuidamos lo que más quieres
            </h1>
            <p className="mb-8 text-lg text-muted-foreground text-pretty md:text-xl">
              Conecta con cuidadores verificados para tus niños, mascotas y adultos mayores. Tranquilidad y confianza en
              una sola plataforma.
            </p>

            {/* Search Bar */}
            <div className="mx-auto max-w-2xl">
              <div className="flex flex-col gap-3 rounded-xl bg-white p-4 shadow-xl md:flex-row">
                <div className="flex-1">
                  <Input placeholder="¿Qué tipo de cuidado necesitas?" className="h-12 border-0 bg-secondary" />
                </div>
                <div className="flex-1">
                  <Input placeholder="Ciudad o comuna" className="h-12 border-0 bg-secondary" />
                </div>
                <Button size="lg" className="h-12">
                  <Search className="mr-2 h-5 w-5" />
                  Buscar
                </Button>
              </div>
            </div>

            {/* Trust Indicators */}
            <div className="mt-8 flex flex-wrap items-center justify-center gap-6 text-sm text-muted-foreground">
              <div className="flex items-center gap-2">
                <Shield className="h-5 w-5 text-primary" />
                <span>Verificación de antecedentes</span>
              </div>
              <div className="flex items-center gap-2">
                <Star className="h-5 w-5 text-yellow-500" fill="currentColor" />
                <span>+1,000 reseñas 5 estrellas</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="h-5 w-5 text-green-500" />
                <span>Seguro incluido</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Service Categories */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="mb-12 text-center">
            <h2 className="mb-4 text-3xl font-bold text-foreground md:text-4xl">Nuestros Servicios</h2>
            <p className="text-lg text-muted-foreground">Encuentra el cuidado perfecto para tu familia</p>
          </div>

          <div className="grid gap-6 md:grid-cols-3">
            {/* Children Care */}
            <Link href="/buscar?categoria=ninos">
              <Card className="group h-full overflow-hidden border-2 transition-all hover:border-orange-200 hover:shadow-lg">
                <CardContent className="p-0">
                  <div className="relative h-48 bg-gradient-to-br from-orange-100 to-orange-50">
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="flex h-24 w-24 items-center justify-center rounded-full bg-orange-200/20">
                        <span className="text-5xl">👶</span>
                      </div>
                    </div>
                  </div>
                  <div className="p-6">
                    <h3 className="mb-2 text-2xl font-bold text-foreground">A Tus Niños</h3>
                    <p className="mb-4 text-muted-foreground">
                      Niñeras verificadas, transporte escolar, apoyo con tareas y cuidado nocturno.
                    </p>
                    <ul className="mb-4 space-y-2 text-sm text-muted-foreground">
                      <li className="flex items-center gap-2">
                        <CheckCircle2 className="h-4 w-4 text-orange-500" />
                        Certificado de inhabilidades
                      </li>
                      <li className="flex items-center gap-2">
                        <CheckCircle2 className="h-4 w-4 text-orange-500" />
                        Primeros auxilios pediátricos
                      </li>
                      <li className="flex items-center gap-2">
                        <CheckCircle2 className="h-4 w-4 text-orange-500" />
                        Referencias verificadas
                      </li>
                    </ul>
                    <div className="flex items-center text-orange-600 font-medium group-hover:gap-2 transition-all">
                      Ver cuidadores
                      <ArrowRight className="ml-1 h-4 w-4 transition-transform group-hover:translate-x-1" />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </Link>

            {/* Pet Care */}
            <Link href="/buscar?categoria=mascotas">
              <Card className="group h-full overflow-hidden border-2 transition-all hover:border-green-200 hover:shadow-lg">
                <CardContent className="p-0">
                  <div className="relative h-48 bg-gradient-to-br from-green-100 to-green-50">
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="flex h-24 w-24 items-center justify-center rounded-full bg-green-200/20">
                        <span className="text-5xl">🐾</span>
                      </div>
                    </div>
                  </div>
                  <div className="p-6">
                    <h3 className="mb-2 text-2xl font-bold text-foreground">A Tus Mascotas</h3>
                    <p className="mb-4 text-muted-foreground">
                      Paseos, cuidado en casa, visitas diarias y administración de medicamentos.
                    </p>
                    <ul className="mb-4 space-y-2 text-sm text-muted-foreground">
                      <li className="flex items-center gap-2">
                        <CheckCircle2 className="h-4 w-4 text-green-500" />
                        Experiencia demostrable
                      </li>
                      <li className="flex items-center gap-2">
                        <CheckCircle2 className="h-4 w-4 text-green-500" />
                        Espacios verificados
                      </li>
                      <li className="flex items-center gap-2">
                        <CheckCircle2 className="h-4 w-4 text-green-500" />
                        Actualizaciones con fotos
                      </li>
                    </ul>
                    <div className="flex items-center text-green-600 font-medium group-hover:gap-2 transition-all">
                      Ver cuidadores
                      <ArrowRight className="ml-1 h-4 w-4 transition-transform group-hover:translate-x-1" />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </Link>

            {/* Elderly Care */}
            <Link href="/buscar?categoria=mayores">
              <Card className="group h-full overflow-hidden border-2 transition-all hover:border-sky-200 hover:shadow-lg">
                <CardContent className="p-0">
                  <div className="relative h-48 bg-gradient-to-br from-sky-100 to-sky-50">
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="flex h-24 w-24 items-center justify-center rounded-full bg-sky-200/20">
                        <span className="text-5xl">👵</span>
                      </div>
                    </div>
                  </div>
                  <div className="p-6">
                    <h3 className="mb-2 text-2xl font-bold text-foreground">A Tus Mayores</h3>
                    <p className="mb-4 text-muted-foreground">
                      Compañía, ayuda con movilidad, preparación de alimentos y acompañamiento médico.
                    </p>
                    <ul className="mb-4 space-y-2 text-sm text-muted-foreground">
                      <li className="flex items-center gap-2">
                        <CheckCircle2 className="h-4 w-4 text-sky-500" />
                        Certificado de salud
                      </li>
                      <li className="flex items-center gap-2">
                        <CheckCircle2 className="h-4 w-4 text-sky-500" />
                        Primeros auxilios básicos
                      </li>
                      <li className="flex items-center gap-2">
                        <CheckCircle2 className="h-4 w-4 text-sky-500" />
                        Capacitación especializada
                      </li>
                    </ul>
                    <div className="flex items-center text-sky-600 font-medium group-hover:gap-2 transition-all">
                      Ver cuidadores
                      <ArrowRight className="ml-1 h-4 w-4 transition-transform group-hover:translate-x-1" />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </Link>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="bg-secondary py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="mb-12 text-center">
            <h2 className="mb-4 text-3xl font-bold text-foreground md:text-4xl">Cómo Funciona</h2>
            <p className="text-lg text-muted-foreground">Encuentra tu cuidador ideal en 3 simples pasos</p>
          </div>

          <div className="grid gap-8 md:grid-cols-3">
            <div className="text-center">
              <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-primary text-2xl font-bold text-primary-foreground">
                1
              </div>
              <h3 className="mb-2 text-xl font-bold text-foreground">Busca y Compara</h3>
              <p className="text-muted-foreground">
                Explora perfiles verificados, lee reseñas y compara tarifas de cuidadores en tu zona.
              </p>
            </div>

            <div className="text-center">
              <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-primary text-2xl font-bold text-primary-foreground">
                2
              </div>
              <h3 className="mb-2 text-xl font-bold text-foreground">Conecta y Reserva</h3>
              <p className="text-muted-foreground">
                Chatea con cuidadores, agenda una reunión y reserva el servicio de forma segura.
              </p>
            </div>

            <div className="text-center">
              <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-primary text-2xl font-bold text-primary-foreground">
                3
              </div>
              <h3 className="mb-2 text-xl font-bold text-foreground">Relájate y Califica</h3>
              <p className="text-muted-foreground">
                Disfruta del servicio con tranquilidad y comparte tu experiencia con la comunidad.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Trust & Safety */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-4xl">
            <div className="mb-12 text-center">
              <h2 className="mb-4 text-3xl font-bold text-foreground md:text-4xl">Tu Seguridad es Nuestra Prioridad</h2>
              <p className="text-lg text-muted-foreground">Verificamos cada detalle para que tengas total tranquilidad</p>
            </div>

            <div className="grid gap-6 md:grid-cols-2">
              <Card>
                <CardContent className="p-6">
                  <Shield className="mb-4 h-12 w-12 text-primary" />
                  <h3 className="mb-2 text-xl font-bold text-foreground">Verificación Completa</h3>
                  <p className="text-muted-foreground">
                    Certificados de antecedentes, inhabilidades y referencias comprobadas para cada cuidador.
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <CheckCircle2 className="mb-4 h-12 w-12 text-green-500" />
                  <h3 className="mb-2 text-xl font-bold text-foreground">Seguro Incluido</h3>
                  <p className="text-muted-foreground">
                    Protección ante incidentes con seguro de responsabilidad civil en cada servicio.
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <Star className="mb-4 h-12 w-12 text-yellow-500" />
                  <h3 className="mb-2 text-xl font-bold text-foreground">Sistema de Calificaciones</h3>
                  <p className="text-muted-foreground">
                    Reseñas reales de familias chilenas para ayudarte a tomar la mejor decisión.
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <Clock className="mb-4 h-12 w-12 text-sky-500" />
                  <h3 className="mb-2 text-xl font-bold text-foreground">Soporte 24/7</h3>
                  <p className="text-muted-foreground">
                    Equipo disponible en todo momento para resolver cualquier duda o emergencia.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-primary py-16 text-white md:py-24">
        <div className="container mx-auto px-4 text-center">
          <h2 className="mb-4 text-3xl font-bold text-balance md:text-4xl">
            ¿Listo para encontrar el cuidador perfecto?
          </h2>
          <p className="mb-8 text-lg text-blue-100">Únete a miles de familias que confían en YoTeCuido.cl</p>
          <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Button size="lg" variant="secondary" className="bg-white text-primary hover:bg-gray-100">
              Buscar Cuidadores
            </Button>
            <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10 bg-transparent">
              Ser Cuidador
            </Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t bg-secondary py-12">
        <div className="container mx-auto px-4">
          <div className="grid gap-8 md:grid-cols-4">
            <div>
              <div className="mb-4 flex items-center gap-2">
                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary">
                  <Heart className="h-4 w-4 text-white" fill="white" />
                </div>
                <span className="font-bold text-foreground">YoTeCuido.cl</span>
              </div>
              <p className="text-sm text-muted-foreground">Cuidamos lo que más quieres</p>
            </div>

            <div>
              <h4 className="mb-4 font-semibold text-foreground">Servicios</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>
                  <Link href="/buscar?categoria=ninos" className="hover:text-foreground">
                    Cuidado de Niños
                  </Link>
                </li>
                <li>
                  <Link href="/buscar?categoria=mascotas" className="hover:text-foreground">
                    Cuidado de Mascotas
                  </Link>
                </li>
                <li>
                  <Link href="/buscar?categoria=mayores" className="hover:text-foreground">
                    Cuidado de Mayores
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="mb-4 font-semibold text-foreground">Empresa</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>
                  <Link href="/como-funciona" className="hover:text-foreground">
                    Cómo Funciona
                  </Link>
                </li>
                <li>
                  <Link href="/ser-cuidador" className="hover:text-foreground">
                    Ser Cuidador
                  </Link>
                </li>
                <li>
                  <Link href="/seguridad" className="hover:text-foreground">
                    Seguridad
                  </Link>
                </li>
                <li>
                  <Link href="/ayuda" className="hover:text-foreground">
                    Centro de Ayuda
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="mb-4 font-semibold text-foreground">Legal</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>
                  <Link href="/terminos" className="hover:text-foreground">
                    Términos y Condiciones
                  </Link>
                </li>
                <li>
                  <Link href="/privacidad" className="hover:text-foreground">
                    Política de Privacidad
                  </Link>
                </li>
                <li>
                  <Link href="/contacto" className="hover:text-foreground">
                    Contacto
                  </Link>
                </li>
              </ul>
            </div>
          </div>

          <div className="mt-8 border-t pt-8 text-center text-sm text-muted-foreground">
            <p>© 2025 YoTeCuido.cl - Todos los derechos reservados</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
