import React from "react";
import { connect } from "react-redux";

import { logoutUser } from "../../Actions";

import DropDownItem from "../SettingDropDownItem";
import "./index.style.scss";
const SettingDropDown = ({ logoutUser }) => {
  return (
    <div className="setting-dropdown">
      <DropDownItem label="Edit Your Profile" link="/edit" divide />
      <DropDownItem label="Blocked Users" link="/blocked/users" divide />
      <div
        className="setting-dropdown__item"
        onClick={() => {
          logoutUser();
        }}
      >
        Logout
      </div>
    </div>
  );
};

export default connect(null, { logoutUser })(SettingDropDown);
