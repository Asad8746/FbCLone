const INITIALSTATE = {
  groups: null,
  group: null,
  isMember: null,
  isPrivate: false,
  requests: null,
  members: null,
};

export default (state = INITIALSTATE, action) => {
  switch (action.type) {
    case "GET_GROUPS":
      return { ...state, groups: action.payload };
    case "GET_GROUP":
      return { ...state, group: action.payload };
    case "CHECK_MEMBER":
      return { ...state, isMember: action.payload };
    case "UPDATE_REQUESTS":
      return { ...state, requests: action.payload };
    case "UPDATE_MEMBERS":
      return { ...state, members: action.payload };
    default:
      return state;
  }
};
