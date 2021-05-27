import React, { useEffect } from "react";
import { connect } from "react-redux";
import { url } from "../../Api";
import {
  getGroup,
  setReducer,
  checkIsMember,
  resetGroups,
} from "../../Actions";
import { Link } from "react-router-dom";
import JoinBtn from "../../Components/JoinBtn";
import GroupLeaveBtn from "../../Components/GroupLeaveBtn";
import CoverPhoto from "../../Components/CoverPhoto";
import GroupAbout from "../../Components/About";

import GroupInfoPage from "../../Components/PrivateGroupContainer";
import CreatePostForm from "../../Components/CreatePostForm";
import Posts from "../../Components/Posts";
import "./index.style.scss";

const Group = ({
  getGroup,
  checkIsMember,
  match,
  group,
  history,
  isMember,
  isAdmin,
  resetGroups,
}) => {
  useEffect(() => {
    const { id } = match.params;
    getGroup(id);
    if (!isAdmin) {
      checkIsMember(id);
    }
    return () => {
      resetGroups();
    };
  }, []);

  const renderInfo = () => {
    return (
      <>
        <p
          onClick={() =>
            isAdmin ? history.push(`/group/members/${group.id}`) : ""
          }
        >
          {group.members}{" "}
          {group.members === 1 || group.members === 0 ? "Member" : "Members"}
        </p>
        {isAdmin && (
          <p onClick={() => history.push(`/group/requests/${group.id}`)}>
            {group.requests}{" "}
            {group.requests === 1 || group.requests === 0
              ? "Request"
              : "Requests"}
          </p>
        )}
      </>
    );
  };
  const renderActions = () => {
    return (
      <>
        {isAdmin ? (
          <Link
            className="animateBtn circle-btn"
            to={`/groups/${group.id}/settings`}
          >
            <i className="cog icon" id="btnIcon"></i>
          </Link>
        ) : isMember ? (
          <GroupLeaveBtn id={group.id} />
        ) : (
          <JoinBtn id={group.id} />
        )}
      </>
    );
  };
  if (!group) return <div className="ui active loader"></div>;

  return (
    <div className="group">
      <CoverPhoto
        urlToImage={`${url}/groups/${group.id}/cover?${Date.now()}`}
        alt={group.name}
        isAuthUser={isAdmin}
        uploadUrl={`/groups/upload/cover/${group.id}`}
      />
      <div className="group__timeline-container">
        <GroupAbout
          title={group.name}
          description={group.description}
          actions={renderActions()}
          information={renderInfo()}
        />
        <section className="group__timeline">
          {!isAdmin && group.isPrivate && isMember === false ? (
            <GroupInfoPage adminName={group.admin_name} />
          ) : (
            <>
              {(isAdmin || isMember) && (
                <CreatePostForm
                  urlToPost={`/groups/${group.id}/create/post/`}
                />
              )}
              <Posts id={group.id} type="group" />
            </>
          )}
        </section>
      </div>
    </div>
  );
};

const mapStatetoProps = (state) => {
  return {
    group: state.group.group,
    isAdmin: state.group.isAdmin,
    auth_id: state.Authentication.id,
    posts: state.Posts,
    isMember: state.group.isMember,
  };
};
export default connect(mapStatetoProps, {
  getGroup,
  setReducer,
  checkIsMember,
  resetGroups,
})(Group);
