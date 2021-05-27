const router = require("express").Router();
const auth = require("../Middleware/auth");
const asyncMiddleware = require("../Middleware/asyncMiddleware");
const NotificationModel = require("../models/NotificationModel");

router.get(
  "/",
  auth,
  asyncMiddleware(async (req, res) => {
    const { profile: profile_id } = req.user;
    let { pageNumber } = req.query;
    pageNumber = parseInt(pageNumber);
    const notiCount = await NotificationModel.find({ profile_id }).count();
    const notifications = await NotificationModel.find({ profile_id })
      .limit(10)
      .skip((pageNumber - 1) * 10)
      .sort({ date: -1 });
    res.status(200).send({ total: notiCount, notifications });
  })
);

router.get(
  "/unseen",
  auth,
  asyncMiddleware(async (req, res) => {
    const { profile: profile_id } = req.user;
    const notificationsCount = await NotificationModel.find({
      profile_id,
      seen: false,
    }).count();
    res.status(200).send({ unSeenNotiCount: notificationsCount });
  })
);
router.put("/seen", auth, async (req, res) => {
  const { profile: profile_id } = req.user;
  const notifications = await NotificationModel.updateMany(
    {
      profile_id,
    },
    {
      seen: true,
    }
  );
  res.status(200).send(notifications);
});

module.exports = router;
