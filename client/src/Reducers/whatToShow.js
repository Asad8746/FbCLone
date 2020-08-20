export default (state="timeline",action) => {
    switch(action.type) {
        case "what_To_show":
            return action.payload;
        default :
            return state;
    }
}