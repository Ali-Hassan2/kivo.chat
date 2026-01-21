'use client'

import { useSearchParams } from 'next/navigation'

const QueryParams = (key = '', defaultValue = '') => {
  const searchParams = useSearchParams()
  const value = searchParams.get(key)
  return value ?? defaultValue
}

export { QueryParams }
