export default (state = null,action) => {
    switch(action.type) {
        case "SET_IMAGE":
            return action.payload;
        default :
            return state;
    }
}