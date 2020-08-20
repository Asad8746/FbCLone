export default (state = {},action)=> {
    switch(action.type) {
        case "get_Post":
            return action.payload
        default :
            return state
    }
}