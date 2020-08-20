export default (state = false,action) => {
    switch(action.type) {
        case "CHECK_USER" :
            return action.payload;
        default :
            return state;
    }
}