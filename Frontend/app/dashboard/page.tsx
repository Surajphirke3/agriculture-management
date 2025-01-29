"use client"

import { useState } from "react"
import Navbar from "@/components/navbar"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  PieChart,
  Pie,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer
} from "recharts"
import {
  Package,
  Truck,
  DollarSign,
  Users,
  ArrowUpRight,
  ArrowDownRight,
  Calendar,
  Download,
} from "lucide-react"

const salesData = [
  { month: "Jan", sales: 4000, orders: 240 },
  { month: "Feb", sales: 3000, orders: 198 },
  { month: "Mar", sales: 2000, orders: 980 },
  { month: "Apr", sales: 2780, orders: 308 },
  { month: "May", sales: 1890, orders: 480 },
  { month: "Jun", sales: 2390, orders: 380 },
]

const productPerformance = [
  { name: "Tomatoes", value: 400 },
  { name: "Corn", value: 300 },
  { name: "Wheat", value: 300 },
  { name: "Rice", value: 200 },
]

const recentOrders = [
  {
    id: "ORD001",
    customer: "Whole Foods Market",
    amount: 1234.56,
    status: "Delivered",
    date: "2024-03-10",
  },
  {
    id: "ORD002",
    customer: "Local Market Chain",
    amount: 567.89,
    status: "Processing",
    date: "2024-03-09",
  },
]

export default function DashboardPage() {
  const [dateRange, setDateRange] = useState("month")

  const stats = [
    {
      title: "Total Revenue",
      value: "$54,234",
      trend: "+14.5%",
      icon: DollarSign,
    },
    {
      title: "Active Orders",
      value: "123",
      trend: "+28.4%",
      icon: Package,
    },
    {
      title: "Shipments",
      value: "45",
      trend: "+8.2%",
      icon: Truck,
    },
    {
      title: "Active Customers",
      value: "89",
      trend: "+12.5%",
      icon: Users,
    },
  ]

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
       <boltAction type="file" filePath="app/dashboard/page.tsx">      <main className="container mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold">Dashboard Overview</h1>
          <div className="flex gap-4">
            <Button variant="outline">
              <Calendar className="mr-2 h-4 w-4" />
              {dateRange === "month" ? "Last 30 Days" : "Last 12 Months"}
            </Button>
            <Button>
              <Download className="mr-2 h-4 w-4" />
              Export Report
            </Button>
          </div>
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

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
          {/* Sales Chart */}
          <Card className="lg:col-span-2 p-4">
            <h3 className="text-lg font-semibold mb-4">Sales Overview</h3>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={salesData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Line
                    type="monotone"
                    dataKey="sales"
                    stroke="hsl(var(--chart-1))"
                  />
                  <Line
                    type="monotone"
                    dataKey="orders"
                    stroke="hsl(var(--chart-2))"
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </Card>

          {/* Product Performance */}
          <Card className="p-4">
            <h3 className="text-lg font-semibold mb-4">Product Performance</h3>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={productPerformance}
                    cx="50%"
                    cy="50%"
                    outerRadius={80}
                    fill="hsl(var(--chart-1))"
                    dataKey="value"
                    label
                  />
                  <Tooltip />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </Card>
        </div>

        {/* Recent Orders */}
        <Card>
          <div className="p-4 border-b">
            <h3 className="text-lg font-semibold">Recent Orders</h3>
          </div>
          <div className="p-4">
            <div className="space-y-4">
              {recentOrders.map((order) => (
                <div
                  key={order.id}
                  className="flex items-center justify-between p-4 rounded-lg border"
                >
                  <div>
                    <p className="font-medium">{order.customer}</p>
                    <p className="text-sm text-muted-foreground">
                      Order ID: {order.id}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="font-medium">
                      ${order.amount.toFixed(2)}
                    </p>
                    <Badge
                      variant={
                        order.status === "Delivered" ? "default" : "secondary"
                      }
                    >
                      {order.status}
                    </Badge>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </Card>
      </main>
    </div>
  )
}