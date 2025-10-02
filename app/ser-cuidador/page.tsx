import Link from "next/link"
import {
  Heart,
  Menu,
  TrendingUp,
  Calendar,
  Shield,
  DollarSign,
  Users,
  Clock,
  CheckCircle2,
  Star,
  ArrowRight,
  Briefcase,
  Award,
  Smartphone,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

export default function SerCuidadorPage() {
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

          <nav className="hidden items-center gap-6 md:flex">
            <Link href="/buscar" className="text-sm font-medium text-text-secondary hover:text-text transition-colors">
              Buscar Cuidadores
            </Link>
            <Link
              href="/como-funciona"
              className="text-sm font-medium text-text-secondary hover:text-text transition-colors"
            >
              Cómo Funciona
            </Link>
            <Link
              href="/ser-cuidador"
              className="text-sm font-medium text-primary hover:text-primary-hover transition-colors"
            >
              Ser Cuidador
            </Link>
          </nav>

          <div className="flex items-center gap-3">
            <Button variant="ghost" size="sm" className="hidden md:flex" asChild>
              <Link href="/login">Iniciar Sesión</Link>
            </Button>
            <Button size="sm" className="bg-primary hover:bg-primary-hover" asChild>
              <Link href="/registro">Registrarse</Link>
            </Button>
            <Button variant="ghost" size="icon" className="md:hidden">
              <Menu className="h-5 w-5" />
            </Button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-primary/10 via-accent-children/5 to-accent-pets/5 py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-4xl">
            <div className="grid gap-8 md:grid-cols-2 md:items-center">
              <div>
                <Badge className="mb-4 bg-primary/10 text-primary hover:bg-primary/20">Únete a Nuestra Comunidad</Badge>
                <h1 className="mb-6 text-4xl font-bold leading-tight text-text text-balance md:text-5xl lg:text-6xl">
                  Convierte tu pasión en ingresos
                </h1>
                <p className="mb-8 text-lg text-text-secondary text-pretty">
                  Únete a cientos de cuidadores que generan ingresos flexibles ayudando a familias chilenas. Tú decides
                  cuándo, dónde y a quién cuidar.
                </p>
                <div className="flex flex-col gap-4 sm:flex-row">
                  <Button size="lg" className="bg-primary hover:bg-primary-hover" asChild>
                    <Link href="/registro?tipo=cuidador">
                      Comenzar Ahora
                      <ArrowRight className="ml-2 h-5 w-5" />
                    </Link>
                  </Button>
                  <Button size="lg" variant="outline">
                    Ver Requisitos
                  </Button>
                </div>
              </div>

              <div className="relative">
                <div className="grid grid-cols-2 gap-4">
                  <Card className="border-2 border-primary/20">
                    <CardContent className="p-6 text-center">
                      <DollarSign className="mx-auto mb-2 h-8 w-8 text-primary" />
                      <div className="text-2xl font-bold text-text">$8.000-$15.000</div>
                      <div className="text-sm text-text-secondary">por hora promedio</div>
                    </CardContent>
                  </Card>
                  <Card className="border-2 border-accent-pets/20">
                    <CardContent className="p-6 text-center">
                      <Users className="mx-auto mb-2 h-8 w-8 text-accent-pets" />
                      <div className="text-2xl font-bold text-text">500+</div>
                      <div className="text-sm text-text-secondary">cuidadores activos</div>
                    </CardContent>
                  </Card>
                  <Card className="border-2 border-accent-children/20">
                    <CardContent className="p-6 text-center">
                      <Star className="mx-auto mb-2 h-8 w-8 text-secondary" fill="currentColor" />
                      <div className="text-2xl font-bold text-text">4.8/5</div>
                      <div className="text-sm text-text-secondary">calificación promedio</div>
                    </CardContent>
                  </Card>
                  <Card className="border-2 border-accent-elderly/20">
                    <CardContent className="p-6 text-center">
                      <Calendar className="mx-auto mb-2 h-8 w-8 text-accent-elderly" />
                      <div className="text-2xl font-bold text-text">100%</div>
                      <div className="text-sm text-text-secondary">horario flexible</div>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="mb-12 text-center">
            <h2 className="mb-4 text-3xl font-bold text-text md:text-4xl">¿Por qué ser cuidador en YoTeCuido.cl?</h2>
            <p className="text-lg text-text-secondary">Beneficios que marcan la diferencia</p>
          </div>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            <Card className="border-2 hover:border-primary/50 transition-colors">
              <CardContent className="p-6">
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
                  <Calendar className="h-6 w-6 text-primary" />
                </div>
                <h3 className="mb-2 text-xl font-bold text-text">Horario Flexible</h3>
                <p className="text-text-secondary">
                  Tú decides cuándo trabajar. Acepta solo los servicios que se ajusten a tu disponibilidad y estilo de
                  vida.
                </p>
              </CardContent>
            </Card>

            <Card className="border-2 hover:border-primary/50 transition-colors">
              <CardContent className="p-6">
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-accent-pets/10">
                  <DollarSign className="h-6 w-6 text-accent-pets" />
                </div>
                <h3 className="mb-2 text-xl font-bold text-text">Ingresos Competitivos</h3>
                <p className="text-text-secondary">
                  Define tus propias tarifas y recibe pagos seguros. Gana entre $8.000 y $15.000 por hora según tu
                  experiencia.
                </p>
              </CardContent>
            </Card>

            <Card className="border-2 hover:border-primary/50 transition-colors">
              <CardContent className="p-6">
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-accent-children/10">
                  <Shield className="h-6 w-6 text-accent-children" />
                </div>
                <h3 className="mb-2 text-xl font-bold text-text">Seguro Incluido</h3>
                <p className="text-text-secondary">
                  Todos los servicios incluyen seguro de responsabilidad civil. Trabaja con tranquilidad y protección.
                </p>
              </CardContent>
            </Card>

            <Card className="border-2 hover:border-primary/50 transition-colors">
              <CardContent className="p-6">
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-accent-elderly/10">
                  <Users className="h-6 w-6 text-accent-elderly" />
                </div>
                <h3 className="mb-2 text-xl font-bold text-text">Comunidad de Apoyo</h3>
                <p className="text-text-secondary">
                  Accede a capacitaciones gratuitas, recursos educativos y una red de cuidadores profesionales.
                </p>
              </CardContent>
            </Card>

            <Card className="border-2 hover:border-primary/50 transition-colors">
              <CardContent className="p-6">
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-secondary/10">
                  <Smartphone className="h-6 w-6 text-secondary" />
                </div>
                <h3 className="mb-2 text-xl font-bold text-text">Plataforma Fácil</h3>
                <p className="text-text-secondary">
                  Gestiona reservas, pagos y comunicación con familias desde tu celular. Todo en un solo lugar.
                </p>
              </CardContent>
            </Card>

            <Card className="border-2 hover:border-primary/50 transition-colors">
              <CardContent className="p-6">
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
                  <TrendingUp className="h-6 w-6 text-primary" />
                </div>
                <h3 className="mb-2 text-xl font-bold text-text">Crece Profesionalmente</h3>
                <p className="text-text-secondary">
                  Construye tu reputación con reseñas positivas y accede a más oportunidades de trabajo.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="bg-surface-secondary py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="mb-12 text-center">
            <h2 className="mb-4 text-3xl font-bold text-text md:text-4xl">Cómo Empezar</h2>
            <p className="text-lg text-text-secondary">4 simples pasos para comenzar a ganar</p>
          </div>

          <div className="mx-auto max-w-4xl">
            <div className="space-y-8">
              <div className="flex gap-6">
                <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-primary text-xl font-bold text-white">
                  1
                </div>
                <div>
                  <h3 className="mb-2 text-xl font-bold text-text">Crea tu Perfil</h3>
                  <p className="text-text-secondary">
                    Regístrate gratis y completa tu perfil con tu experiencia, disponibilidad y servicios que ofreces.
                    Agrega fotos y describe por qué eres el cuidador ideal.
                  </p>
                </div>
              </div>

              <div className="flex gap-6">
                <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-primary text-xl font-bold text-white">
                  2
                </div>
                <div>
                  <h3 className="mb-2 text-xl font-bold text-text">Verifica tu Identidad</h3>
                  <p className="text-text-secondary">
                    Completa el proceso de verificación con certificado de antecedentes e inhabilidades. Te guiamos en
                    cada paso y el proceso toma solo 2-3 días hábiles.
                  </p>
                </div>
              </div>

              <div className="flex gap-6">
                <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-primary text-xl font-bold text-white">
                  3
                </div>
                <div>
                  <h3 className="mb-2 text-xl font-bold text-text">Define tus Tarifas</h3>
                  <p className="text-text-secondary">
                    Establece tus precios por hora según tu experiencia y servicios. Puedes ajustarlos en cualquier
                    momento según la demanda.
                  </p>
                </div>
              </div>

              <div className="flex gap-6">
                <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-primary text-xl font-bold text-white">
                  4
                </div>
                <div>
                  <h3 className="mb-2 text-xl font-bold text-text">Comienza a Trabajar</h3>
                  <p className="text-text-secondary">
                    Recibe solicitudes de familias, acepta las que te interesen y comienza a generar ingresos. Recibe
                    pagos seguros después de cada servicio.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Requirements */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-4xl">
            <div className="mb-12 text-center">
              <h2 className="mb-4 text-3xl font-bold text-text md:text-4xl">Requisitos</h2>
              <p className="text-lg text-text-secondary">Lo que necesitas para ser parte de nuestra comunidad</p>
            </div>

            <div className="grid gap-8 md:grid-cols-2">
              <div>
                <h3 className="mb-4 text-xl font-bold text-text">Requisitos Generales</h3>
                <ul className="space-y-3">
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="mt-0.5 h-5 w-5 flex-shrink-0 text-primary" />
                    <span className="text-text-secondary">Mayor de 18 años</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="mt-0.5 h-5 w-5 flex-shrink-0 text-primary" />
                    <span className="text-text-secondary">Cédula de identidad chilena vigente</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="mt-0.5 h-5 w-5 flex-shrink-0 text-primary" />
                    <span className="text-text-secondary">Certificado de antecedentes</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="mt-0.5 h-5 w-5 flex-shrink-0 text-primary" />
                    <span className="text-text-secondary">Certificado de inhabilidades para trabajar con menores</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="mt-0.5 h-5 w-5 flex-shrink-0 text-primary" />
                    <span className="text-text-secondary">Smartphone con acceso a internet</span>
                  </li>
                </ul>
              </div>

              <div>
                <h3 className="mb-4 text-xl font-bold text-text">Requisitos Específicos</h3>
                <div className="space-y-4">
                  <div>
                    <h4 className="mb-2 font-semibold text-text">Cuidado de Niños</h4>
                    <ul className="space-y-2 text-sm text-text-secondary">
                      <li className="flex items-start gap-2">
                        <span className="text-accent-children">•</span>
                        <span>Experiencia demostrable (mínimo 1 año)</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-accent-children">•</span>
                        <span>Curso de primeros auxilios pediátricos (recomendado)</span>
                      </li>
                    </ul>
                  </div>

                  <div>
                    <h4 className="mb-2 font-semibold text-text">Cuidado de Mascotas</h4>
                    <ul className="space-y-2 text-sm text-text-secondary">
                      <li className="flex items-start gap-2">
                        <span className="text-accent-pets">•</span>
                        <span>Experiencia con animales</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-accent-pets">•</span>
                        <span>Espacio adecuado si ofreces hospedaje</span>
                      </li>
                    </ul>
                  </div>

                  <div>
                    <h4 className="mb-2 font-semibold text-text">Cuidado de Adultos Mayores</h4>
                    <ul className="space-y-2 text-sm text-text-secondary">
                      <li className="flex items-start gap-2">
                        <span className="text-accent-elderly">•</span>
                        <span>Experiencia en cuidado de personas mayores</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-accent-elderly">•</span>
                        <span>Certificado de salud compatible</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Earnings */}
      <section className="bg-gradient-to-br from-primary/5 to-accent-pets/5 py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-4xl text-center">
            <h2 className="mb-4 text-3xl font-bold text-text md:text-4xl">Potencial de Ingresos</h2>
            <p className="mb-12 text-lg text-text-secondary">
              Tus ganancias dependen de tu experiencia, servicios y disponibilidad
            </p>

            <div className="grid gap-6 md:grid-cols-3">
              <Card className="border-2">
                <CardContent className="p-6">
                  <Badge className="mb-4 bg-surface-secondary text-text-secondary">Principiante</Badge>
                  <div className="mb-2 text-3xl font-bold text-text">$8.000 - $10.000</div>
                  <div className="mb-4 text-sm text-text-secondary">por hora</div>
                  <ul className="space-y-2 text-left text-sm text-text-secondary">
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="mt-0.5 h-4 w-4 flex-shrink-0 text-primary" />
                      <span>Sin experiencia previa</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="mt-0.5 h-4 w-4 flex-shrink-0 text-primary" />
                      <span>Servicios básicos</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="mt-0.5 h-4 w-4 flex-shrink-0 text-primary" />
                      <span>Horarios flexibles</span>
                    </li>
                  </ul>
                </CardContent>
              </Card>

              <Card className="border-2 border-primary shadow-lg">
                <CardContent className="p-6">
                  <Badge className="mb-4 bg-primary text-white">Intermedio</Badge>
                  <div className="mb-2 text-3xl font-bold text-text">$10.000 - $13.000</div>
                  <div className="mb-4 text-sm text-text-secondary">por hora</div>
                  <ul className="space-y-2 text-left text-sm text-text-secondary">
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="mt-0.5 h-4 w-4 flex-shrink-0 text-primary" />
                      <span>1-3 años de experiencia</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="mt-0.5 h-4 w-4 flex-shrink-0 text-primary" />
                      <span>Certificaciones básicas</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="mt-0.5 h-4 w-4 flex-shrink-0 text-primary" />
                      <span>Buenas reseñas</span>
                    </li>
                  </ul>
                </CardContent>
              </Card>

              <Card className="border-2">
                <CardContent className="p-6">
                  <Badge className="mb-4 bg-secondary text-text">Experto</Badge>
                  <div className="mb-2 text-3xl font-bold text-text">$13.000 - $15.000+</div>
                  <div className="mb-4 text-sm text-text-secondary">por hora</div>
                  <ul className="space-y-2 text-left text-sm text-text-secondary">
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="mt-0.5 h-4 w-4 flex-shrink-0 text-primary" />
                      <span>+3 años de experiencia</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="mt-0.5 h-4 w-4 flex-shrink-0 text-primary" />
                      <span>Certificaciones avanzadas</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="mt-0.5 h-4 w-4 flex-shrink-0 text-primary" />
                      <span>Excelente reputación</span>
                    </li>
                  </ul>
                </CardContent>
              </Card>
            </div>

            <div className="mt-8 rounded-lg bg-white p-6 text-left">
              <h3 className="mb-4 font-bold text-text">Ejemplo de Ingresos Mensuales</h3>
              <div className="grid gap-4 md:grid-cols-2">
                <div className="flex items-center justify-between rounded-lg bg-surface-secondary p-4">
                  <div>
                    <div className="text-sm text-text-secondary">20 horas/semana a $12.000/hora</div>
                    <div className="text-2xl font-bold text-text">$960.000/mes</div>
                  </div>
                  <Clock className="h-8 w-8 text-primary" />
                </div>
                <div className="flex items-center justify-between rounded-lg bg-surface-secondary p-4">
                  <div>
                    <div className="text-sm text-text-secondary">40 horas/semana a $12.000/hora</div>
                    <div className="text-2xl font-bold text-text">$1.920.000/mes</div>
                  </div>
                  <Briefcase className="h-8 w-8 text-accent-pets" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="mb-12 text-center">
            <h2 className="mb-4 text-3xl font-bold text-text md:text-4xl">Lo que dicen nuestros cuidadores</h2>
            <p className="text-lg text-text-secondary">Historias reales de nuestra comunidad</p>
          </div>

          <div className="grid gap-6 md:grid-cols-3">
            <Card>
              <CardContent className="p-6">
                <div className="mb-4 flex items-center gap-1">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="h-4 w-4 text-secondary" fill="currentColor" />
                  ))}
                </div>
                <p className="mb-4 text-text-secondary">
                  "YoTeCuido.cl me permitió trabajar mientras estudio. Puedo elegir mis horarios y las familias son
                  increíbles. Ya llevo 6 meses y he generado más de $3 millones."
                </p>
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-accent-children/20 text-lg">
                    👩
                  </div>
                  <div>
                    <div className="font-semibold text-text">María José</div>
                    <div className="text-sm text-text-secondary">Cuidadora de Niños, Santiago</div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="mb-4 flex items-center gap-1">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="h-4 w-4 text-secondary" fill="currentColor" />
                  ))}
                </div>
                <p className="mb-4 text-text-secondary">
                  "Como veterinario jubilado, encontré en YoTeCuido la forma perfecta de seguir trabajando con animales.
                  La plataforma es muy fácil de usar y el soporte es excelente."
                </p>
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-accent-pets/20 text-lg">
                    👨
                  </div>
                  <div>
                    <div className="font-semibold text-text">Carlos Muñoz</div>
                    <div className="text-sm text-text-secondary">Cuidador de Mascotas, Viña del Mar</div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="mb-4 flex items-center gap-1">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="h-4 w-4 text-secondary" fill="currentColor" />
                  ))}
                </div>
                <p className="mb-4 text-text-secondary">
                  "Después de 20 años como enfermera, decidí dedicarme al cuidado de adultos mayores de forma
                  independiente. YoTeCuido me conectó con familias maravillosas."
                </p>
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-accent-elderly/20 text-lg">
                    👩
                  </div>
                  <div>
                    <div className="font-semibold text-text">Patricia Silva</div>
                    <div className="text-sm text-text-secondary">Cuidadora de Adultos Mayores, Concepción</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-primary py-16 text-white md:py-24">
        <div className="container mx-auto px-4 text-center">
          <Award className="mx-auto mb-6 h-16 w-16" />
          <h2 className="mb-4 text-3xl font-bold text-balance md:text-4xl">
            ¿Listo para comenzar tu carrera como cuidador?
          </h2>
          <p className="mb-8 text-lg text-blue-100">
            Únete hoy y comienza a generar ingresos ayudando a familias chilenas
          </p>
          <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Button size="lg" variant="secondary" className="bg-white text-primary hover:bg-gray-100" asChild>
              <Link href="/registro?tipo=cuidador">
                Registrarse Gratis
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="border-white text-white hover:bg-white/10 bg-transparent"
              asChild
            >
              <Link href="/ayuda">¿Tienes Preguntas?</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border bg-surface py-12">
        <div className="container mx-auto px-4">
          <div className="grid gap-8 md:grid-cols-4">
            <div>
              <div className="mb-4 flex items-center gap-2">
                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary">
                  <Heart className="h-4 w-4 text-white" fill="white" />
                </div>
                <span className="font-bold text-text">YoTeCuido.cl</span>
              </div>
              <p className="text-sm text-text-secondary">Cuidamos lo que más quieres</p>
            </div>

            <div>
              <h4 className="mb-4 font-semibold text-text">Servicios</h4>
              <ul className="space-y-2 text-sm text-text-secondary">
                <li>
                  <Link href="/buscar?categoria=ninos" className="hover:text-text">
                    Cuidado de Niños
                  </Link>
                </li>
                <li>
                  <Link href="/buscar?categoria=mascotas" className="hover:text-text">
                    Cuidado de Mascotas
                  </Link>
                </li>
                <li>
                  <Link href="/buscar?categoria=mayores" className="hover:text-text">
                    Cuidado de Mayores
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="mb-4 font-semibold text-text">Empresa</h4>
              <ul className="space-y-2 text-sm text-text-secondary">
                <li>
                  <Link href="/como-funciona" className="hover:text-text">
                    Cómo Funciona
                  </Link>
                </li>
                <li>
                  <Link href="/ser-cuidador" className="hover:text-text">
                    Ser Cuidador
                  </Link>
                </li>
                <li>
                  <Link href="/seguridad" className="hover:text-text">
                    Seguridad
                  </Link>
                </li>
                <li>
                  <Link href="/ayuda" className="hover:text-text">
                    Centro de Ayuda
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="mb-4 font-semibold text-text">Legal</h4>
              <ul className="space-y-2 text-sm text-text-secondary">
                <li>
                  <Link href="/terminos" className="hover:text-text">
                    Términos y Condiciones
                  </Link>
                </li>
                <li>
                  <Link href="/privacidad" className="hover:text-text">
                    Política de Privacidad
                  </Link>
                </li>
                <li>
                  <Link href="/contacto" className="hover:text-text">
                    Contacto
                  </Link>
                </li>
              </ul>
            </div>
          </div>

          <div className="mt-8 border-t border-border pt-8 text-center text-sm text-text-secondary">
            <p>© 2025 YoTeCuido.cl - Todos los derechos reservados</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
