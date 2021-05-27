import { postTypes } from "./constants";
import _ from "lodash";

const tranformPosts = (initialPosts) => {
  const posts = {};
  initialPosts.forEach((item) => {
    return (posts[item._id] = item);
  });
  return posts;
};
const INITIAL_STATE = {
  data: {},
  loading: true,
  post: {},
};
export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case postTypes.reset:
      return {
        ...INITIAL_STATE,
      };
    case postTypes.setPost:
      return {
        ...state,
        post: action.payload,
      };
    case postTypes.setLoading:
      return {
        ...state,
        loading: action.payload,
      };
    case postTypes.setPosts:
      return {
        ...state,
        data: { ...tranformPosts(action.payload.posts) },
      };
    case postTypes.setMorePosts:
      const newPosts = tranformPosts(action.payload.posts);
      return {
        ...state,
        data: { ...state.data, ...newPosts },
      };
    case postTypes.createPost:
      const { _id: id } = action.payload;
      return { ...state, data: { [id]: action.payload, ...state.data } };
    case postTypes.updatePost:
      const { _id } = action.payload;
      return { ...state, data: { [_id]: action.payload } };
    case postTypes.incPostComments:
      return {
        ...state,
        data: {
          ...state.data,
          [action.payload]: {
            ...state.data[action.payload],
            comments: state.data[action.payload].comments + 1,
          },
        },
      };
    case postTypes.decPostComments:
      return {
        ...state,
        data: {
          ...state.data,
          [action.payload]: {
            ...state.data[action.payload],
            comments: state.data[action.payload].comments - 1,
          },
        },
      };
    case postTypes.deletePost:
      return { ...state, data: _.omit(state.data, [action.payload]) };
    default:
      return state;
  }
};
