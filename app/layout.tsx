import type React from "react"
import type { Metadata } from "next"
import { Inter, Outfit } from "next/font/google"
import { Analytics } from "@vercel/analytics/next"
import { Suspense } from "react"
import { AuthProvider } from "@/lib/auth-context"
import "./globals.css"

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
})

const outfit = Outfit({
  subsets: ["latin"],
  variable: "--font-heading",
  display: "swap",
})

export const metadata: Metadata = {
  title: "YoTeCuido.cl - Encuentra Cuidadores Verificados",
  description:
    "Plataforma chilena para conectar familias con cuidadores verificados de niños, mascotas y adultos mayores",
  generator: "v0.app",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="es">
      <body className={`font-sans antialiased ${inter.variable} ${outfit.variable}`}>
        <AuthProvider>
          <Suspense fallback={null}>
            {children}
            <Analytics />
          </Suspense>
        </AuthProvider>
      </body>
    </html>
  )
}
