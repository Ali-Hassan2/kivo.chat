const REQUEST_STATUS = Object.freeze({
  PENDING: 'pending',
  APPROVED: 'approved',
  REJECTED: 'rejected',
} as const)

enum PIN_ACTIONS {
  PIN = 'PIN',
  UNPIN = 'UNPIN',
}

const MAX_AGE = 30 * 24 * 60 * 60

const CHAT_ENGINE = process.env.CHAT_ENGINE || 'http://localhost:8001'

export { REQUEST_STATUS, CHAT_ENGINE, PIN_ACTIONS, MAX_AGE }
