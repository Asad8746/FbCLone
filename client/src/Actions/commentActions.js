import Api from "../Api";
import { commentTypes, postTypes } from "../Reducers/constants";
export const deleteComment = (id, comment_id, cb) => {
  return async (dispatch) => {
    try {
      const response = await Api.delete(`/posts/${id}/comment/${comment_id}`);

      cb(commentTypes.deleteComment, response.data.id);
      dispatch({ type: postTypes.decPostComments, payload: id });
    } catch (err) {
      console.log(err.response.data);
    }
  };
};

export const createComment = (id, comment, actionCreater) => {
  return async (dispatch) => {
    try {
      let response = await Api.put(`/posts/comment/${id}`, { comment });
      if (response.status === 200) {
        actionCreater(commentTypes.createComment, response.data);
        dispatch({ type: postTypes.incPostComments, payload: id });
      }
    } catch (err) {
      console.log(err.message);
    }
  };
};

export const getComments = async (id, pageNumber, setHasMore, cb) => {
  try {
    const response = await Api.get(
      `/posts/comment/${id}?pageNumber=${pageNumber}`
    );
    if (response.data.length === 0) {
      setHasMore(false);
    }
    cb(commentTypes.getComments, response.data);
  } catch (err) {
    console.log(err.message);
  }
};
