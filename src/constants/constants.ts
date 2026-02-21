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

const flagText1 = `When enabled, your identity is visible to people who interact
                with you. Others can see who you are while engaging with your
                profile.`

const flagText2 = `When disabled, your identity remains hidden. You can interact
                anonymously without revealing personal information.`

const accmText1 = `When enabled, anyone can send you messages. Your inbox is open.`

const accmText2 = `When disabled, your inbox is closed until re-enabled.`
export {
  REQUEST_STATUS,
  CHAT_ENGINE,
  PIN_ACTIONS,
  MAX_AGE,
  USERNAME_UNIQUENESS_SUCCESS,
  QUERY_PARAMS,
  SEARCH_NOT_FOUND_MESSAGE,
  accmText1,
  accmText2,
  flagText1,
  flagText2,
}
