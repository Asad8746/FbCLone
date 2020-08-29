import React, { useEffect } from "react";
import { connect } from "react-redux";
import Actions from "../../Actions";
import JoinBtn from "../../Components/JoinBtn/JoinBtn";
import GroupLeaveBtn from "../../Components/GroupLeaveBtn/GroupLeaveBtn";
import CoverPhoto from "../../Components/CoverPhoto/coverPhoto";
import PageAbout from "../../Components/FbPages/PageAbout/PageAbout";
import TimeLineComponent from "../../Components/TimeLine/TimeLine.component";
import GroupInfoPage from "./GroupInfoPage";
import { Link } from "react-router-dom";
const {
  getGroup,
  setReducer,
  checkIsMember,
  checkPrivacy,
  getPostsForGroup,
} = Actions;

const checkAuthorization = (page_admin_id, user_id) => {
  return page_admin_id === user_id;
};

// Page Component
const Group = ({
  getGroup,
  setReducer,
  checkIsMember,
  match,
  auth_id,
  posts,
  group,
  history,
  isMember,
  getPostsForGroup,
}) => {
  useEffect(() => {
    const { id } = match.params;
    getGroup(id);
    checkIsMember(id);
    getPostsForGroup(id);
    return () => {
      setReducer({ type: "GET_GROUP", payload: null });
      setReducer({ type: "CHECK_MEMBER", payload: null });
      setReducer({ type: "GET_POSTS", payload: [] });
    };
  }, []);

  const renderInfo = (checkIsAdmin) => {
    return (
      <>
        {!checkIsAdmin ? (
          <p>
            {group.members}{" "}
            {group.members === 1 || group.members === 0 ? "Member" : "Members"}
          </p>
        ) : (
          <p onClick={() => history.push(`/group/members/${group._id}`)}>
            {group.members}{" "}
            {group.members === 1 || group.members === 0 ? "Member" : "Members"}
          </p>
        )}
        {checkIsAdmin ? (
          <p onClick={() => history.push(`/group/requests/${group._id}`)}>
            {group.requests}{" "}
            {group.requests === 1 || group.requests === 0
              ? "Request"
              : "Requests"}
          </p>
        ) : null}
      </>
    );
  };
  const renderActions = (checkIsAdmin) => {
    console.log(checkIsAdmin);
    return (
      <>
        {checkIsAdmin ? (
          <Link
            className="page-settingsBtn animateBtn pageBtn"
            to={`/groups/${group._id}/settings`}
          >
            <i className="cog icon" id="btnIcon"></i>
          </Link>
        ) : null}

        {!checkIsAdmin ? (
          isMember ? (
            <GroupLeaveBtn id={group._id} />
          ) : (
            <JoinBtn id={group._id} />
          )
        ) : null}
      </>
    );
  };

  if (!group) return <div className="ui active loader"></div>;
  return (
    <div className="page-container">
      <CoverPhoto
        urlToImage={`http://localhost:5000/groups/${
          group._id
        }/cover?${Date.now()}`}
        alt={group.name}
        isAuthUser={checkAuthorization(group.group_admin_id._id, auth_id)}
        uploadUrl={`/groups/upload/cover/${group._id}`}
      />
      <PageAbout
        title={group.name}
        description={group.description}
        actions={renderActions(
          checkAuthorization(group.group_admin_id._id, auth_id)
        )}
        information={renderInfo(
          checkAuthorization(group.group_admin_id._id, auth_id)
        )}
      />
      <section className="timeline-section">
        {group.group_privacy === "private" && isMember === false ? (
          <GroupInfoPage admin={group.group_admin_id} />
        ) : (
          <TimeLineComponent
            posts={posts}
            isAuthUser={isMember}
            urlToPost={`/groups/${group._id}/create/post/`}
          />
        )}
      </section>
    </div>
  );
};

const mapStatetoProps = (state) => {
  return {
    group: state.group.group,
    auth_id: state.Authentication.id,
    posts: state.Posts,
    isMember: state.group.isMember,
  };
};
export default connect(mapStatetoProps, {
  getGroup,
  setReducer,
  checkIsMember,
  checkPrivacy,
  getPostsForGroup,
})(Group);
