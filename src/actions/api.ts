const BASE_URL = process.env.BACKEND_URL

const API_ENDPOINTS = {
  confirmUniqueUsername: `/api/member/isusernameunique`,
  getUserRegister: `/api/member/signup`,
  verifyUserCode: `/api/member/verifycode`,
  networkUsers: `/api/release/get-all-users`,
  makeANetowrkRequest: '/api/request/ro/createrequest',
  getNetworkCount: '/api/release/get-user-network-count',
  getAllRequestStatuses: '/api/release/get-all-requests-status',
  cancelRequestWhichIsInPendingState: '/api/request/ro/cancelrequest',
  getAllRequestsToMe: '/api/request/rs/tomerequests',
  acceptPendingRequestOnNetwork: '/api/request/ro/acceptrequest',
  rejectPendingRequestOnNetwork: '/api/request/ro/rejectrequest',
  getAllFriendsForNetwork: '/api/friends/myfriends',
}

export { API_ENDPOINTS }
