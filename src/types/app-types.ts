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
  _id: string
  username: string
  fullName: string
  bio: string
}
export interface GetAllFriends {
  success: boolean
  message: string
  friends?: IGetFriends[]
}

export interface IBlocks {
  _id: string
  username: string
  fullName: string
  bio: string
}
export interface GetBlockedUsers {
  success: boolean
  message: string
  data?: IBlocks[]
}

interface ModeResponsForOverallNetwork {
  success: boolean
  message: string
  mode: boolean
}

export interface CountData {
  current_count: number
  new_count: number
  isOriginal: boolean
}

export interface ProfileCountResposne {
  success: boolean
  message: string
  data?: CountData
}

export interface ProfilesShape {
  _id: string
  fullName: string
  username: string
  email: string
  bio: string
}

interface ProfileGettingResponse {
  success: boolean
  message: string
  data: ProfilesShape[]
}

export type { ModeResponsForOverallNetwork, ProfileGettingResponse }
