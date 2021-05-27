import React from "react";
import { connect } from "react-redux";
import CoverPhoto from "../CoverPhoto";
import FollowBtn from "../FollowBtn";
import BlockBtn from "../BlockButton";
import ProfilePhoto from "../ProfilePhoto";
import { url } from "../../Api";
import "./index.style.scss";

const Header = ({ name, id, isUser }) => {
  const renderActions = () => {
    if (isUser) return null;
    return (
      <>
        <div style={{ paddingRight: 10 }}>
          <FollowBtn id={id} />
        </div>
        <BlockBtn />
      </>
    );
  };
  return (
    <div className="header-section">
      <CoverPhoto
        urlToImage={`${url}/profile/cover/${id}?${Date.now()}`}
        alt={name}
        isAuthUser={isUser}
        uploadUrl="/profile/upload/cover"
        renderActions={renderActions}
      />
      <div className="navbar">
        <div
          className="profile-pic_container"
          style={isUser ? { bottom: 0 } : {}}
        >
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
