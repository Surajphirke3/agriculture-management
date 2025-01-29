"use client"

import { useState } from 'react'
import { toast } from '@/components/ui/use-toast'
import type { ApiResponse } from '@/types'

interface UseApiOptions<T> {
  onSuccess?: (data: T) => void
  onError?: (error: Error) => void
}

export function useApi<T>() {
  const [data, setData] = useState<T | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<Error | null>(null)

  const execute = async (
    promise: Promise<ApiResponse<T>>,
    options?: UseApiOptions<T>
  ) => {
    try {
      setLoading(true)
      setError(null)
      const response = await promise
      setData(response.data)
      options?.onSuccess?.(response.data)
      if (response.message) {
        toast({
          title: "Success",
          description: response.message,
        })
      }
      return response
    } catch (err) {
      const error = err as Error
      setError(error)
      options?.onError?.(error)
      toast({
        variant: "destructive",
        title: "Error",
        description: error.message,
      })
      throw error
    } finally {
      setLoading(false)
    }
  }

  return { data, loading, error, execute }
}