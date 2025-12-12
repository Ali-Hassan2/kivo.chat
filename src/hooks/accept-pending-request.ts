import React, { useRef, useState } from 'react'
import { AuthStatus } from '@/types'
import { useToggle } from 'react-use'
import * as z from 'zod'

const useAcceptingRequest = () => {
  const [
    AcceptinMessageFromOverallNetworkResponse,
    setAcceptinMessageFromOverallNetworkResponse,
  ] = React.useState<AuthStatus>({
    error: '',
    success: '',
  })
  const [isAcceptingMessageFromOverallNetwork,setIsAcceptingMessagesFromOverallNetwork] = useToggle(false)

  const controllerForAcceptingPendingRequestFromOverallNetwork = useRef<AbortController | null>(null)

  const acceptPendingRequestFromOverallNetwor = async({data:z.infer<typeof })=>{

  }
}
