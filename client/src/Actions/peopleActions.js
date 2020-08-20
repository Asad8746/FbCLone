import Api from "../Api/localhost";
import { getToken } from "../utils/tokenUtils";

const getPeople = (id) => {
  return async (dispatch) => {
    try {
      const response = await Api.get("/profile/people", {
        headers: { "x-auth-token": getToken(), id },
      });
      if (response.status === 200) {
        dispatch({ type: "FETCH_PEOPLE", payload: response.data });
      }
    } catch (err) {
      console.log(err.message);
    }
  };
};

const getNewsFeed = () => {
  return async (dispatch) => {
    try {
      const response = await Api.get("/home/", {
        headers: { "x-auth-token": getToken() },
      });
      return dispatch({ type: "GET_POSTS", payload: response.data });
    } catch (err) {
      console.log(err.message);
    }
  };
};

export const peopleActions = {
  getNewsFeed,
  getPeople,
};
