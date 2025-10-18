import { IMessages } from '@/entities'

export interface ApiResponse {
  success: boolean
  statusCode: number
  message: string
  messages?: Array<IMessages>
}
