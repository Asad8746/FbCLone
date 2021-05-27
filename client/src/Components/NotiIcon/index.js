import React from "react";
import { connect } from "react-redux";
import "./index.style.scss";
import PropTypes from "prop-types";
const NotiIcon = ({ count }) => {
  return (
    <i className="bell icon" id="noti__bell-icon">
      {count !== 0 && <div className="count-info">{count}</div>}
    </i>
  );
};

NotiIcon.defaultProps = {
  count: 0,
};
NotiIcon.propTypes = {
  count: PropTypes.number.isRequired,
};

const mapStateToProps = (state) => {
  return {
    count: state.notification.count,
  };
};
export default connect(mapStateToProps)(NotiIcon);
