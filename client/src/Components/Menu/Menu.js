import React from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import Actions from "../../Actions";
import DropDownItem from "./DropDownItem";

import "./menu.style.scss";
const { logout, setReducer } = Actions;

const Menu = ({ isAuthenticated, id, logout, ...rest }) => {
  return (
    <div className="ui pointing menu blue-menu">
      <Link to="/" className="item">
        <i className="facebook icon" id="Logo"></i>
      </Link>
      <div className="right menu">
        {!isAuthenticated ? (
          <>
            <div className="item">
              <Link className="ui red button" to="/login">
                Login
              </Link>
            </div>
          </>
        ) : (
          <>
            <div className="item">
              <Link to="/">
                <i className="home icon" id="icon"></i>
              </Link>
            </div>
            <div className="item">
              <Link to={`/profile/${id}`}>
                <i className="user circle icon" id="icon"></i>
              </Link>
            </div>
            <div className="item">
              <Link to="/people">
                <i className="users icon" id="icon"></i>
              </Link>
            </div>
            <div className="item">
              <div className="ui compact menu" id="drop-down-menu">
                <div className="ui simple dropdown item" id="drop-down">
                  <i className="dropdown icon"></i>
                  <div className="menu">
                    <DropDownItem
                      label="Edit Your Profile"
                      link="/edit"
                      divide
                    />
                    <DropDownItem
                      label="Blocked Users"
                      link="/blocked/users"
                      divide
                    />
                    <DropDownItem label="Pages" link="/pages" />
                    <DropDownItem label="Groups" link="/somethign" divide />
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
            </div>
          </>
        )}
      </div>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    isAuthenticated: state.Authentication.isAuthenticated,
    id: state.Authentication.id,
  };
};

export default connect(mapStateToProps, { logout })(Menu);
