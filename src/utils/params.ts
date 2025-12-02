'use client'

import { useSearchParams } from 'next/navigation'

interface QueryParamsProps {
  key: string
  defaultValue?: string
}
const QueryParams = ({ key, defaultValue = '' }: QueryParamsProps) => {
  const searchParams = useSearchParams()
  const value = searchParams.get(key)
  return value ?? defaultValue
}

export { QueryParams }
