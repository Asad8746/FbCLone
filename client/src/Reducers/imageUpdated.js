export default (state=false,action) => {
    switch(action.type) {
        case "IMAGE_UPDATED" : 
            return action.payload;
        default:
            return state;
    }
}