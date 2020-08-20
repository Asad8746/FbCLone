export default (state=null,action) => {
    switch(action.type) {
        case "IS_FOLLOWER":
            return action.payload;
        default :
            return state;
    }
}