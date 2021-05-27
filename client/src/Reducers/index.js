import { combineReducers } from "redux";
import authReducer from "./auth";
import profileReducer from "./profileReducer";
import People from "./people";
import Posts from "./Posts";
import checkUser from "./checkUser";
import image from "./Image";
import errorReducer from "./setError";
import blockedUserReducer from "./blockedUser";
import pagesReducer from "./pages";
import groupReducer from "./groupReducer";
import { reducer as FormReducer } from "redux-form";
import notificationReducer from "./notification";
import pagination from "./pagination";

export default combineReducers({
  Authentication: authReducer,
  form: FormReducer,
  profileReducer,
  People,
  Posts,
  isUser: checkUser,
  image,
  error: errorReducer,
  pages: pagesReducer,
  group: groupReducer,
  blocked: blockedUserReducer,
  notification: notificationReducer,
  pagination,
});
