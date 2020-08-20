import { fbPostActions } from "./fbpostsActions";
import { profileActions } from "./profileActions";
import { fbPagesActions } from "./fbPagesActions";
import { peopleActions } from "./peopleActions";
import { blockActions } from "./blockActions";
import { authActions } from "./authActions";
import { commentActions } from "./commentActions";
const whatToShow = (value) => {
  return (dispatch) => {
    dispatch({ type: "what_To_show", payload: value });
  };
};
const setReducer = (configObj) => {
  return configObj;
};
const eraseError = () => {
  return { type: "SET_ERROR_MESSAGE", payload: "" };
};
const setError = (errMessage) => {
  return { type: "SET_ERROR_MESSAGE", payload: errMessage };
};

export const setImage = (file) => {
  return { type: "SET_IMAGE", payload: file };
};

export default {
  ...fbPostActions,
  ...profileActions,
  ...fbPagesActions,
  ...authActions,
  ...peopleActions,
  ...blockActions,
  ...commentActions,
  whatToShow,
  eraseError,
  setError,
  setImage,
  setReducer,
};
