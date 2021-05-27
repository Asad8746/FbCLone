import history from "../history";
import Api from "../Api";
import { setToken, removeToken } from "../utils/tokenUtils";
import { AuthTypes, checkTypes } from "../Reducers/constants";

export const checkIsUser = (authentication_id, id) => {
  if (authentication_id === id) {
    return { type: checkTypes.checkUser, payload: true };
  } else {
    return { type: checkTypes.checkUser, payload: false };
  }
};

export const checkToken = (cb) => {
  return async (dispatch) => {
    try {
      const response = await Api.get("/profile/checktoken");
      if (response.status === 200) {
        dispatch({
          type: AuthTypes.SET_AUTH,
          payload: {
            isAuthenticated: true,
          },
        });
        dispatch({
          type: AuthTypes.SET_USER,
          payload: {
            id: response.data.id,
            f_name: response.data.f_name,
            l_name: response.data.l_name,
          },
        });
        dispatch({ type: AuthTypes.setLoading, payload: false });
        cb();
      }
    } catch (err) {
      removeToken();
      dispatch({
        type: AuthTypes.setLoading,
        payload: false,
      });
    }
  };
};

export const LoginUser = ({ email, password }, cb) => {
  return async (dispatch) => {
    try {
      const response = await Api.post("/user/auth", { email, password });

      if (response.status === 200) {
        const { id, f_name, l_name } = response.data;
        setToken(response.headers);
        dispatch({
          type: AuthTypes.SET_AUTH,
          payload: {
            isAuthenticated: true,
          },
        });
        dispatch({
          type: AuthTypes.SET_USER,
          payload: {
            id,
            f_name,
            l_name,
          },
        });
        cb();
        history.push(`/profile/${id}`);
      }
    } catch (err) {
      dispatch({ type: "SET_ERROR_MESSAGE", payload: err.response.data });
      cb();
    }
  };
};

export const registerUser = (formValues, cb) => {
  return async (dispatch) => {
    try {
      const response = await Api.post("/user/register", {
        ...formValues,
      });
      if (response.status === 200) {
        const { id } = response.data;
        setToken(response.headers);
        dispatch({
          type: AuthTypes.SET_AUTH,
          payload: {
            isAuthenticated: true,
          },
        });
        dispatch({
          type: AuthTypes.SET_USER,
          payload: {
            id: response.data.id,
            f_name: response.data.f_name,
            l_name: response.data.l_name,
          },
        });

        // dispatch({ type: AuthTypes.setLoading, payload: false });
        cb();
        history.push(`/profile/${id}`);
      }
    } catch (err) {
      dispatch({ type: "SET_ERROR_MESSAGE", payload: err.response.data });
      cb();
    }
  };
};

export const logoutUser = () => {
  removeToken();
  history.push("/");
  return { type: AuthTypes.SET_AUTH, payload: false };
};

// export const authActions = {
//   LoginUser,
//   logout,
//   registerUser,
//   checkToken,
//   checkIsUser,
// };
