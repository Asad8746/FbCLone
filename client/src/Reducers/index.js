import { combineReducers } from "redux";
import authReducer from "./auth";
import profileReducer from "./profileReducer";
import postReducer from "./getPost";
import getPeople from "./getPeople";
import isFollower from "./isFollower";
import whatToShow from "./whatToShow";
import imageUpdated from "./imageUpdated";
import getPosts from "./getPosts";
import checkUser from "./checkUser";
import imageReducer from "./setImage";
import uploadProgress from "./uploadProgress";
import errorReducer from "./setError";
import blockedUserReducer from "./blockedUser";
import pagesReducer from "./pages";
import { reducer as FormReducer } from "redux-form";

export default combineReducers({
  Authentication: authReducer,
  form: FormReducer,
  Profile: profileReducer,
  post: postReducer,
  peopleList: getPeople,
  isFollower,
  display: whatToShow,
  imageUpdated,
  Posts: getPosts,
  isUser: checkUser,
  image: imageReducer,
  uploadProgress,
  error: errorReducer,
  pages: pagesReducer,
  blocked: blockedUserReducer,
});
