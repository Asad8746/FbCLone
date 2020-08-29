import React from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import DropDownMenu from "./DropDownMenu";

import "./menu.style.scss";

const Menu = ({ isAuthenticated, id, f_name, l_name, ...rest }) => {
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
            <Link className="item" to={`/profile/${id}`}>
              <img
                className="ui avatar image"
                src={`http://localhost:5000/profile/profile_pic/${id}?${Date.now()}`}
                alt={`${f_name} ${l_name} Dp`}
              />
              <p className="user-name">{`${f_name} ${l_name}`}</p>
            </Link>

            <div className="item">
              <Link to="/people">
                <i className="users icon" id="icon"></i>
              </Link>
            </div>
            <div className="item">
              <DropDownMenu />
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
    f_name: state.Authentication.f_name,
    l_name: state.Authentication.l_name,
  };
};

export default connect(mapStateToProps)(Menu);
