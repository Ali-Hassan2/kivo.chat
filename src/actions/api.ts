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
  unfriendSomeoneOverallNetwork: '/api/friends/unfriend',
  getAllBlocks: '/api/block/get-all-blocks',
  blockSomeone: '/api/block/block-someone',
  unBlockSomeOneOverallNetwork: '/api/block/unblock',
  sendMessageToYourFriendsOnOverallNetwork: '/api/messages/sendmessage',
  changeModeToToggleTheAcceptingMessagesOverallNetwork:
    '/api/is-accepting-messages/mode/toggle',
  changeModeToToggleTheShowingIdentity:
    '/api/is-showing-identity/mode/toggle-radio',
  getCurrentModeForGettingStatusIsAcceptingMessages:
    '/api/is-accepting-messages/mode/check',
  getCurrentStatuForShowingIdentity:
    '/api/is-showing-identity/mode/check-radio',
  getProfileCount: '/api/Identity-profile/get-profile-count',
  createNewProfileFake: '/api/Identity-profile/new-profile',
  getAllAnonProfilesForOverallNetwork:
    '/api/Identity-profile/get-all-anon-profiles',
  getAllConversationsAtInitialLoadForContacts:
    '/api/messages/load/conversations',
  getAllMessagesFromConversations:
    '/api/messages/load/messages-in-conversations',
  getUserByUsernameAndReceiverIdFriendsCount:
    '/api/release/get-user-with-username',
}

export { API_ENDPOINTS }
