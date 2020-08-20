module.exports = (user_profiles) => {
    let posts =  user_profiles.reduce((arr,user_profile)=> {
        return [...arr,...user_profile.posts];
    },[])
    return posts;
}