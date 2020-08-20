import history from "../history";
import Api from "../Api/localhost";
import { getToken, removeToken } from "../utils/tokenUtils";

const getProfile = () => {
  return async (dispatch) => {
    const response = await Api.get("/profile/", {
      headers: { "x-auth-token": getToken() },
    });
    if (response.status !== 200) {
      return history.push("/login");
    }
    return dispatch({ type: "GET_PROFILE", payload: { ...response.data } });
  };
};
// const getUserProfile = () => {
//   return async (dispatch) => {
//     try {
//       const response = await Api.get(`/profile`, {
//         headers: { "x-auth-token": getToken() },
//       });
//       if (response.status === 200) {
//         dispatch({ type: "GET_PROFILE_BY_ID", payload: response.data });
//       }
//     } catch (err) {
//       console.log(err);
//     }
//   };
// };

const getProfileById = (id) => {
  return async (dispatch) => {
    try {
      const response = await Api.get(`/profile/${id}`, {
        headers: { "x-auth-token": getToken() },
      });
      if (response.status === 200) {
        dispatch({ type: "GET_PROFILE_BY_ID", payload: response.data });
      }
    } catch (err) {
      console.log(err);
    }
  };
};

const followProfile = (id, callback) => {
  return async (dispatch) => {
    try {
      const response = await Api.put(
        `/follower/follow/${id}`,
        {},
        {
          headers: { "x-auth-token": getToken() },
        }
      );
      if (response.status === 200) {
        dispatch({ type: "FOLLOW_USER", payload: response.data });
        callback(true);
      }
    } catch (err) {
      console.log(err.message);
    }
  };
};

const unfollowProfile = (id, callback) => {
  return async (dispatch) => {
    try {
      const response = await Api.put(
        `/follower/unfollow/${id}`,
        {},
        {
          headers: { "x-auth-token": getToken() },
        }
      );
      if (response.status === 200) {
        dispatch({ type: "UNFOLLOW_USER", payload: response.data });
        callback(false);
      }
    } catch (err) {
      console.log(err.message);
    }
  };
};
export const checkFollower = async (id, callback) => {
  const response = await Api.get(`/follower/checkfollower/${id}`, {
    headers: { "x-auth-token": getToken() },
  });
  if (response.status === 200) {
    callback(response.data);
  }
};

const uploadPhoto = (file, link) => {
  return async (dispatch) => {
    try {
      const formData = new FormData();
      formData.append("file", file);

      const response = await Api.put(link, formData, {
        headers: {
          "x-auth-token": getToken(),
          "Content-Type": "multipart/form-data",
        },
      });
      if (response.status === 201) {
        dispatch({ type: "IMAGE_UPDATED", payload: true });
        return history.goBack();
      }
    } catch (err) {
      console.log(err.message);
    }
  };
};

const updateProfile = (formValues) => {
  return async (dispatch) => {
    try {
      const response = await Api.put("/profile/edit", formValues, {
        headers: { "x-auth-token": getToken() },
      });
      if (response.status === 200) {
        console.log(response.data);
        return history.push(`/profile/${response.data}`);
      }
    } catch (err) {
      console.log(err);
      console.log("something got wrong");
    }
  };
};

const deleteProfile = () => {
  return async (dispatch) => {
    try {
      const response = await Api.delete("/profile/delete", {
        headers: { "x-auth-token": getToken() },
      });
      if (response.status === 200) {
        removeToken();
        dispatch({
          type: "CHECK",
          payload: { isAuthenticated: false, isLoading: false, id: "" },
        });
        return history.push("/");
      }
    } catch (err) {
      console.log(err.response.data);
    }
  };
};

export const profileActions = {
  getProfile,
  getProfileById,
  followProfile,
  unfollowProfile,
  checkFollower,
  uploadPhoto,
  updateProfile,
  deleteProfile,
};
