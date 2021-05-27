import Api from "../Api";
import { imageTypes } from "../Reducers/constants";

export * from "./authActions";
export * from "./fbPagesActions";
export * from "./profileActions";
export * from "./fbPagesActions";
export * from "./peopleActions";
export * from "./fbpostsActions";
export * from "./blockActions";
export * from "./commentActions";
export * from "./groupActions";
export * from "./notification";
export const whatToShow = (value) => {
  return (dispatch) => {
    dispatch({ type: "what_To_show", payload: value });
  };
};
export const setReducer = (configObj) => {
  return configObj;
};
export const eraseError = () => {
  return { type: "SET_ERROR_MESSAGE", payload: "" };
};
export const setError = (errMessage) => {
  return { type: "SET_ERROR_MESSAGE", payload: errMessage };
};

export const setImage = (file) => {
  return { type: imageTypes.setImage, payload: file };
};

export const updateUnSeenNoti = async (cb = () => {}) => {
  try {
    const response = await Api.put("/notification/seen");
    if (response.status === 200) {
      cb(true);
    }
  } catch (err) {
    cb(false);
  }
};
