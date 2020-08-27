const INITIALSTATE = {
  isAuthenticated: false,
  isLoading: true,
  id: "",
  f_name: "",
  l_name: "",
};
export default (state = INITIALSTATE, action) => {
  switch (action.type) {
    case "REGISTER":
      return { ...state, ...action.payload };
    case "LOGIN_USER":
      return { ...state, ...action.payload };
    case "LOGOUT":
      return { ...state, ...action.payload };
    case "CHECK":
      return { ...state, ...action.payload };
    default:
      return state;
  }
};
