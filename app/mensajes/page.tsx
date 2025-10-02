"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { ArrowLeft, Send, Paperclip, Heart, Search, MoreVertical } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"

// Mock conversations
const conversations = [
  {
    id: 1,
    user: {
      name: "María González",
      avatar: "/woman-caregiver.png",
      type: "Cuidadora",
    },
    lastMessage: "Perfecto, nos vemos el viernes a las 15:00. ¡Gracias!",
    timestamp: "Hace 2 horas",
    unread: false,
  },
  {
    id: 2,
    user: {
      name: "Carlos Muñoz",
      avatar: "/man-dog-walker.jpg",
      type: "Paseador",
    },
    lastMessage: "¿Tu perro tiene alguna restricción alimentaria?",
    timestamp: "Hace 5 horas",
    unread: true,
  },
  {
    id: 3,
    user: {
      name: "Patricia Silva",
      avatar: "/elderly-caregiver.jpg",
      type: "Cuidadora",
    },
    lastMessage: "Muchas gracias por la excelente reseña 😊",
    timestamp: "Ayer",
    unread: false,
  },
]

// Mock messages for selected conversation
const mockMessages = [
  {
    id: 1,
    sender: "them",
    text: "Hola! Vi tu solicitud para cuidado de niños. ¿Podrías darme más detalles?",
    timestamp: "10:30",
  },
  {
    id: 2,
    sender: "me",
    text: "Hola María! Claro, necesito cuidado para mi hija de 4 años el viernes de 15:00 a 19:00.",
    timestamp: "10:35",
  },
  {
    id: 3,
    sender: "them",
    text: "Perfecto! Tengo disponibilidad ese día. ¿Hay algo específico que deba saber sobre tu hija?",
    timestamp: "10:37",
  },
  {
    id: 4,
    sender: "me",
    text: "Sí, le encanta dibujar y jugar con bloques. También tiene alergia al maní, así que por favor no traer snacks con frutos secos.",
    timestamp: "10:40",
  },
  {
    id: 5,
    sender: "them",
    text: "Entendido, tomaré nota de la alergia. Me encanta hacer actividades creativas con los niños, así que llevaré algunos materiales de arte. ¿La dirección es en Providencia?",
    timestamp: "10:42",
  },
  {
    id: 6,
    sender: "me",
    text: "Sí, exacto. Te enviaré la dirección exacta una vez confirmemos la reserva.",
    timestamp: "10:45",
  },
  {
    id: 7,
    sender: "them",
    text: "Perfecto, nos vemos el viernes a las 15:00. ¡Gracias!",
    timestamp: "10:47",
  },
]

export default function MessagesPage() {
  const [selectedConversation, setSelectedConversation] = useState(conversations[0])
  const [messageText, setMessageText] = useState("")

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault()
    if (!messageText.trim()) return
    // In a real app, this would send the message
    setMessageText("")
  }

  return (
    <div className="flex h-screen flex-col bg-background">
      {/* Header */}
      <header className="border-b bg-secondary">
        <div className="container mx-auto flex h-16 items-center justify-between px-4">
          <Link href="/" className="flex items-center gap-2">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary">
              <Heart className="h-5 w-5 text-white" fill="white" />
            </div>
            <span className="text-xl font-bold text-foreground">YoTeCuido.cl</span>
          </Link>

          <Button variant="ghost" size="sm" asChild>
            <Link href="/dashboard">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Volver al Dashboard
            </Link>
          </Button>
        </div>
      </header>

      <div className="flex flex-1 overflow-hidden">
        {/* Conversations List */}
        <div className="w-full border-r bg-secondary md:w-80 lg:w-96">
          <div className="border-b p-4">
            <h2 className="mb-3 text-xl font-bold text-foreground">Mensajes</h2>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input placeholder="Buscar conversaciones..." className="pl-9" />
            </div>
          </div>

          <div className="overflow-y-auto">
            {conversations.map((conversation) => (
              <button
                key={conversation.id}
                onClick={() => setSelectedConversation(conversation)}
                className={`w-full border-b p-4 text-left transition-colors hover:bg-secondary-secondary ${
                  selectedConversation.id === conversation.id ? "bg-secondary-secondary" : ""
                }`}
              >
                <div className="flex gap-3">
                  <Avatar className="h-12 w-12">
                    <AvatarImage src={conversation.user.avatar || "/placeholder.svg"} alt={conversation.user.name} />
                    <AvatarFallback>
                      {conversation.user.name
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1 overflow-hidden">
                    <div className="mb-1 flex items-center justify-between">
                      <h3 className="font-semibold text-foreground">{conversation.user.name}</h3>
                      <span className="text-xs text-muted-foreground">{conversation.timestamp}</span>
                    </div>
                    <Badge variant="secondary" className="mb-1 text-xs">
                      {conversation.user.type}
                    </Badge>
                    <p
                      className={`truncate text-sm ${
                        conversation.unread ? "font-medium text-foreground" : "text-muted-foreground"
                      }`}
                    >
                      {conversation.lastMessage}
                    </p>
                  </div>
                  {conversation.unread && (
                    <div className="flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-full bg-primary text-xs text-white">
                      1
                    </div>
                  )}
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Chat Area */}
        <div className="hidden flex-1 flex-col md:flex">
          {/* Chat Header */}
          <div className="flex items-center justify-between border-b bg-secondary p-4">
            <div className="flex items-center gap-3">
              <Avatar className="h-10 w-10">
                <AvatarImage
                  src={selectedConversation.user.avatar || "/placeholder.svg"}
                  alt={selectedConversation.user.name}
                />
                <AvatarFallback>
                  {selectedConversation.user.name
                    .split(" ")
                    .map((n) => n[0])
                    .join("")}
                </AvatarFallback>
              </Avatar>
              <div>
                <h3 className="font-semibold text-foreground">{selectedConversation.user.name}</h3>
                <p className="text-xs text-muted-foreground">{selectedConversation.user.type}</p>
              </div>
            </div>
            <Button variant="ghost" size="icon">
              <MoreVertical className="h-5 w-5" />
            </Button>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4">
            <div className="space-y-4">
              {mockMessages.map((message) => (
                <div key={message.id} className={`flex ${message.sender === "me" ? "justify-end" : "justify-start"}`}>
                  <div
                    className={`max-w-[70%] rounded-lg px-4 py-2 ${
                      message.sender === "me" ? "bg-primary text-white" : "bg-secondary-secondary text-foreground"
                    }`}
                  >
                    <p className="text-sm">{message.text}</p>
                    <span
                      className={`mt-1 block text-xs ${
                        message.sender === "me" ? "text-white/70" : "text-muted-foreground"
                      }`}
                    >
                      {message.timestamp}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Message Input */}
          <div className="border-t border-border bg-secondary p-4">
            <form onSubmit={handleSendMessage} className="flex gap-2">
              <Button type="button" variant="ghost" size="icon">
                <Paperclip className="h-5 w-5" />
              </Button>
              <Input
                placeholder="Escribe un mensaje..."
                value={messageText}
                onChange={(e) => setMessageText(e.target.value)}
                className="flex-1"
              />
              <Button type="submit" size="icon" className="bg-primary hover:bg-primary-hover">
                <Send className="h-5 w-5" />
              </Button>
            </form>
          </div>
        </div>

        {/* Mobile: Show message to select conversation */}
        <div className="flex flex-1 items-center justify-center md:hidden">
          <p className="text-muted-foreground">Selecciona una conversación para ver los mensajes</p>
        </div>
      </div>
    </div>
  )
}
