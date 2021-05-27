import React, { useEffect, useState } from "react";
import moment from "moment";
import "./index.scss";
import { url } from "../../Api";
import { connect } from "react-redux";
import { getMoreNotiList, getNotiList, setReducer } from "../../Actions/";

const NotificationList = ({
  list,
  loading,
  total,
  getNotiList,
  setReducer,
}) => {
  const [pageNumber, setPageNumber] = useState(1);
  useEffect(() => {
    return () => {
      setReducer({ type: "RESET_NOTI" });
    };
  }, [setReducer]);
  useEffect(() => {
    getNotiList(pageNumber);
  }, [pageNumber, getNotiList]);
  const onNextCall = () => {
    setPageNumber((prev) => prev + 1);
  };
  const renderNotifications = () => {
    return list.map((item) => {
      const date = item.date;
      return (
        <li key={item._id} className={"notification__item"}>
          <div className="notification__avatar-container">
            <img
              className="notification__avatar"
              src={`${url}/profile/profile_pic/${item.noti_from_id}`}
              alt="Avatar"
            />
          </div>
          <div className="right">
            <h3 className="notification__item__header">{item.notification}</h3>
            <p className="notification__item__date">{moment(date).fromNow()}</p>
          </div>
        </li>
      );
    });
  };
  return (
    <div className="notification">
      <div className="notification__list">
        <div className="notification__list__header__container">
          <h2 className="notification__list__header">Notifications</h2>
        </div>

        {loading ? (
          <div className="notification__loader">
            <div className="ui small active loader inline"></div>
          </div>
        ) : (
          <ul>
            {list.length === 0 ? (
              <div className="notification__emptyContainer">
                No More Notifications
              </div>
            ) : (
              <>
                {renderNotifications()}
                {list.length !== total && (
                  <div className="last-item">
                    <button
                      className="notification__showbtn"
                      onClick={onNextCall}
                    >
                      show more
                    </button>
                  </div>
                )}
              </>
            )}
          </ul>
        )}
      </div>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    list: state.notification.list,
    total: state.notification.total,
    loading: state.notification.loading,
  };
};

export default connect(mapStateToProps, {
  getNotiList,
  getMoreNotiList,
  setReducer,
})(NotificationList);
