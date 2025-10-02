import Link from "next/link"
import { Heart, User, Lock, ArrowRight, Shield, Star, Calendar } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

export default function DemoPage() {
  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b bg-secondary">
        <div className="container mx-auto flex h-16 items-center justify-between px-4">
          <Link href="/" className="flex items-center gap-2">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary">
              <Heart className="h-5 w-5 text-white" fill="white" />
            </div>
            <span className="text-xl font-bold text-foreground">YoTeCuido.cl</span>
          </Link>
        </div>
      </header>

      <div className="container mx-auto px-4 py-12">
        <div className="mx-auto max-w-4xl">
          {/* Hero */}
          <div className="mb-12 text-center">
            <Badge className="mb-4 bg-primary text-white">Modo Demo</Badge>
            <h1 className="mb-4 text-4xl font-bold text-foreground">Credenciales de Prueba</h1>
            <p className="text-lg text-muted-foreground">
              Usa estas credenciales para explorar la plataforma YoTeCuido.cl
            </p>
          </div>

          {/* Demo Accounts */}
          <div className="mb-12 grid gap-6 md:grid-cols-2">
            {/* Client Account */}
            <Card className="border-2 border-primary">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <User className="h-5 w-5 text-primary" />
                  Cuenta de Cliente
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="rounded-lg bg-secondary-secondary p-4">
                  <div className="mb-3 flex items-center gap-2 text-sm font-medium text-muted-foreground">
                    <User className="h-4 w-4" />
                    Usuario
                  </div>
                  <code className="block rounded bg-secondary p-2 font-mono text-sm text-foreground">
                    carolina.perez@email.com
                  </code>
                </div>

                <div className="rounded-lg bg-secondary-secondary p-4">
                  <div className="mb-3 flex items-center gap-2 text-sm font-medium text-muted-foreground">
                    <Lock className="h-4 w-4" />
                    Contraseña
                  </div>
                  <code className="block rounded bg-secondary p-2 font-mono text-sm text-foreground">demo123</code>
                </div>

                <div className="space-y-2 border-t pt-4">
                  <h4 className="font-semibold text-foreground">Funcionalidades disponibles:</h4>
                  <ul className="space-y-1 text-sm text-muted-foreground">
                    <li className="flex items-start gap-2">
                      <ArrowRight className="mt-0.5 h-4 w-4 flex-shrink-0 text-primary" />
                      <span>Buscar y filtrar cuidadores</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <ArrowRight className="mt-0.5 h-4 w-4 flex-shrink-0 text-primary" />
                      <span>Ver perfiles detallados</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <ArrowRight className="mt-0.5 h-4 w-4 flex-shrink-0 text-primary" />
                      <span>Hacer reservas</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <ArrowRight className="mt-0.5 h-4 w-4 flex-shrink-0 text-primary" />
                      <span>Enviar mensajes</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <ArrowRight className="mt-0.5 h-4 w-4 flex-shrink-0 text-primary" />
                      <span>Gestionar favoritos</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <ArrowRight className="mt-0.5 h-4 w-4 flex-shrink-0 text-primary" />
                      <span>Ver historial de reservas</span>
                    </li>
                  </ul>
                </div>

                <Button className="w-full bg-primary hover:bg-primary-hover" asChild>
                  <Link href="/login">
                    Iniciar Sesión como Cliente
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </CardContent>
            </Card>

            {/* Caregiver Account */}
            <Card className="border-2 border-accent-pets">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Shield className="h-5 w-5 text-green-500" />
                  Cuenta de Cuidador
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="rounded-lg bg-secondary-secondary p-4">
                  <div className="mb-3 flex items-center gap-2 text-sm font-medium text-muted-foreground">
                    <User className="h-4 w-4" />
                    Usuario
                  </div>
                  <code className="block rounded bg-secondary p-2 font-mono text-sm text-foreground">
                    maria.gonzalez@email.com
                  </code>
                </div>

                <div className="rounded-lg bg-secondary-secondary p-4">
                  <div className="mb-3 flex items-center gap-2 text-sm font-medium text-muted-foreground">
                    <Lock className="h-4 w-4" />
                    Contraseña
                  </div>
                  <code className="block rounded bg-secondary p-2 font-mono text-sm text-foreground">demo123</code>
                </div>

                <div className="space-y-2 border-t pt-4">
                  <h4 className="font-semibold text-foreground">Funcionalidades disponibles:</h4>
                  <ul className="space-y-1 text-sm text-muted-foreground">
                    <li className="flex items-start gap-2">
                      <ArrowRight className="mt-0.5 h-4 w-4 flex-shrink-0 text-green-500" />
                      <span>Gestionar perfil profesional</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <ArrowRight className="mt-0.5 h-4 w-4 flex-shrink-0 text-green-500" />
                      <span>Ver solicitudes de reserva</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <ArrowRight className="mt-0.5 h-4 w-4 flex-shrink-0 text-green-500" />
                      <span>Aceptar/rechazar servicios</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <ArrowRight className="mt-0.5 h-4 w-4 flex-shrink-0 text-green-500" />
                      <span>Comunicarse con clientes</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <ArrowRight className="mt-0.5 h-4 w-4 flex-shrink-0 text-green-500" />
                      <span>Actualizar disponibilidad</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <ArrowRight className="mt-0.5 h-4 w-4 flex-shrink-0 text-green-500" />
                      <span>Ver historial de ingresos</span>
                    </li>
                  </ul>
                </div>

                <Button className="w-full bg-accent-pets hover:bg-accent-pets/90 text-white" asChild>
                  <Link href="/login">
                    Iniciar Sesión como Cuidador
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </CardContent>
            </Card>
          </div>

          {/* Dual Role Account */}
          <Card className="mb-12 border-2 border-secondary">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Star className="h-5 w-5 text-green-500" />
                Cuenta Dual (Cliente + Cuidador)
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-sm text-muted-foreground">
                Esta cuenta tiene acceso tanto a funcionalidades de cliente como de cuidador, permitiendo cambiar entre
                roles según sea necesario.
              </p>

              <div className="grid gap-4 md:grid-cols-2">
                <div className="rounded-lg bg-secondary-secondary p-4">
                  <div className="mb-3 flex items-center gap-2 text-sm font-medium text-muted-foreground">
                    <User className="h-4 w-4" />
                    Usuario
                  </div>
                  <code className="block rounded bg-secondary p-2 font-mono text-sm text-foreground">
                    usuario.dual@email.com
                  </code>
                </div>

                <div className="rounded-lg bg-secondary-secondary p-4">
                  <div className="mb-3 flex items-center gap-2 text-sm font-medium text-muted-foreground">
                    <Lock className="h-4 w-4" />
                    Contraseña
                  </div>
                  <code className="block rounded bg-secondary p-2 font-mono text-sm text-foreground">demo123</code>
                </div>
              </div>

              <Button className="w-full bg-secondary hover:bg-secondary/90 text-white" asChild>
                <Link href="/login">
                  Iniciar Sesión con Cuenta Dual
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </CardContent>
          </Card>

          {/* Quick Links */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Calendar className="h-5 w-5" />
                Enlaces Rápidos
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid gap-3 md:grid-cols-2">
                <Button variant="outline" className="justify-start bg-transparent" asChild>
                  <Link href="/buscar">
                    <ArrowRight className="mr-2 h-4 w-4" />
                    Explorar Cuidadores
                  </Link>
                </Button>
                <Button variant="outline" className="justify-start bg-transparent" asChild>
                  <Link href="/ser-cuidador">
                    <ArrowRight className="mr-2 h-4 w-4" />
                    Ser Cuidador
                  </Link>
                </Button>
                <Button variant="outline" className="justify-start bg-transparent" asChild>
                  <Link href="/dashboard">
                    <ArrowRight className="mr-2 h-4 w-4" />
                    Dashboard
                  </Link>
                </Button>
                <Button variant="outline" className="justify-start bg-transparent" asChild>
                  <Link href="/mensajes">
                    <ArrowRight className="mr-2 h-4 w-4" />
                    Mensajes
                  </Link>
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Note */}
          <div className="mt-8 rounded-lg border border-border bg-blue-50 p-6 text-center">
            <Shield className="mx-auto mb-3 h-8 w-8 text-primary" />
            <h3 className="mb-2 font-semibold text-foreground">Nota Importante</h3>
            <p className="text-sm text-muted-foreground">
              Esta es una plataforma de demostración. Todos los datos, perfiles y transacciones son ficticios y solo
              para propósitos de prueba.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
