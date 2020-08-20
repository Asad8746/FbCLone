import React from "react";
import "./header.style.scss";
import { connect } from "react-redux";
import CoverPhoto from "../CoverPhoto/coverPhoto";
import ProfilePhoto from "../ProfilePhoto/ProfilePhoto.component";

const Header = ({ name, id, isUser }) => {
  return (
    <div className="header-section">
      <CoverPhoto
        urlToImage={`http://localhost:5000/profile/cover/${id}?${Date.now()}`}
        alt={name}
        isAuthUser={isUser}
      />
      <div className="navbar">
        <div className="profile-pic_container">
          <ProfilePhoto />
          <h3 className="profile_name">{name}</h3>
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    name: `${state.Profile.f_name} ${state.Profile.l_name}`,
    id: state.Profile._id,
    isUser: state.isUser,
  };
};
export default connect(mapStateToProps)(Header);
