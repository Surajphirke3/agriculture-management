export interface InventoryItem {
  id: number
  name: string
  quantity: number
  unit: string
  status: string
  expiryDate: string
  location: string
  alerts: string
}

export interface Shipment {
  id: string
  product: string
  quantity: string
  origin: string
  destination: string
  status: string
  eta: string
  temperature: string
  humidity: string
  alerts: string
}

export interface Product {
  id: number
  name: string
  price: number
  unit: string
  seller: string
  rating: number
  location: string
  image: string
  organic: boolean
  available: number
}

export interface ApiResponse<T> {
  data: T
  error?: string
  message?: string
}