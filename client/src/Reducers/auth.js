import { AuthTypes } from "./constants";
const INITIALSTATE = {
  isAuthenticated: false,
  isLoading: true,
  id: "",
  f_name: "",
  l_name: "",
};
export default (state = INITIALSTATE, action) => {
  switch (action.type) {
    case AuthTypes.SET_AUTH:
      return { ...state, isAuthenticated: action.payload };
    case AuthTypes.SET_USER:
      const { id, f_name, l_name } = action.payload;
      return { ...state, id, f_name, l_name };
    case AuthTypes.reset:
      return { ...INITIALSTATE };
    case AuthTypes.setLoading:
      return { ...state, isLoading: action.payload };
    default:
      return state;
  }
};
