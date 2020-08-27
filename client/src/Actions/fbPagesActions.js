import history from "../history";
import Api from "../Api/localhost";
import { getToken } from "../utils/tokenUtils";

// A Action creater which will get Pages from server based on url which can be /liked or /my
const getPages = (url) => {
  return async (dispatch) => {
    try {
      const response = await Api.get(`/pages/${url}`, {
        headers: { "x-auth-token": getToken() },
      });
      dispatch({ type: "GET_PAGES", payload: { pagesList: response.data } });
    } catch (err) {
      console.log(err.response.data);
    }
  };
};

//Action Create to create a new page
const createPage = (formValues) => {
  return async (dispatch, getState) => {
    try {
      let formData = new FormData();
      formData.append("name", formValues.name);
      formData.append("description", formValues.description);
      if (getState().image) {
        formData.append("file", getState().image);
      }
      const response = await Api.post("/pages/", formData, {
        headers: { "x-auth-token": getToken() },
      });
      if (response.status === 201) {
        dispatch({ type: "SET_IMAGE", payload: null });
        return history.push("/pages");
      }
    } catch (err) {
      console.log(err.message);
    }
  };
};

//Action creator to get a page

const getPage = (id) => {
  return async (dispatch) => {
    try {
      const response = await Api.get(`/pages/${id}`, {
        headers: { "x-auth-token": getToken() },
      });
      if (response.status === 200) {
        dispatch({ type: "GET_PAGE", payload: response.data });
      }
    } catch (err) {
      console.log(err.response.data);
    }
  };
};

// Action creator to get all posts for a page

const getAllPostForPage = (id) => {
  return async (dispatch) => {
    try {
      const response = await Api.get(`/pages/${id}/posts`, {
        headers: { "x-auth-token": getToken() },
      });
      console.log(response.data);
      dispatch({ type: "GET_POSTS", payload: response.data });
    } catch (err) {
      console.log(err.message);
    }
  };
};

const deletePagePost = (page_id, post_id) => {
  return async (dispatch) => {
    console.log(page_id);

    try {
      const response = await Api.delete(`/pages/${page_id}/post/${post_id}`, {
        headers: { "x-auth-token": getToken() },
      });
      if (response.status === 200) {
        console.log(response.data);
        return dispatch({ type: "DELETE_POST", payload: response.data });
      }
    } catch (err) {
      console.log(err.response.data);
    }
  };
};

// Action creator that will allow user to like a page
const likePage = (id, setState) => {
  return async (dispatch) => {
    console.log(id);
    try {
      const response = await Api.put(
        `/pages/like/${id}`,
        {},
        { headers: { "x-auth-token": getToken() } }
      );
      setState(true);

      return dispatch({
        type: "UPDATE_PAGE_LIKES",
        payload: { likes: response.data },
      });
    } catch (err) {
      console.log(err.response.data);
    }
  };
};

const checkIsLiked = async (id, setState) => {
  try {
    const response = await Api.get(`/pages/isLiked/${id}`, {
      headers: { "x-auth-token": getToken() },
    });
    if (response.status === 200) {
      setState(true);
    }
  } catch (err) {
    setState(false);
  }
};

const disLikePage = (id, setState) => {
  return async (dispatch) => {
    try {
      const response = await Api.put(
        `/pages/dislike/${id}`,
        {},
        {
          headers: { "x-auth-token": getToken() },
        }
      );
      setState(false);
      return dispatch({
        type: "UPDATE_PAGE_LIKES",
        payload: { likes: response.data },
      });
    } catch (err) {
      console.log(err.message);
    }
  };
};

const deletePage = (id) => {
  return async (dispatch) => {
    try {
      const response = await Api.delete(`/pages/${id}`, {
        headers: { "x-auth-token": getToken() },
      });
      if (response.status === 200) {
        history.push("/pages");
        return dispatch({ type: "GET_PAGE", payload: null });
      }
    } catch (err) {
      console.log(err.message);
    }
  };
};

const updatePage = async (id, formValues) => {
  try {
    const response = await Api.patch(
      `/pages/${id}`,
      {
        ...formValues,
      },
      {
        headers: { "x-auth-token": getToken() },
      }
    );
    if (response.status === 200) {
      return history.push(`/pages/${id}`);
    }
  } catch (err) {
    console.log(err.response.data);
  }
};

export const fbPagesActions = {
  getPages,
  getPage,
  updatePage,
  deletePage,
  disLikePage,
  checkIsLiked,
  likePage,
  deletePagePost,
  getAllPostForPage,
  createPage,
};
