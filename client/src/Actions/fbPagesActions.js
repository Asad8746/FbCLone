import history from "../history";
import Api from "../Api";
import { imageTypes, pageTypes, paginationTypes } from "../Reducers/constants";

// A Action creater which will get Pages from server based on url which can be /liked or /my
export const getPages = (type, pageNumber = 1) => {
  return async (dispatch, getState) => {
    try {
      const response = await Api.get(
        `/pages?type=${type}&pageNumber=${pageNumber}`
      );
      if (response.data.length === 0) {
        dispatch({ type: paginationTypes.hasMore, payload: false });
        dispatch({ type: pageTypes.setLoading, payload: false });
      }
      if (getState().pages.pagesList.length > 0) {
        dispatch({
          type: pageTypes.getMorePages,
          payload: response.data,
        });
        return;
      }
      dispatch({ type: pageTypes.getPages, payload: response.data });
    } catch (err) {
      console.log(err.message);
      // console.log(err.response.data);
    }
  };
};

//Action Create to create a new page
export const createPage = (formValues) => {
  return async (dispatch, getState) => {
    try {
      let formData = new FormData();
      formData.append("name", formValues.name);
      formData.append("description", formValues.description);
      if (getState().image) {
        formData.append("file", getState().image);
      }
      const response = await Api.post("/pages/", formData);
      if (response.status === 201) {
        dispatch({ type: imageTypes.setImage, payload: null });
        return history.push("/pages");
      }
    } catch (err) {
      console.log(err.message);
    }
  };
};

//Action creator to get a page

export const getPage = (id) => {
  return async (dispatch) => {
    try {
      const response = await Api.get(`/pages/${id}`);
      if (response.status === 200) {
        dispatch({ type: pageTypes.getPage, payload: response.data });
      }
    } catch (err) {
      console.log(err.response.data);
      dispatch({ type: pageTypes.setLoading, payload: false });
      history.push("/pages");
    }
  };
};

// Action creator that will allow user to like a page
export const likePage = (id, cb) => {
  return async (dispatch) => {
    try {
      const response = await Api.put(`/pages/like/${id}`);
      cb(true);
      return dispatch({
        type: pageTypes.updatePageLikes,
        payload: { likes: response.data },
      });
    } catch (err) {
      cb(null);
      console.log(err.response.data);
    }
  };
};

export const checkIsLiked = async (id, cb) => {
  try {
    const response = await Api.get(`/pages/isLiked/${id}`);
    cb(response.data);
  } catch (err) {
    console.log(err.response.data);
  }
};

export const disLikePage = (id, cb) => {
  return async (dispatch) => {
    try {
      const response = await Api.put(`/pages/dislike/${id}`);
      cb(false);
      return dispatch({
        type: pageTypes.updatePageLikes,
        payload: { likes: response.data },
      });
    } catch (err) {
      cb(null);
      console.log(err.message);
    }
  };
};

export const deletePage = (id) => {
  return async (dispatch) => {
    try {
      const response = await Api.delete(`/pages/${id}`);
      if (response.status === 200) {
        history.push("/pages");
        return dispatch({ type: pageTypes.getPage, payload: null });
      }
    } catch (err) {
      console.log(err.message);
    }
  };
};

export const updatePage = async (id, formValues) => {
  try {
    const response = await Api.patch(`/pages/${id}`, {
      ...formValues,
    });
    if (response.status === 200) {
      return history.push(`/pages/${id}`);
    }
  } catch (err) {
    console.log(err.response.data);
  }
};

export const resetPages = () => {
  return { type: pageTypes.reset };
};

// export const fbPagesActions = {
//   getPages,
//   getPage,
//   updatePage,
//   deletePage,
//   disLikePage,
//   checkIsLiked,
//   likePage,
//   deletePagePost,
//   getAllPostForPage,
//   createPage,
// };
