export default (state="",action) => {
    switch(action.type) {
        case "SET_ERROR_MESSAGE":
            return action.payload;
        default :
            return state;
    }
}