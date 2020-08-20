const initial_State = {
  blockedStatus: false,
  blockLoader: true,
  message: null,
  userIsBlocked: null,
  blockedByUser: null,
  blockedUsers: [],
};
export default (state = initial_State, action) => {
  switch (action.type) {
    case "CHECK_IS_BLOCKED":
      return { ...state, ...action.payload };
    case "BLOCKED_USERS":
      return { ...state, ...{ blockedUsers: action.payload } };
    default:
      return state;
  }
};
