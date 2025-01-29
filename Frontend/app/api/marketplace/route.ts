"use server"

import { NextResponse } from 'next/server'

export async function GET() {
  try {
    // Mock data - replace with actual database call
    const products = [
      {
        id: 1,
        name: "Fresh Organic Tomatoes",
        price: 2.99,
        unit: "kg",
        seller: "Green Valley Farms",
        rating: 4.5,
        location: "California, USA",
        image: "https://images.unsplash.com/photo-1592924357228-91a4daadcfea?auto=format&fit=crop&q=80&w=300&h=300",
        organic: true,
        available: 500,
      },
      // Add more products as needed
    ]

    return NextResponse.json({ data: products })
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch products" }, { status: 500 })
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json()
    // Validate and save to database
    return NextResponse.json({ message: "Product added successfully" })
  } catch (error) {
    return NextResponse.json({ error: "Failed to add product" }, { status: 500 })
  }
}