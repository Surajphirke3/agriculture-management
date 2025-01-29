"use server"

import { NextResponse } from 'next/server'

export async function GET() {
  try {
    // Mock data - replace with actual database call
    const inventory = [
      {
        id: 1,
        name: "Organic Tomatoes",
        quantity: 500,
        unit: "kg",
        status: "In Stock",
        expiryDate: "2024-05-15",
        location: "Warehouse A",
        alerts: "Low Stock",
      },
      // Add more items as needed
    ]

    return NextResponse.json({ data: inventory })
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch inventory" }, { status: 500 })
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json()
    // Validate and save to database
    return NextResponse.json({ message: "Item added successfully" })
  } catch (error) {
    return NextResponse.json({ error: "Failed to add item" }, { status: 500 })
  }
}