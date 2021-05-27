import { pageTypes } from "./constants";

const INITIAL_STATE = {
  pagesList: [],
  page: null,
  loading: true,
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case pageTypes.getPages:
      return { ...state, pagesList: action.payload, loading: false };
    case pageTypes.getMorePages:
      return { ...state, pagesList: [...state.pagesList, ...action.payload] };
    case pageTypes.getPage:
      return { ...state, page: action.payload };
    case pageTypes.modifyPage:
      return { ...state, page: { ...state.page, ...action.payload } };
    case pageTypes.updatePageLikes:
      return { ...state, page: { ...state.page, ...action.payload } };
    case pageTypes.reset:
      return { ...INITIAL_STATE };
    case pageTypes.resetPages:
      return { ...state, pagesList: [] };
    case pageTypes.setLoading:
      return { ...state, loading: action.payload };
    default:
      return state;
  }
};
