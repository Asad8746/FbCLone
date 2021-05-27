import React, { useEffect } from "react";
import { connect } from "react-redux";
import NotificationList from "../NotificationList/";
import "react-toastify/dist/ReactToastify.css";
import {
  updateUnSeenNoti,
  setNotiCount,
  getNotiList,
  getMoreNotiList,
} from "../../Actions";
const Notification = ({ notiCount, setNotiCount, getNotiList }) => {
  useEffect(() => {
    if (notiCount > 0) {
      updateUnSeenNoti((status) => {
        if (status) {
          setNotiCount(0);
        }
      });
    }
  }, []);
  return (
    <div className="notification">
      <NotificationList />
    </div>
  );
};

const mapStateToProps = (state) => {
  return { id: state.Authentication.id, notiCount: state.notification.count };
};
export default connect(mapStateToProps, {
  setNotiCount,
  getNotiList,
  getMoreNotiList,
})(Notification);
