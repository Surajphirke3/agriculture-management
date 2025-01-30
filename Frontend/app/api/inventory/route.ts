import axios from "axios"

// Define the base URL for your API
const BASE_URL = "http://192.168.137.1:5000"

// Define the type for inventory items
export interface InventoryItem {
  id?: string
  name: string
  quantity: number
  unit: string
  status: string
  expiryDate: string
  userId: string
  location: string
  alerts: string
}

// Define the type for API response
interface ApiResponse<T> {
  data: T
  message: string
}

// Fetch all items by user
export const fetchItemsByUser = async (userId: string): Promise<InventoryItem[]> => {
  try {
    const response = await axios.get<ApiResponse<InventoryItem[]>>(`${BASE_URL}/api/inventory/items?userId=${userId}`)
    return response.data.data
  } catch (error) {
    console.error("Error fetching items:", error)
    throw error
  }
}

// Add a new item
export const addItem = async (item: InventoryItem): Promise<InventoryItem> => {
  try {
    const response = await axios.post<ApiResponse<InventoryItem>>(`${BASE_URL}/api/inventory/items`, item)
    return response.data.data
  } catch (error) {
    console.error("Error adding item:", error)
    throw error
  }
}

// Get item by ID
export const getItemById = async (id: string): Promise<InventoryItem> => {
  try {
    const response = await axios.get<ApiResponse<InventoryItem>>(`${BASE_URL}/api/inventory/items/${id}`)
    return response.data.data
  } catch (error) {
    console.error("Error fetching item:", error)
    throw error
  }
}

// Update an item
export const updateItem = async (id: string, item: InventoryItem): Promise<InventoryItem> => {
  try {
    const response = await axios.put<ApiResponse<InventoryItem>>(`${BASE_URL}/api/inventory/items/${id}`, item)
    return response.data.data
  } catch (error) {
    console.error("Error updating item:", error)
    throw error
  }
}

// Delete an item
export const deleteItem = async (id: string): Promise<void> => {
  try {
    await axios.delete(`${BASE_URL}/api/inventory/items/${id}`)
  } catch (error) {
    console.error("Error deleting item:", error)
    throw error
  }
}

