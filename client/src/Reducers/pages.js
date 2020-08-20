const INITIAL_STATE = {
  pagesList: null,
  page: null,
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case "GET_PAGES":
      return { ...state, ...action.payload };
    case "GET_PAGE":
      return { ...state, page: action.payload };
    case "MODIFY_PAGE":
      return { ...state, page: { ...state.page, ...action.payload } };
    case "UPDATE_PAGE_LIKES":
      return { ...state, page: { ...state.page, ...action.payload } };
    default:
      return state;
  }
};
