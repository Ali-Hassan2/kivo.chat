const BASE_URL = process.env.BACKEND_URL

const API_ENDPOINTS = {
  confirmUniqueUsername: `/api/member/isusernameunique`,
  getUserRegister: `/api/member/signup`,
  verifyUserCode: `/api/member/verifycode`,
  networkUsers: `/api/release/get-all-users`,
  makeANetowrkRequest: '/api/request/ro/createrequest',
}

export { API_ENDPOINTS }
