"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export default function AuthPage() {
  const [isSignIn, setIsSignIn] = useState(true)
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [userType, setUserType] = useState("")
  const [location, setLocation] = useState("")
  const router = useRouter()

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Here you would typically handle the authentication logic
    console.log(isSignIn ? "Sign in:" : "Sign up:", { name, email, password, userType, location })
    // For this example, we'll just redirect to the dashboard
    router.push("/dashboard")
  }

  return (
    <div className="max-w-md mx-auto bg-white p-8 rounded-lg shadow-md">
      <h1 className="text-2xl font-bold mb-6 text-center text-emerald-700">{isSignIn ? "Sign In" : "Sign Up"}</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        {!isSignIn && (
          <>
            <div>
              <Label htmlFor="name">Name</Label>
              <Input id="name" type="text" value={name} onChange={(e) => setName(e.target.value)} required />
            </div>
            <div>
              <Label htmlFor="userType">I am a</Label>
              <Select onValueChange={setUserType} required>
                <SelectTrigger>
                  <SelectValue placeholder="Select user type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="farmer">Farmer</SelectItem>
                  <SelectItem value="distributor">Distributor</SelectItem>
                  <SelectItem value="retailer">Retailer</SelectItem>
                </SelectContent>
              </Select>
            </div>
            {userType === "farmer" && (
              <div>
                <Label htmlFor="location">Location (Region/State)</Label>
                <Input
                  id="location"
                  type="text"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  required
                />
              </div>
            )}
          </>
        )}
        <div>
          <Label htmlFor="email">Email</Label>
          <Input id="email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
        </div>
        <div>
          <Label htmlFor="password">Password</Label>
          <Input
            id="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <Button type="submit" className="w-full bg-emerald-600 hover:bg-emerald-700">
          {isSignIn ? "Sign In" : "Sign Up"}
        </Button>
      </form>
      <p className="mt-4 text-center text-stone-600">
        {isSignIn ? "Don't have an account? " : "Already have an account? "}
        <button onClick={() => setIsSignIn(!isSignIn)} className="text-emerald-600 hover:underline">
          {isSignIn ? "Sign Up" : "Sign In"}
        </button>
      </p>
    </div>
  )
}

