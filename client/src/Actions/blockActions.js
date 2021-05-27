import Api from "../Api";
import history from "../history";
import { blockTypes } from "../Reducers/constants";
export const getAllBlockedUsers = () => {
  return async (dispatch) => {
    try {
      const response = await Api.get("/block/users");
      dispatch({
        type: blockTypes.setBlockedUsers,
        payload: response.data,
      });

      dispatch({
        type: blockTypes.setLoading,
        payload: false,
      });
    } catch (err) {
      console.log(err.response.data);
      dispatch({
        type: blockTypes.setLoading,
        payload: false,
      });
    }
  };
};
export const checkBlocked = (id) => {
  return async (dispatch) => {
    try {
      const response = await Api.get(`/block/check/${id}`);
      if (response.status === 200) {
        const { isBlocked, message } = response.data;
        dispatch({
          type: blockTypes.setBlockStatus,
          payload: isBlocked,
        });

        dispatch({ type: blockTypes.setMessage, payload: message });
        dispatch({
          type: blockTypes.setLoading,
          payload: false,
        });
      }
    } catch (err) {
      console.log(err.response.data);
      dispatch({
        type: blockTypes.setLoading,
        payload: false,
      });
    }
  };
};

export const blockUser = (id) => {
  return async (dispatch) => {
    try {
      const response = await Api.put(`/block/${id}`);
      if (response.status === 200) {
        history.push("/");
        return dispatch({
          type: blockTypes.setBlockStatus,
          payload: false,
        });
      }
    } catch (err) {
      console.log(err.response.data);
    }
  };
};

export const unBlockUser = (id) => {
  return async (dispatch) => {
    try {
      const response = await Api.put(`/unblock/${id}`);
      if (response.status === 200) {
        return dispatch({
          type: blockTypes.setBlockedUsers,
          payload: response.data,
        });
      }
    } catch (err) {
      console.log(err.response.data);
    }
  };
};

// export const blockActions = {
//   checkBlocked,
//   blockUser,
//   getAllBlockedUsers,
//   unBlockUser,
// };
