export interface INetworkUsers {
  _id: string
  fullName: string
  email?: string
  username?: string
  isAcceptingMessages?: boolean
  isShowingIdentity?: boolean
  bio?: string
  requests: any[]
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

export interface GettingStatuses {
  success: boolean
  message: string
  data?: {
    statuses?: Record<string, string>
    requestMap?: Record<string, string>
  }
}

export interface requestToMe {
  _id: string
  from: {
    username: string
  }
  status: string
}
export interface GetAllRequest {
  success: boolean
  message: string
  requestToMe?: requestToMe[]
  count?: number
}

export interface IGetFriends {
  username: string
  fullName: string
  bio: string
}
export interface GetAllFriends {
  success: boolean
  message: string
  data?: IGetFriends[]
}
