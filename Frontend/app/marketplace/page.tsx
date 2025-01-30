"use client"

import { useState } from "react"
import Navbar from "@/components/navbar"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Slider } from "@/components/ui/slider"
import { Search, Filter, ShoppingCart } from "lucide-react"

// Mock data for demonstration
const products = [
    {
      id: 1,
      name: "Fresh Organic Tomatoes",
      price: 299,
      unit: "kg",
      seller: "Green Valley Farms",
      rating: 4.5,
      location: "ind",
      image: "https://images.unsplash.com/photo-1592924357228-91a4daadcfea?auto=format&fit=crop&q=80&w=300&h=300",
      organic: true,
      available: 500,
    },
    {
      id: 2,
      name: "Golden Honey Mangoes",
      price: 499,
      unit: "dozen",
      seller: "Tropical Harvest",
      rating: 4.7,
      location: "ind",
      image: "https://unsplash.com/photos/green-and-brown-round-fruit-on-brown-wooden-round-table-e51CJtEkPoI?auto=format&fit=crop&q=80&w=300&h=300",
      organic: true,
      available: 200,
    },
    {
      id: 3,
      name: "Organic Spinach Bunch",
      price: 99,
      unit: "bunch",
      seller: "Fresh Greens Market",
      rating: 4.3,
      location: "ind",
      image: "https://images.unsplash.com/photo-1582515073490-39981397b66a?auto=format&fit=crop&q=80&w=300&h=300",
      organic: true,
      available: 150,
    },
    {
      id: 4,
      name: "Farm Fresh Carrots",
      price: 129,
      unit: "kg",
      seller: "Green Valley Farms",
      rating: 4.6,
      location: "ind",
      image: "https://images.unsplash.com/photo-1564300571419-60fe6a7d3688?auto=format&fit=crop&q=80&w=300&h=300",
      organic: true,
      available: 300,
    },
    {
      id: 5,
      name: "Natural Almonds",
      price: 899,
      unit: "kg",
      seller: "Nutri Farms",
      rating: 4.8,
      location: "ind",
      image: "https://images.unsplash.com/photo-1585238342029-7ac4ea21a64a?auto=format&fit=crop&q=80&w=300&h=300",
      organic: false,
      available: 120,
    },
    {
      id: 6,
      name: "Desi Cow Milk",
      price: 79,
      unit: "litre",
      seller: "Healthy Dairy",
      rating: 4.9,
      location: "ind",
      image: "https://images.unsplash.com/photo-1561715276-d4e646f4a2f5?auto=format&fit=crop&q=80&w=300&h=300",
      organic: true,
      available: 1000,
    },
    {
      id: 7,
      name: "Free-Range Brown Eggs",
      price: 199,
      unit: "dozen",
      seller: "Poultry Fresh",
      rating: 4.7,
      location: "ind",
      image: "https://images.unsplash.com/photo-1612015998173-9d94cf9826c6?auto=format&fit=crop&q=80&w=300&h=300",
      organic: true,
      available: 400,
    },
    {
      id: 8,
      name: "Pure Desi Ghee",
      price: 1499,
      unit: "kg",
      seller: "Organic Kitchen",
      rating: 4.9,
      location: "ind",
      image: "https://images.unsplash.com/photo-1617098888151-d0b4b0cc8b6e?auto=format&fit=crop&q=80&w=300&h=300",
      organic: true,
      available: 80,
    },
    {
      id: 9,
      name: "Himalayan Rock Salt",
      price: 250,
      unit: "kg",
      seller: "Spice Market",
      rating: 4.5,
      location: "ind",
      image: "https://images.unsplash.com/photo-1587049633318-cb20c66c02c8?auto=format&fit=crop&q=80&w=300&h=300",
      organic: true,
      available: 300,
    },
    {
      id: 10,
      name: "Organic Whole Wheat Flour",
      price: 60,
      unit: "kg",
      seller: "Healthy Grains",
      rating: 4.6,
      location: "ind",
      image: "https://images.unsplash.com/photo-1623750114135-4c0d550cfc49?auto=format&fit=crop&q=80&w=300&h=300",
      organic: true,
      available: 500,
    },
    {
      id: 11,
      name: "Fresh Strawberries",
      price: 350,
      unit: "kg",
      seller: "Berry Farms",
      rating: 4.7,
      location: "ind",
      image: "https://images.unsplash.com/photo-1615485299245-919c0b186f94?auto=format&fit=crop&q=80&w=300&h=300",
      organic: true,
      available: 150,
    },
    {
      id: 12,
      name: "Handmade Jaggery",
      price: 180,
      unit: "kg",
      seller: "Natural Sweeteners",
      rating: 4.6,
      location: "ind",
      image: "https://images.unsplash.com/photo-1664327714528-42d6f7403c42?auto=format&fit=crop&q=80&w=300&h=300",
      organic: true,
      available: 250,
    },
    {
      id: 13,
      name: "Organic Basmati Rice",
      price: 120,
      unit: "kg",
      seller: "Healthy Grains",
      rating: 4.7,
      location: "ind",
      image: "https://images.unsplash.com/photo-1617026069143-8b69f4a0aaf1?auto=format&fit=crop&q=80&w=300&h=300",
      organic: true,
      available: 600,
    },
    {
      id: 14,
      name: "Fresh Green Peas",
      price: 220,
      unit: "kg",
      seller: "Farm Direct",
      rating: 4.4,
      location: "ind",
      image: "https://images.unsplash.com/photo-1623320151666-fb5b65e24b9b?auto=format&fit=crop&q=80&w=300&h=300",
      organic: true,
      available: 400,
    },
    {
      id: 15,
      name: "Pure Mustard Oil",
      price: 299,
      unit: "litre",
      seller: "Cold Pressed Oils",
      rating: 4.8,
      location: "ind",
      image: "https://images.unsplash.com/photo-1597189860310-548e61b83c08?auto=format&fit=crop&q=80&w=300&h=300",
      organic: true,
      available: 200,
    },
    {
      id: 16,
      name: "Fresh Basil Leaves",
      price: 90,
      unit: "bunch",
      seller: "Herb Garden",
      rating: 4.5,
      location: "ind",
      image: "https://images.unsplash.com/photo-1582516462669-dc7c36c7e8d4?auto=format&fit=crop&q=80&w=300&h=300",
      organic: true,
      available: 180,
    },
  
  






  
  {
    id: 2,
    name: "Premium Sweet Corn",
    price: 199,
    unit: "kg",
    seller: "Sunshine Produce",
    rating: 4.8,
    location: "india",
    image: "https://images.unsplash.com/photo-1551754655-cd27e38d2076?auto=format&fit=crop&q=80&w=300&h=300",
    organic: false,
    available: 1200,
  },
  // Add more products as needed
]

