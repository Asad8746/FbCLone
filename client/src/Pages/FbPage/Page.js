import React, { useEffect } from "react";
import { connect } from "react-redux";
import Actions from "../../Actions";
import "./page.style.scss";
import CoverPhoto from "../../Components/CoverPhoto/coverPhoto";
import PageAbout from "../../Components/FbPages/PageAbout/PageAbout";
import TimeLineComponent from "../../Components/TimeLine/TimeLine.component";
import PageLikeButton from "../../Components/FbPages/PageLikeButton";
import { Link } from "react-router-dom";
const { getPage, setReducer, getAllPostForPage, likePage } = Actions;

const checkAuthorization = (page_admin_id, user_id) => {
  return page_admin_id === user_id;
};

// Page Component
const Page = ({
  getPage,
  setReducer,
  getAllPostForPage,
  match,
  page,
  auth_id,
  posts,
  likePage,
}) => {
  useEffect(() => {
    const { id } = match.params;
    getPage(id);
    getAllPostForPage(id);
    return () => {
      setReducer({ type: "GET_PAGE", payload: null });
      setReducer({ type: "GET_POSTS", payload: [] });
    };
  }, []);
  const renderLikes = () => {
    return (
      <p>
        {page.likes.length} {page.likes.length === 1 ? "Like" : "Likes"}
      </p>
    );
  };
  const renderActions = () => {
    return (
      <>
        {checkAuthorization(page.page_admin_id, auth_id) ? (
          <Link
            className="page-settingsBtn animateBtn pageBtn"
            to={`/pages/${page._id}/settings`}
          >
            <i class="cog icon" id="btnIcon"></i>
          </Link>
        ) : null}
        <PageLikeButton page_id={page._id} />
      </>
    );
  };
  if (!page) return <div className="ui active loader"></div>;
  return (
    <div className="page-container">
      <CoverPhoto
        urlToImage={`http://localhost:5000/pages/${page._id}/cover`}
        alt={page.page_name}
        isAuthUser={checkAuthorization(page.page_admin_id, auth_id)}
      />
      <PageAbout
        title={page.page_name}
        description={page.page_description}
        actions={renderActions()}
        count={renderLikes()}
      />
      <section className="timeline-section">
        <TimeLineComponent
          posts={posts}
          isAuthUser={checkAuthorization(page.page_admin_id, auth_id)}
          urlToPost={`/pages/${page._id}/create/post/`}
        />
      </section>
    </div>
  );
};

const mapStatetoProps = (state) => {
  return {
    page: state.pages.page,
    auth_id: state.Authentication.id,
    posts: state.Posts,
  };
};
export default connect(mapStatetoProps, {
  getPage,
  setReducer,
  getAllPostForPage,
  likePage,
})(Page);
