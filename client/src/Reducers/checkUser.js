import { checkTypes } from "./constants";

export default (state = false, action) => {
  switch (action.type) {
    case checkTypes.checkUser:
      return action.payload;
    default:
      return state;
  }
};
