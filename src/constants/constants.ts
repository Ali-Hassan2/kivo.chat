const REQUEST_STATUS = Object.freeze({
  PENDING: 'pending',
  APPROVED: 'friends',
  REJECTED: 'rejected',
} as const)

enum PIN_ACTIONS {
  PIN = 'PIN',
  UNPIN = 'UNPIN',
}

const QUERY_PARAMS = {
  USERNAME: 'username',
  DEFAULT: 'guest',
}

const USERNAME_UNIQUENESS_SUCCESS = 'Username is available.'

const MAX_AGE = 30 * 24 * 60 * 60

const CHAT_ENGINE = process.env.CHAT_ENGINE || 'http://localhost:8001'

const SEARCH_NOT_FOUND_MESSAGE = 'No Result Found.'

const EXCLUDED_LAYOUT_PAGES = ['/signup', '/signin', '/not_found']

export {
  REQUEST_STATUS,
  CHAT_ENGINE,
  PIN_ACTIONS,
  MAX_AGE,
  USERNAME_UNIQUENESS_SUCCESS,
  QUERY_PARAMS,
  SEARCH_NOT_FOUND_MESSAGE,
}
