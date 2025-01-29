"use client"

import { useState } from "react"
import Navbar from "@/components/navbar"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Recycle, Search, Leaf, BarChart2, AlertTriangle } from "lucide-react"

const wasteItems = [
  {
    id: 1,
    product: "Tomatoes",
    quantity: "50 kg",
    reason: "Over-ripened",
    status: "Composting",
    location: "Warehouse A",
    date: "2024-03-10",
    impact: "Low",
  },
  {
    id: 2,
    product: "Lettuce",
    quantity: "30 kg",
    reason: "Quality Control",
    status: "Donated",
    location: "Warehouse B",
    date: "2024-03-09",
    impact: "Medium",
  },
]

export default function WastePage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedStatus, setSelectedStatus] = useState("all")

  const stats = [
    {
      title: "Total Waste Reduction",
      value: "45%",
      trend: "+12.3%",
      icon: Recycle,
    },
    {
      title: "Composted Material",
      value: "1,234 kg",
      trend: "+5.4%",
      icon: Leaf,
    },
    {
      title: "Environmental Impact",
      value: "-2.5T CO₂",
      trend: "+8.7%",
      icon: BarChart2,
    },
    {
      title: "Critical Items",
      value: "3",
      trend: "-15.2%",
      icon: AlertTriangle,
    },
  ]

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <main className="container mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold">Waste Management</h1>
          <Button>
            <Recycle className="mr-2 h-4 w-4" /> Log Waste
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

        {/* Filters */}
        <div className="flex flex-col sm:flex-row gap-4 mb-6">
          <div className="flex-1">
            <div className="relative">
              <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search waste records..."
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
              <SelectItem value="composting">Composting</SelectItem>
              <SelectItem value="donated">Donated</SelectItem>
              <SelectItem value="recycled">Recycled</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Waste Records Table */}
        <Card>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Product</TableHead>
                <TableHead>Quantity</TableHead>
                <TableHead>Reason</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Location</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Environmental Impact</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {wasteItems.map((item) => (
                <TableRow key={item.id}>
                  <TableCell className="font-medium">{item.product}</TableCell>
                  <TableCell>{item.quantity}</TableCell>
                  <TableCell>{item.reason}</TableCell>
                  <TableCell>
                    <Badge
                      variant={item.status === "Donated" ? "secondary" : "default"}
                    >
                      {item.status}
                    </Badge>
                  </TableCell>
                  <TableCell>{item.location}</TableCell>
                  <TableCell>{item.date}</TableCell>
                  <TableCell>
                    <Badge
                      variant={item.impact === "Low" ? "default" : "destructive"}
                    >
                      {item.impact}
                    </Badge>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Card>
      </main>
    </div>
  )
}