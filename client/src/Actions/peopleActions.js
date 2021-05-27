import Api from "../Api";
import { peopleTypes } from "../Reducers/constants";
export const getPeople = () => {
  return async (dispatch) => {
    try {
      const response = await Api.get("/people");
      if (response.status === 200) {
        dispatch({ type: peopleTypes.SET_PEOPLE, payload: response.data });
        dispatch({ type: peopleTypes.setLoading, payload: false });
      }
    } catch (err) {
      console.log(err.message);
    }
  };
};

export const getNewsFeed = (pageNumber, pageSize) => {
  return async (dispatch) => {
    try {
      const response = await Api.get(
        `/home?pageSize=${pageSize}&pageNumber=${pageNumber}`
      );
      return dispatch({ type: "GET_POSTS", payload: response.data });
    } catch (err) {
      console.log(err.message);
    }
  };
};

// export const peopleActions = {
//   getNewsFeed,
//   getPeople,
// };
