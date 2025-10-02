"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { Heart, Mail, ArrowRight, ArrowLeft, CheckCircle2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

export default function RecuperarContrasenaPage() {
  const [email, setEmail] = useState("")
  const [isSubmitted, setIsSubmitted] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Handle password recovery logic here
    console.log("Password recovery for:", email)
    setIsSubmitted(true)
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

          <div className="flex items-center gap-3">
            <Button variant="outline" size="sm" asChild>
              <Link href="/login">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Volver al inicio de sesión
              </Link>
            </Button>
          </div>
        </div>
      </header>

      <div className="container mx-auto flex min-h-[calc(100vh-4rem)] items-center justify-center px-4 py-12">
        <div className="w-full max-w-md">
          <Card>
            <CardHeader className="space-y-1 text-center">
              <CardTitle className="text-2xl font-bold">
                {isSubmitted ? "Revisa tu correo" : "Recuperar contraseña"}
              </CardTitle>
              <CardDescription>
                {isSubmitted
                  ? "Te hemos enviado instrucciones para restablecer tu contraseña"
                  : "Ingresa tu correo electrónico y te enviaremos un enlace para restablecer tu contraseña"}
              </CardDescription>
            </CardHeader>
            <CardContent>
              {!isSubmitted ? (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="email">Correo electrónico</Label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-text-secondary" />
                      <Input
                        id="email"
                        type="email"
                        placeholder="tu@email.com"
                        className="pl-10"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                      />
                    </div>
                  </div>

                  <Button type="submit" className="w-full bg-primary hover:bg-primary-hover" size="lg">
                    Enviar enlace de recuperación
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Button>

                  <div className="rounded-lg bg-blue-50 p-4">
                    <p className="text-sm text-text-secondary">
                      El enlace de recuperación expirará en 1 hora por seguridad. Si no recibes el correo, revisa tu
                      carpeta de spam.
                    </p>
                  </div>
                </form>
              ) : (
                <div className="space-y-6">
                  <div className="flex flex-col items-center justify-center space-y-4 py-6">
                    <div className="flex h-16 w-16 items-center justify-center rounded-full bg-green-100">
                      <CheckCircle2 className="h-8 w-8 text-green-600" />
                    </div>
                    <div className="text-center">
                      <p className="text-sm text-text-secondary">
                        Hemos enviado un correo a <strong className="text-text">{email}</strong> con instrucciones para
                        restablecer tu contraseña.
                      </p>
                    </div>
                  </div>

                  <div className="space-y-3">
                    <Button asChild className="w-full bg-transparent" variant="outline">
                      <Link href="/login">Volver al inicio de sesión</Link>
                    </Button>

                    <button
                      onClick={() => setIsSubmitted(false)}
                      className="w-full text-center text-sm text-primary hover:underline"
                    >
                      ¿No recibiste el correo? Reenviar
                    </button>
                  </div>
                </div>
              )}

              <div className="mt-6 space-y-4">
                <div className="relative">
                  <div className="absolute inset-0 flex items-center">
                    <span className="w-full border-t border-border" />
                  </div>
                  <div className="relative flex justify-center text-xs uppercase">
                    <span className="bg-surface px-2 text-text-secondary">¿Necesitas ayuda?</span>
                  </div>
                </div>

                <div className="rounded-lg border border-border bg-surface-secondary p-4">
                  <h4 className="mb-2 font-semibold text-sm">Consejos de seguridad:</h4>
                  <ul className="space-y-1 text-sm text-text-secondary">
                    <li>• Nunca compartas tu contraseña con nadie</li>
                    <li>• Usa una contraseña única y segura</li>
                    <li>• Verifica que el enlace sea de yotecuido.cl</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>

          <p className="mt-6 text-center text-sm text-text-secondary">
            ¿Recordaste tu contraseña?{" "}
            <Link href="/login" className="font-medium text-primary hover:underline">
              Inicia sesión
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}
