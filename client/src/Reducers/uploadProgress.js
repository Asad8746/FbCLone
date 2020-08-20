export default (state=0,action) => {
    switch(action.type) {
        case "SET_PROGRESS" :
            console.log("i am running")
            return action.payload;
        default :
            return state;
    }
}