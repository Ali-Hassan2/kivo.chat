const BASE_URL = process.env.BACKEND_URL

const API_ENDPOINTS = {
  confirmUniqueUsername: `/api/member/isusernameunique`,
  getUserRegister: `/api/member/signup`,
}

export { API_ENDPOINTS }
