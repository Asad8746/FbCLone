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
        uploadUrl="/profile/upload/cover"
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
    name: `${state.profileReducer.profile.f_name} ${state.profileReducer.profile.l_name}`,
    id: state.profileReducer.profile._id,
    isUser: state.isUser,
  };
};
export default connect(mapStateToProps)(Header);
