import { blockTypes } from "./constants";
const INITIAL_STATE = {
  blockedStatus: false,
  blockLoader: true,
  message: null,
  blockedUsers: [],
};
export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case blockTypes.setBlockedUsers:
      return { ...state, blockedUsers: action.payload };
    case blockTypes.setLoading:
      return { ...state, blockLoader: action.payload };
    case blockTypes.setBlockStatus:
      return { ...state, blockedStatus: action.payload };
    case blockTypes.setMessage:
      return { ...state, message: action.payload };
    case blockTypes.reset:
      return { ...INITIAL_STATE };
    case blockTypes.resetBlockState:
      return { ...state, blockedStatus: false, blockLoader: true };
    default:
      return state;
  }
};
