"use client"

import { useState } from "react"
import Navbar from "@/components/navbar"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ScrollArea } from "@/components/ui/scroll-area"
import { MessageSquare, Send, Bot, Sun, Cloud, Droplet, Wind } from "lucide-react"

interface Message {
  id: number
  type: "user" | "assistant"
  content: string
  timestamp: string
}

export default function AssistantPage() {
  const [input, setInput] = useState("")
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      type: "assistant",
      content: "Hello! I'm your farming assistant. How can I help you today?",
      timestamp: new Date().toLocaleTimeString(),
    },
  ])

  const weatherData = {
    temperature: "24°C",
    humidity: "65%",
    wind: "12 km/h",
    forecast: "Sunny",
  }

  const handleSend = () => {
    if (!input.trim()) return

    const newMessage: Message = {
      id: messages.length + 1,
      type: "user",
      content: input,
      timestamp: new Date().toLocaleTimeString(),
    }

    setMessages([...messages, newMessage])
    setInput("")

    // Simulate AI response
    setTimeout(() => {
      const response: Message = {
        id: messages.length + 2,
        type: "assistant",
        content: "I understand your question. Let me help you with that...",
        timestamp: new Date().toLocaleTimeString(),
      }
      setMessages((prev) => [...prev, response])
    }, 1000)
  }

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <main className="container mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold">AI Farming Assistant</h1>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Weather Card */}
          <Card className="p-4 lg:col-span-1">
            <h2 className="font-semibold mb-4">Current Weather</h2>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <Sun className="h-5 w-5 mr-2" />
               <span>Temperature</span>
                </div>
                <span>{weatherData.temperature}</span>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <Droplet className="h-5 w-5 mr-2" />
                  <span>Humidity</span>
                </div>
                <span>{weatherData.humidity}</span>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <Wind className="h-5 w-5 mr-2" />
                  <span>Wind Speed</span>
                </div>
                <span>{weatherData.wind}</span>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <Cloud className="h-5 w-5 mr-2" />
                  <span>Forecast</span>
                </div>
                <span>{weatherData.forecast}</span>
              </div>
            </div>
          </Card>

          {/* Chat Interface */}
          <Card className="lg:col-span-3 flex flex-col h-[600px]">
            <div className="p-4 border-b">
              <div className="flex items-center space-x-2">
                <Bot className="h-6 w-6" />
                <div>
                  <h3 className="font-semibold">Farming Assistant</h3>
                  <p className="text-sm text-muted-foreground">Always here to help</p>
                </div>
              </div>
            </div>

            <ScrollArea className="flex-1 p-4">
              <div className="space-y-4">
                {messages.map((message) => (
                  <div
                    key={message.id}
                    className={`flex ${
                      message.type === "user" ? "justify-end" : "justify-start"
                    }`}
                  >
                    <div
                      className={`max-w-[80%] rounded-lg p-3 ${
                        message.type === "user"
                          ? "bg-primary text-primary-foreground"
                          : "bg-muted"
                      }`}
                    >
                      <p>{message.content}</p>
                      <span className="text-xs opacity-70 mt-1 block">
                        {message.timestamp}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </ScrollArea>

            <div className="p-4 border-t">
              <div className="flex space-x-2">
                <Input
                  placeholder="Type your message..."
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyPress={(e) => e.key === "Enter" && handleSend()}
                />
                <Button onClick={handleSend}>
                  <Send className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </Card>
        </div>
      </main>
    </div>
  )
}