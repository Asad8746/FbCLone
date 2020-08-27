const INITIAL_STATE = {
  profile: {},
  followers: null,
  following: null,
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case "GET_PROFILE":
      return { ...state, profile: action.payload };
    case "GET_PROFILE_BY_ID":
      return { ...state, profile: action.payload };
    case "GET_FOLLOWERS":
      return { ...state, followers: action.payload };
    case "GET_FOLLOWING":
      return { ...state, following: action.payload };
    case "CREATEPOST":
      return { ...state, ...action.payload };
    case "FOLLOW_USER":
      return {
        ...state,
        profile: {
          ...state.profile,
          followers: action.payload.followers,
          following: action.payload.following,
        },
      };
    case "UNFOLLOW_USER":
      return {
        ...state,
        profile: {
          ...state.profile,
          followers: action.payload.followers,
          following: action.payload.following,
        },
      };
    case "UNLIKE":
      return { ...state, ...action.payload };
    default:
      return state;
  }
};
