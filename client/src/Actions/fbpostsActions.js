import history from "../history";
import Api from "../Api/localhost";
import { getToken } from "../utils/tokenUtils";

const deletePost = (id) => {
  return async (dispatch) => {
    try {
      const response = await Api.delete(`/posts/${id}`, {
        headers: { "x-auth-token": getToken() },
      });
      if (response.status === 200)
        return dispatch({ type: "DELETE_POST", payload: response.data });
    } catch (err) {
      console.log(err.message);
    }
  };
};

const getPosts = (id) => {
  return async (dispatch) => {
    try {
      const response = await Api.get(`/posts/${id}`, {
        headers: { "x-auth-token": getToken() },
      });
      return dispatch({ type: "GET_POSTS", payload: response.data });
    } catch (err) {
      console.log(err.message);
    }
  };
};

const getPost = (id) => {
  return async (dispatch) => {
    try {
      const response = await Api.get(`/posts/post/${id}`, {
        headers: { "x-auth-token": getToken() },
      });

      dispatch({ type: "get_Post", payload: response.data });
    } catch (Err) {
      console.log(Err.message);
    }
  };
};

const updatePost = (description, url) => {
  return async (dispatch) => {
    try {
      const response = await Api.put(
        url,
        { description },
        {
          headers: { "x-auth-token": getToken() },
        }
      );
      if (response.status === 200) {
        return history.goBack();
      }
    } catch (err) {
      console.log(err.response.data);
    }
  };
};

const likePost = (id, setState) => {
  return async (dispatch) => {
    const response = await Api.put(
      `/posts/like/${id}`,
      {},
      {
        headers: { "x-auth-token": getToken() },
      }
    );
    if (response.status === 200) {
      dispatch({ type: "LIKE_POST", payload: response.data });
      setState(true);
    }
  };
};
const checkLike = async (post_id, setState) => {
  try {
    const response = await Api.get(`/posts/${post_id}/check/like`, {
      headers: { "x-auth-token": getToken() },
    });
    if (response.data) {
      return setState(true);
    }
    return setState(false);
  } catch (err) {
    console.log(err.response.data);
  }
};

const disLikePost = (id, setState) => {
  return async (dispatch) => {
    const response = await Api.put(
      `/posts/dislike/${id}`,
      {},
      {
        headers: { "x-auth-token": getToken() },
      }
    );
    dispatch({ type: "DISLIKE_POST", payload: response.data });
    setState(false);
  };
};
export const createPost = (post, file, urlToPost) => {
  return async (dispatch) => {
    let formData = new FormData();
    if (file) {
      formData.append("file", file);
    }

    formData.append("description", post.description);
    let response = await Api.post(urlToPost, formData, {
      headers: { "x-auth-token": getToken() },
    });
    if (response.status === 200) {
      dispatch({ type: "CREATE_POST", payload: response.data });
    }
  };
};

export const fbPostActions = {
  deletePost,
  getPost,
  getPosts,
  updatePost,
  likePost,
  disLikePost,
  createPost,
  checkLike,
};
