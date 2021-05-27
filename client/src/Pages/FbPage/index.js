import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { getPage, setReducer, likePage } from "../../Actions";
import { url } from "../../Api";

import CoverPhoto from "../../Components/CoverPhoto";
import PageAbout from "../../Components/About";
import PageLikeButton from "../../Components/PageLikeBtn";
import CreatePostForm from "../../Components/CreatePostForm";
import Posts from "../../Components/Posts";

import "./index.style.scss";

const checkAuthorization = (page_admin_id, user_id) => {
  return page_admin_id === user_id;
};

// Page Component
const Page = ({ getPage, setReducer, match, page, auth_id }) => {
  useEffect(() => {
    const { id } = match.params;
    getPage(id);
    return () => {
      setReducer({ type: "GET_PAGE", payload: null });
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
            className="animateBtn circle-btn"
            to={`/pages/${page._id}/settings`}
          >
            <i className="cog icon page__icon" id="btnIcon"></i>
          </Link>
        ) : null}
        <PageLikeButton page_id={page._id} />
      </>
    );
  };
  if (!page) return <div className="ui active loader"></div>;
  return (
    <div className="page">
      <CoverPhoto
        urlToImage={`${url}/pages/${page._id}/cover?${Date.now()}`}
        alt={page.name}
        isAuthUser={checkAuthorization(page.page_admin_id, auth_id)}
        uploadUrl={`/pages/upload/cover/${page._id}`}
      />
      <div className="page__timeline-container">
        <PageAbout
          title={page.name}
          description={page.description}
          actions={renderActions()}
          count={renderLikes()}
        />

        <section className="timeline__section">
          <>
            {checkAuthorization(page.page_admin_id, auth_id) && (
              <CreatePostForm urlToPost={`/pages/${page._id}/create/post/`} />
            )}
            <Posts id={page._id} type="page" />
          </>
        </section>
      </div>
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
  likePage,
})(Page);
