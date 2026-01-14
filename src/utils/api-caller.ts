// utils/api.ts
import axios, { AxiosError, AxiosRequestConfig } from 'axios'

interface ApiCallerProps {
  method?: 'GET' | 'POST' | 'PUT' | 'DELETE'
  body?: unknown
  headers?: AxiosRequestConfig['headers']
  signal?: AbortSignal
}

const api = async <T>(url: string, options: ApiCallerProps): Promise<T> => {
  try {
    const response = await axios.request<T>({
      url,
      method: options.method,
      data: options.body,
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
      signal: options.signal,
      withCredentials: true,
    })

    return response.data
  } catch (error) {
    const err = error as AxiosError<any>
    throw {
      status: err.response?.status,
      message: err.response?.data?.message || err.message || 'Request failed',
      data: err.response?.data,
    }
  }
}

export { api }
