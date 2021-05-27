const ActiveUserModel = require("../models/ActiveUser");
const NotificationModel = require("../models/NotificationModel");
const config = require("config");
class Notification {
  notification;
  constructor(io) {
    this.notification = io.of("/notification");
    this.notification.on("connection", async (socket) => {
      const { id } = socket.handshake.query;
      let activeUser = await ActiveUserModel.findOne({ user_id: id });
      if (activeUser) {
        activeUser.socket_id = socket.id;
        await activeUser.save();
      } else {
        activeUser = activeUser = new ActiveUserModel({
          socket_id: socket.id,
          user_id: id,
        });
        await activeUser.save();
      }
      socket.on("disconnect", async () => {
        await ActiveUserModel.findOneAndDelete({ socket_id: socket.id });
        console.log("User disconnected from Notification");
      });
    });
  }
  send = async ({ profile_id, notification, link, noti_from_id }) => {
    const newNotification = new NotificationModel({
      notification,
      link: `${config.get("clientUrl")}/${link}`,
      profile_id,
      noti_from_id,
    });
    await newNotification.save();
    ActiveUserModel.findOne({ user_id: profile_id })
      .then((user) => {
        if (user)
          return this.notification
            .to(user.socket_id)
            .emit("notification", newNotification);
      })
      .catch((err) => console.log(err.message));
  };
}

module.exports = Notification;
