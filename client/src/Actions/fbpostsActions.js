import history from "../history";
import Api from "../Api";
import { postTypes } from "../Reducers/constants";
export const deletePost = (id) => {
  return async (dispatch) => {
    try {
      const response = await Api.delete(`/posts/${id}`);
      if (response.status === 200)
        return dispatch({ type: postTypes.deletePost, payload: response.data });
    } catch (err) {
      console.log(err.message);
    }
  };
};

export const getPosts = ({
  id,
  getHome,
  type,
  pageSize,
  pageNumber,
  setHasMore,
}) => {
  return async (dispatch, getState) => {
    try {
      const posts = getState().Posts.data;
      let fetchUrl = getHome
        ? `/home?pageNumber=${pageNumber}`
        : `/posts/${id}?type=${type}&pageNumber=${pageNumber}`;
      const response = await Api.get(fetchUrl);
      if (response.data.posts.length === 0) {
        setHasMore(false);
      }
      if (Object.keys(posts).length > 0) {
        dispatch({
          type: postTypes.setMorePosts,
          payload: response.data,
        });
      } else {
        dispatch({ type: postTypes.setPosts, payload: response.data });
      }
      return dispatch({ type: postTypes.setLoading, payload: false });
    } catch (err) {
      console.log(err.message);
    }
  };
};

export const getPost = (id) => {
  return async (dispatch) => {
    try {
      const response = await Api.get(`/posts/post/${id}`);

      dispatch({ type: postTypes.setPost, payload: response.data });
    } catch (Err) {
      console.log(Err.message);
    }
  };
};

export const updatePost = (description, id) => {
  return async (dispatch) => {
    try {
      const response = await Api.put(`http://localhost:5000/posts/post/${id}`, {
        description,
      });
      if (response.status === 200) {
        return history.goBack();
      }
    } catch (err) {
      console.log(err.response.data);
    }
  };
};

export const likePost = async (id, setState) => {
  try {
    const response = await Api.put(`/posts/like/${id}`);
    if (response.status === 200) {
      setState(true, response.data.likes);
    }
  } catch (err) {
    console.log(err.response.data);
  }
};
export const checkLike = async (post_id, setState) => {
  try {
    const response = await Api.get(`/posts/${post_id}/check/like`);
    if (response.data) {
      return setState(true);
    }
    return setState(false);
  } catch (err) {
    console.log(err.response.data);
  }
};

export const disLikePost = async (id, cb) => {
  try {
    const response = await Api.put(`/posts/dislike/${id}`);
    cb(false, response.data.likes);
  } catch (err) {
    console.log(err.response.data);
  }
};
export const createPost = (post, file, urlToPost, cb = () => {}) => {
  return async (dispatch) => {
    try {
      let formData = new FormData();
      if (file) {
        formData.append("file", file);
      }
      formData.append("description", post.value);
      let response = await Api.post(urlToPost, formData);
      if (response.status === 200) {
        cb("");
        dispatch({ type: postTypes.createPost, payload: response.data });
      }
    } catch (err) {
      cb(err.response.message);
    }
  };
};
