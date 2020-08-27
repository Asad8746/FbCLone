import _ from "lodash";

export default (state = {}, action) => {
  switch (action.type) {
    case "GET_POSTS":
      let posts = {};
      action.payload.map((item) => {
        return (posts[item._id] = item);
      });
      return posts;
    case "CREATE_POST":
      const { _id: id } = action.payload;
      return { [id]: action.payload, ...state };
    case "UPDATE_POST":
      const { _id } = action.payload;
      return { ...state, [_id]: action.payload };
    case "COMMENT_ON_POST":
      return { ...state, [action.payload._id]: action.payload };
    case "LIKE_POST":
      return { ...state, [action.payload._id]: action.payload };
    case "DISLIKE_POST":
      return { ...state, [action.payload._id]: action.payload };
    case "DELETE_POST":
      return _.omit(state, [action.payload]);
    default:
      return state;
  }
};
