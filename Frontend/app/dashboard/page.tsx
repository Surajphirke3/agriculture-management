import { Button } from "@/components/ui/button"
import Link from "next/link"
import Navbar from "@/components/navbar"
export default function Dashboard() {
  // This would typically come from a database or API
  const userInfo = {
    name: "Nihar Kore",
    type: "Farmer",
    location: "Midwest Region",
  }

  return (
    <div>
      <Navbar/>
      <div className="max-w-4xl mx-auto">
        <h1 className="text-2xl md:text-3xl font-bold mb-6 text-emerald-700">Welcome to Your Dashboard</h1>
        <div className="grid md:grid-cols-2 gap-6">
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold mb-2 text-emerald-600">User Information</h2>
            <ul className="space-y-2 text-stone-600">
              <li>Name: {userInfo.name}</li>
              <li>Type: {userInfo.type}</li>
              <li>Location: {userInfo.location}</li>
            </ul>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold mb-2 text-emerald-600">Quick Stats</h2>
            <ul className="space-y-2 text-stone-600">
              <li>Total Products: 15</li>
              <li>Pending Orders: 3</li>
              <li>Recent Connections: 7</li>
            </ul>
          </div>
        </div>
        <div className="mt-6 bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-2 text-emerald-600">Actions</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Button asChild className="w-full bg-emerald-600 hover:bg-emerald-700">
              <Link href="/inventory">Manage Inventory</Link>
            </Button>
            <Button asChild className="w-full bg-emerald-600 hover:bg-emerald-700">
              <Link href="/supply-chain">View Orders</Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}

