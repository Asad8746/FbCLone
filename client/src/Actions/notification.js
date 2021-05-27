import Api from "../Api";
export const incNotiCount = () => {
  return { type: "INC_COUNT" };
};
export const setNotiCount = (value) => {
  return { type: "SET_COUNT", payload: value };
};

export const getUnseenNotiCount = () => {
  return async (dispatch) => {
    try {
      const response = await Api.get("/notification/unseen");
      if (response.status === 200) {
        dispatch({ type: "SET_COUNT", payload: response.data.unSeenNotiCount });
      }
    } catch (err) {
      if (err && err.response) {
        console.log(err.response.data);
      }
    }
  };
};

export const getNotiList = (pageNumber, setHasMore) => {
  return async (dispatch, getState) => {
    try {
      const response = await Api.get(`/notification?pageNumber=${pageNumber}`);
      const notifications = getState().notification.list;
      if (notifications.length > 0) {
        return dispatch({
          type: "GET_MORE_NOTIFICATIONS",
          payload: response.data,
        });
      }
      dispatch({ type: "GET_NOTIFICATIONS", payload: response.data });
    } catch (err) {
      console.log(err.response.data);
    }
  };
};

export const getMoreNotiList = (pageNumber, cb = () => {}) => {
  return async (dispatch) => {
    try {
      const response = await Api.get(`/notification?pageNumber=${pageNumber}`);
      console.log(response.data);
      dispatch({ type: "GET_MORE_NOTIFICATIONS", payload: response.data });
      cb(false);
    } catch (err) {
      console.log(err);
    }
  };
};
