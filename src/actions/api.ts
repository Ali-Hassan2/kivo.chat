const BASE_URL = process.env.BACKEND_URL

const API_ENDPOINTS = {
  confirmUniqueUsername: `${BASE_URL}/api/member/isusernameunique`,
  getUserRegister: `${BASE_URL}/api/memeber/signup`,
}

export { API_ENDPOINTS }
