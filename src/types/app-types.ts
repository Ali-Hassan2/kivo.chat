export interface INetworkUsers {
  _id: string
  fullName: string
  email?: string
  username?: string
  isAcceptingMessages?: boolean
  isShowingIdentity?: boolean
  bio?: string
}

export interface NewRequest {
  status: string
  from?: string
  to?: string
}
export interface MakeNewNetworkRequest {
  success: boolean
  statusCode?: number
  message: string
  newRequest?: NewRequest
}

export interface NetworkLength {
  success: boolean
  message: string
  data?: {
    networkLength: number
  }
}
