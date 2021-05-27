import React from "react";
import { url } from "../../Api";
import "./index.styles.scss";
const ToastMessage = ({ data }) => {
  return (
    <div className="notification--container">
      <img
        className="ui avatar image"
        id="noti_avatar"
        src={`${url}/profile/profile_pic/${data.noti_from_id}`}
        alt=""
      />
      <p className="notification">{data.notification}</p>
    </div>
  );
};
export default ToastMessage;
