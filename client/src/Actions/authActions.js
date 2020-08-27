import history from "../history";
import Api from "../Api/localhost";
import { getToken, setToken, removeToken } from "../utils/tokenUtils";

const checkIsUser = (authentication_id, id) => {
  if (authentication_id === id) {
    return { type: "CHECK_USER", payload: true };
  } else {
    return { type: "CHECK_USER", payload: false };
  }
};

const checkToken = () => {
  return async (dispatch) => {
    try {
      const response = await Api.get("/profile/checktoken", {
        headers: { "x-auth-token": getToken() },
      });
      if (response.status === 200) {
        dispatch({
          type: "CHECK",
          payload: {
            isAuthenticated: true,
            isLoading: false,
            id: response.data.id,
            f_name: response.data.f_name,
            l_name: response.data.l_name,
          },
        });
      }
    } catch (err) {
      removeToken();
      dispatch({
        type: "CHECK",
        payload: {
          isAuthenticated: false,
          isLoading: false,
          id: "",
          f_name: "",
          l_name: "",
        },
      });
    }
  };
};

const LoginUser = ({ email, password }) => {
  return async (dispatch) => {
    try {
      const response = await Api.post("/user/auth", { email, password });
      if (response.status === 200) {
        const { id } = response.data;
        setToken(response.headers);
        dispatch({
          type: "LOGIN_USER",
          payload: { isAuthenticated: true, id },
        });
        history.push(`/profile/${id}`);
      }
    } catch (err) {
      dispatch({ type: "SET_ERROR_MESSAGE", payload: err.response.data });
    }
  };
};

const registerUser = (formValues) => {
  return async (dispatch) => {
    try {
      const response = await Api.post("/user/register", {
        ...formValues,
      });
      if (response.status === 200) {
        const { id } = response.data;
        setToken(response.headers);
        dispatch({ type: "REGISTER", payload: { isAuthenticated: true, id } });
        history.push(`/profile/${id}`);
      }
    } catch (err) {
      dispatch({ type: "SET_ERROR_MESSAGE", payload: err.response.data });
    }
  };
};

const logout = () => {
  removeToken();
  history.push("/");
  return { type: "LOGOUT", payload: { isAuthenticated: false } };
};

export const authActions = {
  LoginUser,
  logout,
  registerUser,
  checkToken,
  checkIsUser,
};
