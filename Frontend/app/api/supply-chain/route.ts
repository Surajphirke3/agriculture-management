"use server"

import { NextResponse } from 'next/server'

export async function GET() {
  try {
    // Mock data - replace with actual database call
    const shipments = [
      {
        id: "SHP001",
        product: "Organic Tomatoes",
        quantity: "500 kg",
        origin: "Green Valley Farms, CA",
        destination: "Whole Foods Market, NY",
        status: "In Transit",
        eta: "2024-03-15",
        temperature: "4°C",
        humidity: "85%",
        alerts: "None",
      },
      // Add more shipments as needed
    ]

    return NextResponse.json({ data: shipments })
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch shipments" }, { status: 500 })
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json()
    // Validate and save to database
    return NextResponse.json({ message: "Shipment added successfully" })
  } catch (error) {
    return NextResponse.json({ error: "Failed to add shipment" }, { status: 500 })
  }
}