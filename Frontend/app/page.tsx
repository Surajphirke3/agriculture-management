import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import Navbar from "@/components/navbar"
import { Brain, Sprout, Truck, BarChart3, ShoppingCart, Recycle, MessageSquareMore, Wallet } from "lucide-react"

export default function Home() {
  const features = [
    {
      icon: Sprout,
      title: "Inventory Management",
      description: "Track stock levels, avoid wastage, and receive surplus alerts in real-time.",
    },
    {
      icon: Truck,
      title: "Supply Chain Optimization",
      description: "AI-powered route planning for efficient delivery and shipment tracking.",
    },
    {
      icon: BarChart3,
      title: "Predictive Analytics",
      description: "AI forecasts production, demand, and wastage trends to optimize farming.",
    },
    {
      icon: ShoppingCart,
      title: "Digital Marketplace",
      description: "Secure transactions, dynamic pricing, and multilingual negotiation.",
    },
    {
      icon: Recycle,
      title: "Waste Management",
      description: "Connect surplus food to food banks and track environmental impact.",
    },
    {
      icon: MessageSquareMore,
      title: "Farmer Support",
      description: "24/7 AI chatbot for guidance, weather alerts, and farming tutorials.",
    },
    {
      icon: Wallet,
      title: "Financial Services",
      description: "Access microloans, track earnings, and process secure payments.",
    },
    {
      icon: Brain,
      title: "Smart Analytics",
      description: "Data-driven insights through interactive dashboards and reports.",
    },
  ]

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      {/* Hero Section */}
      <section className="relative py-20 px-4 sm:px-6 lg:px-8">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1523348837708-15d4a09cfac2?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2070&q=80')] bg-cover bg-center">
          <div className="absolute inset-0 bg-black/60" />
        </div>
        
        <div className="relative mx-auto max-w-7xl">
          <div className="text-center">
            <h1 className="text-4xl font-bold tracking-tight text-white sm:text-6xl">
              Revolutionizing Agriculture
            </h1>
            <p className="mt-6 text-xl text-gray-300">
              Connect, optimize, and grow with our smart farming and food distribution platform.
            </p>
            <div className="mt-10 flex justify-center gap-4">
              <Button size="lg">Get Started</Button>
              <Button size="lg" variant="outline">
                Learn More
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
              Comprehensive Solutions for Modern Agriculture
            </h2>
            <p className="mt-4 text-lg text-muted-foreground">
              Empowering farmers and businesses with cutting-edge technology.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {features.map((feature) => {
              const Icon = feature.icon
              return (
                <Card key={feature.title} className="p-6 hover:shadow-lg transition-shadow">
                  <div className="flex items-center gap-4">
                    <div className="rounded-lg bg-primary/10 p-3">
                      <Icon className="h-6 w-6 text-primary" />
                    </div>
                    <h3 className="font-semibold">{feature.title}</h3>
                  </div>
                  <p className="mt-4 text-muted-foreground">
                    {feature.description}
                  </p>
                </Card>
              )
            })}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-primary py-20 px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl text-center">
          <h2 className="text-3xl font-bold tracking-tight text-primary-foreground sm:text-4xl">
            Ready to Transform Your Agricultural Business?
          </h2>
          <p className="mt-4 text-lg text-primary-foreground/90">
            Join thousands of farmers and businesses already using CropChain.
          </p>
          <div className="mt-8">
            <Button size="lg" variant="secondary">
              Start Free Trial
            </Button>
          </div>
        </div>
      </section>
    </div>
  )
}