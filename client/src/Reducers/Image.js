import { imageTypes } from "./constants";

export default (state = null, action) => {
  switch (action.type) {
    case imageTypes.setImage:
      return action.payload;
    default:
      return state;
  }
};
