"use client"

import { useState, useEffect } from "react"
import Navbar from "@/components/navbar"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Package, AlertTriangle, TrendingUp, BarChart2, Search, Plus } from "lucide-react"
import { fetchItemsByUser, addItem, updateItem, deleteItem , InventoryItem } from "@/app/api/inventory/route"

// Mock data for demonstration
//const inventoryItems = [
//  {
//    id: 1,
//    name: "Organic Tomatoes",
//    quantity: 500,
//    unit: "kg",
//    status: "In Stock",
//    expiryDate: "2024-05-15",
//    location: "Warehouse A",
//    alerts: "Low Stock",
//  },
//  {
//    id: 2,
//    name: "Sweet Corn",
//    quantity: 1200,
//    unit: "kg",
//    status: "In Stock",
//    expiryDate: "2024-05-20",
//    location: "Warehouse B",
//    alerts: "None",
//  },
//  // Add more items as needed
//]

export default function InventoryPage() {
  const [inventoryItems, setInventoryItems] = useState<InventoryItem[]>([])

  useEffect(() => {
    const fetchItems = async () => {
      try {
        // Replace '6798f0542a27113583ae4812' with the actual user ID or get it from your authentication system
        const items = await fetchItemsByUser("6798f0542a27113583ae4812")
        setInventoryItems(items)
      } catch (error) {
        console.error("Failed to fetch inventory items:", error)
      }
    }

    fetchItems()
  }, [])

const [searchTerm, setSearchTerm] = useState("")
const [selectedCategory, setSelectedCategory] = useState("all")

  const stats = [
    {
      title: "Total Items",
      value: "1,234",
      icon: Package,
      trend: "+12.3%",
    },
    {
      title: "Low Stock Alerts",
      value: "23",
      icon: AlertTriangle,
      trend: "-5.4%",
    },
    {
      title: "Monthly Turnover",
      value: "456K",
      icon: TrendingUp,
      trend: "+8.7%",
    },
    {
      title: "Waste Reduction",
      value: "15%",
      icon: BarChart2,
      trend: "+2.3%",
    },
  ]

  const handleAddItem = async () => {
    try {
      const newItem: InventoryItem = {
        name: "New Item",
        quantity: 0,
        unit: "pcs",
        status: "In Stock",
        expiryDate: new Date().toISOString().split("T")[0],
        userId: "6798f0542a27113583ae4812", // Replace with actual user ID
        location: "Warehouse A",
        alerts: "None",
      }
      const addedItem = await addItem(newItem)
      setInventoryItems([...inventoryItems, addedItem])
    } catch (error) {
      console.error("Failed to add item:", error)
    }
  }

  const handleUpdateItem = async (id: string, updatedItem: InventoryItem) => {
    try {
      const updated = await updateItem(id, updatedItem)
      setInventoryItems(inventoryItems.map((item) => (item.id === id ? updated : item)))
    } catch (error) {
      console.error("Failed to update item:", error)
    }
  }

  const handleDeleteItem = async (id: string) => {
    try {
      await deleteItem(id)
      setInventoryItems(inventoryItems.filter((item) => item.id !== id))
    } catch (error) {
      console.error("Failed to delete item:", error)
    }
  }

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <main className="container mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold">Inventory Management</h1>
          <Button onClick={handleAddItem}>
            <Plus className="mr-2 h-4 w-4" /> Add Item
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
                  <span className={`text-sm ${stat.trend.startsWith("+") ? "text-green-500" : "text-red-500"}`}>
                    {stat.trend}
                  </span>
                  <span className="text-sm text-muted-foreground ml-1">vs last month</span>
                </div>
              </Card>
            )
          })}
        </div>

        {/* Filters and Search */}
        <div className="flex flex-col sm:flex-row gap-4 mb-6">
          <div className="flex-1">
            <div className="relative">
              <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search inventory..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-8"
              />
            </div>
          </div>
          <Select value={selectedCategory} onValueChange={setSelectedCategory}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Category" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Categories</SelectItem>
              <SelectItem value="fruits">Fruits</SelectItem>
              <SelectItem value="vegetables">Vegetables</SelectItem>
              <SelectItem value="grains">Grains</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Inventory Table */}
        <Card>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Item Name</TableHead>
                <TableHead>Quantity</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Expiry Date</TableHead>
                <TableHead>Location</TableHead>
                <TableHead>Alerts</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {inventoryItems.map((item) => (
                <TableRow key={item.id}>
                  <TableCell className="font-medium">{item.name}</TableCell>
                  <TableCell>
                    {item.quantity} {item.unit}
                  </TableCell>
                  <TableCell>
                    <Badge variant="outline">{item.status}</Badge>
                  </TableCell>
                  <TableCell>{item.expiryDate}</TableCell>
                  <TableCell>{item.location}</TableCell>
                  <TableCell>
                    {item.alerts === "None" ? (
                      <Badge variant="secondary">None</Badge>
                    ) : (
                      <Badge variant="destructive">{item.alerts}</Badge>
                    )}
                  </TableCell>
                  <TableCell>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleUpdateItem(item.id!, { ...item, quantity: item.quantity + 1 })}
                    >
                      Update
                    </Button>
                    <Button variant="destructive" size="sm" className="ml-2" onClick={() => handleDeleteItem(item.id!)}>
                      Delete
                    </Button>
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