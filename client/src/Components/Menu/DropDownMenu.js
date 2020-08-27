import React from "react";
import DropDownItem from "./DropDownItem";
import Actions from "../../Actions";
import { connect } from "react-redux";

const { logout, setReducer } = Actions;

const DropDownMenu = ({ logout }) => {
  return (
    <div className="ui compact menu" id="drop-down-menu">
      <div className="ui simple dropdown item" id="drop-down">
        <i className="dropdown icon"></i>

        <div className="menu">
          <DropDownItem label="Edit Your Profile" link="/edit" divide />
          <DropDownItem label="Blocked Users" link="/blocked/users" divide />
          <DropDownItem label="Pages" link="/pages" />
          <DropDownItem label="Groups" link="/groups" divide />
          <div
            className="item"
            onClick={() => {
              logout();
              setReducer({ type: "GET_PROFILE", payload: {} });
            }}
          >
            Logout
          </div>
        </div>
      </div>
    </div>
  );
};

export default connect(null, { logout })(DropDownMenu);
