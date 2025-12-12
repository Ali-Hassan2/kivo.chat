import { ApiResponse } from '@/types'
import axios from 'axios'

interface AcceptingRequestFromOverallNetworkProps {
  signal: AbortSignal
  requestId: string
}

const AcceptRequestFromOverallNetwork = async ({
  signal,
  requestId,
}:AcceptingRequestFromOverallNetworkProps): Promise<ApiResponse> => {
    try {
        const response = await axios
    } catch (error) {
        
    }
}
