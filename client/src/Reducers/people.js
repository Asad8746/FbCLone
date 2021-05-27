import { peopleTypes } from "./constants";

const INITIAL_STATE = {
  list: [],
  loading: true,
};
export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case peopleTypes.SET_PEOPLE:
      return { ...state, list: action.payload };
    case peopleTypes.reset:
      return { ...INITIAL_STATE };
    case peopleTypes.setLoading:
      return { ...state, loading: action.payload };
    default:
      return state;
  }
};