export default function MarketplacePage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [priceRange, setPriceRange] = useState([0, 1000])
  const [selectedCategory, setSelectedCategory] = useState("all")

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <main className="container mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold">Digital Marketplace</h1>
          <Button variant="outline">
            <ShoppingCart className="mr-2 h-4 w-4" />
            Cart (0)
          </Button>
        </div>

        {/* Filters Section */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          <Card className="p-4 lg:col-span-1">
            <h2 className="font-semibold mb-4">Filters</h2>
            
            <div className="space-y-4">
              <div>
                <label className="text-sm font-medium">Category</label>
                <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select category" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Categories</SelectItem>
                    <SelectItem value="fruits">Fruits</SelectItem>
                    <SelectItem value="vegetables">Vegetables</SelectItem>
                    <SelectItem value="grains">Grains</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <label className="text-sm font-medium">Price Range</label>
                <div className="mt-2">
                  <Slider
                    value={priceRange}
                    onValueChange={setPriceRange}
                    max={1000}
                    step={1}
                  />
                  <div className="flex justify-between mt-2 text-sm text-muted-foreground">
                    <span>₹{priceRange[0]}</span>
                    <span>₹{priceRange[1]}</span>
                  </div>
                </div>
              </div>

              <div>
                <label className="text-sm font-medium">Certification</label>
                <div className="space-y-2 mt-2">
                  <Button variant="outline" className="w-full justify-start">
                    <input type="checkbox" className="mr-2" />
                    Organic
                  </Button>
                  <Button variant="outline" className="w-full justify-start">
                    <input type="checkbox" className="mr-2" />
                    Fair Trade
                  </Button>
                </div>
              </div>
            </div>
          </Card>

          {/* Products Grid */}
          <div className="lg:col-span-3">
            <div className="flex gap-4 mb-6">
              <div className="flex-1">
                <div className="relative">
                  <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Search products..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-8"
                  />
                </div>
              </div>
              <Select defaultValue="featured">
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Sort by" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="featured">Featured</SelectItem>
                  <SelectItem value="price-low">Price: Low to High</SelectItem>
                  <SelectItem value="price-high">Price: High to Low</SelectItem>
                  <SelectItem value="rating">Highest Rated</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {products.map((product) => (
                <Card key={product.id} className="overflow-hidden">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-48 object-cover"
                  />
                  <div className="p-4">
                    <div className="flex justify-between items-start mb-2">
                      <h3 className="font-semibold">{product.name}</h3>
                      {product.organic && (
                        <Badge variant="secondary">Organic</Badge>
                      )}
                    </div>
                    <p className="text-2xl font-bold mb-2">
                      ₹{product.price}
                      <span className="text-sm text-muted-foreground">/{product.unit}</span>
                    </p>
                    <p className="text-sm text-muted-foreground mb-2">
                      by {product.seller}
                    </p>
                    <p className="text-sm text-muted-foreground mb-4">
                      {product.location}
                    </p>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-muted-foreground">
                        {product.available} {product.unit} available
                      </span>
                      <Button>Add to Cart</Button>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}