import history from "../history";
import Api from "../Api";
import { removeToken } from "../utils/tokenUtils";
import { AuthTypes, imageTypes, profileTypes } from "../Reducers/constants";
export const getProfile = () => {
  return async (dispatch) => {
    try {
      const response = await Api.get("/profile/");
      dispatch({
        type: profileTypes.getProfile,
        payload: { ...response.data },
      });
      dispatch({ type: profileTypes.setLoading, payload: false });
    } catch (err) {
      if (err.response) {
        dispatch({
          type: profileTypes.error,
          payload: err.response.data,
        });
      }
    }
  };
};

export const getProfileById = (id) => {
  return async (dispatch) => {
    try {
      const response = await Api.get(`/profile/${id}`);
      dispatch({ type: profileTypes.getProfile, payload: response.data });
      dispatch({ type: profileTypes.setLoading, payload: false });
    } catch (err) {
      if (err.response) {
        dispatch({
          type: profileTypes.error,
          payload: err.response.data,
        });
      }
    }
  };
};

export const followProfile = async (id, callback) => {
  try {
    const response = await Api.put(`/profile/follow/${id}`);
    if (response.status === 200) {
      callback(true);
    }
  } catch (err) {
    console.log(err.message);
  }
};

export const unfollowProfile = async (id, callback) => {
  try {
    const response = await Api.put(`/profile/unfollow/${id}`);
    if (response.status === 200) {
      callback(false);
    }
  } catch (err) {
    console.log(err.message);
  }
};
export const checkFollower = async (id, callback) => {
  try {
    const response = await Api.get(`/profile/checkfollower/${id}`);
    if (response.status === 200) {
      callback(response.data);
    }
  } catch (err) {
    console.log(err.message);
  }
};

export const getFollowers = (id) => {
  return async (dispatch) => {
    try {
      const response = await Api.get(`/profile/${id}/followers`);
      dispatch({ type: profileTypes.getFollowers, payload: response.data });
    } catch (err) {
      console.log(err.response.data);
    }
  };
};

export const getFollowing = (id) => {
  return async (dispatch) => {
    try {
      const response = await Api.get(`/profile/${id}/following`);
      dispatch({ type: profileTypes.getFollowing, payload: response.data });
    } catch (err) {
      console.log(err.response.data);
    }
  };
};

export const uploadPhoto = (file, link, cb) => {
  return async (dispatch) => {
    try {
      const formData = new FormData();
      formData.append("file", file);

      const response = await Api.put(link, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      if (response.status === 201) {
        dispatch({ type: imageTypes.setImage, payload: null });
        cb();
        return history.goBack();
      }
    } catch (err) {
      console.log(err.message);
      cb();
    }
  };
};

export const updateProfile = (formValues) => {
  return async (dispatch) => {
    try {
      const response = await Api.put("/profile/edit", formValues);
      if (response.status === 200) {
        return history.push(`/profile/${response.data}`);
      }
    } catch (err) {
      console.log(err);
      console.log("something got wrong");
    }
  };
};

export const deleteProfile = (confirmPassword) => {
  return async (dispatch) => {
    try {
      await Api.post("/profile/delete", {
        confirmPassword,
      });
      removeToken();
      dispatch({ type: AuthTypes.reset });
      dispatch({ type: profileTypes.reset });
      dispatch({ type: AuthTypes.setLoading, payload: false });
      return history.push("/");
    } catch (err) {
      console.log(err.response.data);
    }
  };
};
