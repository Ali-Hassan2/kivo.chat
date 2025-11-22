const REQUEST_STATUS = Object.freeze({
  PENDING: 'pending',
  APPROVED: 'approved',
  REJECTED: 'rejected',
} as const)

const CHAT_ENGINE = process.env.CHAT_ENGINE || 'http://localhost:8001'
export { REQUEST_STATUS, CHAT_ENGINE }
