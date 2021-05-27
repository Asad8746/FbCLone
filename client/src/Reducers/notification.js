const INITIAL_STATE = {
  count: 0,
  list: [],
  total: 0,
  loading: true,
};

const reducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case "INC_COUNT":
      return { ...state, count: state.count + 1 };
    case "RESET_NOTI":
      return { ...state, list: [] };
    case "SET_COUNT":
      return { ...state, count: action.payload };
    case "RESET_COUNT":
      return { ...state, count: 0 };
    case "GET_NOTIFICATIONS":
      let { notifications, total } = action.payload;
      return { ...state, list: notifications, total, loading: false };
    case "GET_MORE_NOTIFICATIONS":
      return {
        ...state,
        list: [...state.list, ...action.payload.notifications],
      };
    default:
      return state;
  }
};

export default reducer;
