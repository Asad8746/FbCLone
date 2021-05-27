import { profileTypes } from "./constants";

const INITIAL_STATE = {
  profile: {},
  followers: null,
  following: null,
  error: "",
  loading: true,
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case profileTypes.getProfile:
      return { ...state, profile: action.payload };
    case profileTypes.setLoading:
      return { ...state, loading: action.payload };
    case profileTypes.reset:
      return { ...INITIAL_STATE };
    case profileTypes.error:
      return { ...state, error: action.payload };
    case profileTypes.getFollowers:
      return { ...state, followers: action.payload };
    case profileTypes.getFollowing:
      return { ...state, following: action.payload };
    case profileTypes.createPost:
      return { ...state, ...action.payload };
    case profileTypes.followUser:
      return {
        ...state,
        profile: {
          ...state.profile,
          followers: state.profile.followers + 1,
        },
      };
    case profileTypes.unfollow:
      return {
        ...state,
        profile: {
          ...state.profile,
          following: state.profile.following - 1,
        },
      };
    default:
      return state;
  }
};
