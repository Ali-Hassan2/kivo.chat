import axios from 'axios'
import { API_ENDPOINTS } from '@/actions'
import { ApiResponse } from '@/types'

interface AcceptingRequestFromOverallNetworkProps {
  signal: AbortSignal
  requestId: string
}

const AcceptRequestFromOverallNetwork = async ({
  signal,
  requestId,
}: AcceptingRequestFromOverallNetworkProps): Promise<ApiResponse> => {
  try {
    const response = await axios.post(
      `${API_ENDPOINTS.acceptPendingRequestOnNetwork}?requesId=${requestId}`,
    )
    return response.data
  } catch (error) {}
}
