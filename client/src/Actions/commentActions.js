import Api from "../Api/localhost";
import { getToken } from "../utils/tokenUtils";

const deleteComment = (id, commentId, actionCreater) => {
  return async (dispatch) => {
    try {
      const response = await Api.delete(`/posts/${id}/comment/${commentId}`, {
        headers: { "x-auth-token": getToken() },
      });

      const { commentList, post } = response.data;

      actionCreater(commentList);
      return dispatch({ type: "COMMENT_ON_POST", payload: post });
    } catch (err) {
      console.log(err.response.data);
    }
  };
};

const createComment = (id, comment, comments, actionCreater) => {
  return async (dispatch) => {
    try {
      const token = localStorage.getItem("token") || null;
      let response = await Api.put(
        `/posts/comment/${id}`,
        { comment },
        {
          headers: { "x-auth-token": token },
        }
      );
      if (response.status === 200) {
        const { commentList, post } = response.data;
        console.log("Create Comment", response.data);
        dispatch({ type: "COMMENT_ON_POST", payload: post });
        actionCreater(commentList);
      }
    } catch (err) {
      console.log(err.message);
    }
  };
};

const getComments = async (id, actionCreater) => {
  try {
    const response = await Api.get(`/posts/comment/${id}`, {
      headers: { "x-auth-token": getToken() },
    });
    if (response.status === 200) {
      return actionCreater(response.data);
    }
  } catch (err) {
    console.log(err.message);
  }
};

export const commentActions = {
  getComments,
  createComment,
  deleteComment,
};
