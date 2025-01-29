"use client"

import { useState } from "react"
import Navbar from "@/components/navbar"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import {
  Truck,
  Package,
  MapPin,
  Calendar,
  Search,
  Filter,
  BarChart2,
  Clock,
  AlertTriangle,
} from "lucide-react"

// Mock data for demonstration
const shipments = [
  {
    id: "SHP001",
    product: "Organic Tomatoes",
    quantity: "500 kg",
    origin: "Green Farms, ",
    destination: "Whole Foods Market, ",
    status: "In Transit",
    eta: "2024-03-15",
    temperature: "4°C",
    humidity: "85%",
    alerts: "None",
  },
  {
    id: "SHP002",
    product: "Fresh Corn",
    quantity: "1200 kg",
    origin: "Sunshine Produce, ",
    destination: "Local Market Chain, ",
    status: "Delayed",
    eta: "2024-03-14",
    temperature: "5°C",
    humidity: "82%",
    alerts: "Temperature Alert",
  },
]

const routes = [
  {
    id: "RT001",
    vehicle: "Truck-A123",
    driver: "John Smith",
    stops: 4,
    distance: "450 km",
    status: "On Schedule",
    fuelEfficiency: "8.5 km/l",
    co2Emissions: "380 kg",
  },
  {
    id: "RT002",
    vehicle: "Truck-B456",
    driver: "Sarah Johnson",
    stops: 6,
    distance: "680 km",
    status: "Delayed",
    fuelEfficiency: "7.8 km/l",
    co2Emissions: "520 kg",
  },
]

export default function SupplyChainPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedStatus, setSelectedStatus] = useState("all")

  const stats = [
    {
      title: "Active Shipments",
      value: "24",
      icon: Package,
      trend: "+5%",
    },
    {
      title: "On-Time Delivery",
      value: "94%",
      icon: Clock,
      trend: "+2.3%",
    },
    {
      title: "CO₂ Savings",
      value: "1.2T",
      icon: BarChart2,
      trend: "+12.5%",
    },
    {
      title: "Alerts",
      value: "3",
      icon: AlertTriangle,
      trend: "-15%",
    },
  ]

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <main className="container mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold">Supply Chain Management</h1>
          <Button>
            <Truck className="mr-2 h-4 w-4" /> Add Shipment
          </Button>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {stats.map((stat) => {
            const Icon = stat.icon
            return (
              <Card key={stat.title} className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">{stat.title}</p>
                    <h3 className="text-2xl font-bold mt-1">{stat.value}</h3>
                  </div>
                  <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
                    <Icon className="h-5 w-5 text-primary" />
                  </div>
                </div>
                <div className="mt-2">
                  <span className={`text-sm ${stat.trend.startsWith('+') ? 'text-green-500' : 'text-red-500'}`}>
                    {stat.trend}
                  </span>
                  <span className="text-sm text-muted-foreground ml-1">vs last month</span>
                </div>
              </Card>
            )
          })}
        </div>

        <Tabs defaultValue="shipments" className="mb-8">
          <TabsList>
            <TabsTrigger value="shipments">Shipment Tracking</TabsTrigger>
            <TabsTrigger value="routes">Route Planning</TabsTrigger>
          </TabsList>

          <TabsContent value="shipments">
            <div className="flex flex-col sm:flex-row gap-4 mb-6">
              <div className="flex-1">
                <div className="relative">
                  <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Search shipments..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-8"
                  />
                </div>
              </div>
              <Select value={selectedStatus} onValueChange={setSelectedStatus}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Status</SelectItem>
                  <SelectItem value="in-transit">In Transit</SelectItem>
                  <SelectItem value="delayed">Delayed</SelectItem>
                  <SelectItem value="delivered">Delivered</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <Card>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Tracking ID</TableHead>
                    <TableHead>Product</TableHead>
                    <TableHead>Origin</TableHead>
                    <TableHead>Destination</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>ETA</TableHead>
                    <TableHead>Conditions</TableHead>
                    <TableHead>Alerts</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {shipments.map((shipment) => (
                    <TableRow key={shipment.id}>
                      <TableCell className="font-medium">{shipment.id}</TableCell>
                      <TableCell>{shipment.product}</TableCell>
                      <TableCell>{shipment.origin}</TableCell>
                      <TableCell>{shipment.destination}</TableCell>
                      <TableCell>
                        <Badge
                          variant={shipment.status === "In Transit" ? "default" : "destructive"}
                        >
                          {shipment.status}
                        </Badge>
                      </TableCell>
                      <TableCell>{shipment.eta}</TableCell>
                      <TableCell>
                        {shipment.temperature} | {shipment.humidity}
                      </TableCell>
                      <TableCell>
                        <Badge
                          variant={shipment.alerts === "None" ? "secondary" : "destructive"}
                        >
                          {shipment.alerts}
                        </Badge>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </Card>
          </TabsContent>

          <TabsContent value="routes">
            <div className="flex flex-col sm:flex-row gap-4 mb-6">
              <div className="flex-1">
                <div className="relative">
                  <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Search routes..."
                    className="pl-8"
                  />
                </div>
              </div>
              <Button variant="outline">
                <Filter className="mr-2 h-4 w-4" />
                Filters
              </Button>
            </div>

            <Card>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Route ID</TableHead>
                    <TableHead>Vehicle</TableHead>
                    <TableHead>Driver</TableHead>
                    <TableHead>Stops</TableHead>
                    <TableHead>Distance</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Efficiency</TableHead>
                    <TableHead>CO₂ Emissions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {routes.map((route) => (
                    <TableRow key={route.id}>
                      <TableCell className="font-medium">{route.id}</TableCell>
                      <TableCell>{route.vehicle}</TableCell>
                      <TableCell>{route.driver}</TableCell>
                      <TableCell>{route.stops}</TableCell>
                      <TableCell>{route.distance}</TableCell>
                      <TableCell>
                        <Badge
                          variant={route.status === "On Schedule" ? "default" : "destructive"}
                        >
                          {route.status}
                        </Badge>
                      </TableCell>
                      <TableCell>{route.fuelEfficiency}</TableCell>
                      <TableCell>{route.co2Emissions}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </Card>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  )
}