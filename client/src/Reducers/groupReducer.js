import { groupTypes } from "./constants";
const INITIALSTATE = {
  groups: [],
  loading: true,
  group: null,
  isMember: false,
  isPrivate: false,
  requests: null,
  members: null,
  isAdmin: false,
};

export default (state = INITIALSTATE, action) => {
  switch (action.type) {
    case groupTypes.getGroups:
      return { ...state, groups: action.payload, loading: false };
    case groupTypes.getMoreGroups:
      return { ...state, groups: [...state.groups, ...action.payload] };
    case groupTypes.resetGroups:
      return { ...INITIALSTATE };
    case groupTypes.getGroup:
      return { ...state, group: action.payload };
    case groupTypes.checkMember:
      return { ...state, isMember: action.payload };
    case groupTypes.updateRequest:
      return { ...state, requests: action.payload };
    case groupTypes.updateMembers:
      return { ...state, members: action.payload };
    case groupTypes.setAdmin:
      return { ...state, isAdmin: action.payload };
    case groupTypes.setLoading:
      return { ...state, loading: action.payload };
    default:
      return state;
  }
};
