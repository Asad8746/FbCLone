import Api from "../Api/localhost";
import { getToken } from "../utils/tokenUtils";
import history from "../history";

const getAllBlockedUsers = () => {
  return async (dispatch) => {
    try {
      const response = await Api.get("/block/users", {
        headers: { "x-auth-token": getToken() },
      });
      dispatch({
        type: "BLOCKED_USERS",
        payload: response.data,
      });
    } catch (err) {
      console.log(err.response.data);
    }
  };
};
const checkBlocked = (id) => {
  return async (dispatch) => {
    try {
      const response = await Api.get(`/block/check/${id}`, {
        headers: { "x-auth-token": getToken() },
      });
      if (response.status === 200) {
        dispatch({
          type: "CHECK_IS_BLOCKED",
          payload: {
            blockedStatus: false,
            blockLoader: false,
          },
        });
      }
    } catch (err) {
      console.log(err.response.data);
      dispatch({
        type: "CHECK_IS_BLOCKED",
        payload: {
          blockedStatus: true,
          blockLoader: false,
          ...err.response.data,
        },
      });
    }
  };
};

const blockUser = (id) => {
  return async (dispatch) => {
    try {
      const response = await Api.put(
        `/block/${id}`,
        {},
        { headers: { "x-auth-token": getToken() } }
      );
      if (response.status === 200) {
        history.push("/");
        return dispatch({
          type: "CHECK_IS_BLOCKED",
          payload: {
            blockedStatus: false,
            blockLoader: false,
          },
        });
      }
    } catch (err) {
      console.log(err.response.data);
    }
  };
};

const unBlockUser = (id) => {
  return async (dispatch) => {
    try {
      const response = await Api.put(
        `/unblock/${id}`,
        {},
        { headers: { "x-auth-token": getToken() } }
      );
      if (response.status === 200) {
        return dispatch({
          type: "BLOCKED_USERS",
          payload: response.data,
        });
      }
    } catch (err) {
      console.log(err.response.data);
    }
  };
};

export const blockActions = {
  checkBlocked,
  blockUser,
  getAllBlockedUsers,
  unBlockUser,
};
