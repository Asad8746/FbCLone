export default (state={},action)=>{
    switch(action.type) {
        case "GET_PROFILE" : 
            return action.payload;
        case "GET_PROFILE_BY_ID":
            return {...state,...action.payload};
        case "CREATEPOST" : 
            return {...state,...action.payload};
        case "FOLLOW_USER" :
            return {...state,...action.payload};
        case "UNFOLLOW_USER" :
            return {...state,...action.payload};
        case "UNLIKE":
            return {...state,...action.payload};
        default : 
            return state;
    }
}

/*
module.exports  = {
      devServer : {
          watchOptions: {
              ignored : `${__dirname}/public/uploads`
          }
      }
  }
*/