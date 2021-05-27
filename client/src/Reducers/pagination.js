import { paginationTypes } from "./constants";
const INITIAL_STATE = {
  pageNumber: 1,
  hasMore: true,
  pageLimit: 10,
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case paginationTypes.setPageNumber:
      return { ...state, pageNumber: action.payload };
    case paginationTypes.incPageNumber:
      return { ...state, pageNumber: state.pageNumber + 1 };
    case paginationTypes.hasMore:
      return { ...state, hasMore: action.payload };
    case paginationTypes.reset:
      return { ...INITIAL_STATE };
    default:
      return state;
  }
};
