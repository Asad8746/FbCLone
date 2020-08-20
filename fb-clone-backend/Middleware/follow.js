const Profile = require("../models/profile");
module.exports =  async (req,res,next) => {
    const {profile:profile_id} = req.user;
    const {id} = req.params;

    const profile = await Profile.findById({_id:profile_id}).select({following : 1});
    if(!profile) return res.sendStatus(400);
    const followerProfile = profile.following.find((item) => {
        return item.followed_id == id
    })
    if(followerProfile) return res.send("Already Followed");
    next();
}