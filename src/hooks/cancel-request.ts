import { useRef, useState } from 'react'
import { useToggle } from 'react-use'
import { AuthStatus } from '@/types'

const useCancelRequest = () => {
  const [
    cancelRequestForPendingRequestOnNetwork,
    setCancelRequestForPendingRequestOnNetwork,
  ] = useState<AuthStatus>({
    success: '',
    error: '',
  })
  const [
    isCancellingRequestInPendingRequestOnNetwork,
    setIsCancellingRequestInPendingRequestOnNetwork,
  ] = useToggle(false)
  const controllerForCancellingRequestForPendingRequestOnNetwork =
    useRef<AbortController | null>(null)
}
