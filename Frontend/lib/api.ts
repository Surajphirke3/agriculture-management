const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || ''

export async function fetchInventory() {
  const response = await fetch(`${API_BASE_URL}/api/inventory`)
  if (!response.ok) throw new Error('Failed to fetch inventory')
  return response.json()
}

export async function addInventoryItem(data: any) {
  const response = await fetch(`${API_BASE_URL}/api/inventory`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  })
  if (!response.ok) throw new Error('Failed to add inventory item')
  return response.json()
}

export async function fetchShipments() {
  const response = await fetch(`${API_BASE_URL}/api/supply-chain`)
  if (!response.ok) throw new Error('Failed to fetch shipments')
  return response.json()
}

export async function addShipment(data: any) {
  const response = await fetch(`${API_BASE_URL}/api/supply-chain`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  })
  if (!response.ok) throw new Error('Failed to add shipment')
  return response.json()
}

export async function fetchProducts() {
  const response = await fetch(`${API_BASE_URL}/api/marketplace`)
  if (!response.ok) throw new Error('Failed to fetch products')
  return response.json()
}

export async function addProduct(data: any) {
  const response = await fetch(`${API_BASE_URL}/api/marketplace`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  })
  if (!response.ok) throw new Error('Failed to add product')
  return response.json()
}