import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";

import "./posts.style.scss";
import Post from "../Post";
import InlineLoader from "../InlineLoader";
import { connect } from "react-redux";
import InfiniteScroll from "react-infinite-scroll-component";
import { setReducer, getPosts } from "../../Actions";
import { postTypes } from "../../Reducers/constants";

let renderPost = (posts) => {
  return Object.keys(posts).map((key) => {
    return <Post post={posts[key]} key={key} />;
  });
};
const Posts = ({ id, getHome, type, posts, loading, getPosts, setReducer }) => {
  const [pageNumber, setPageNumber] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  useEffect(() => {
    return () => {
      setReducer({ type: postTypes.reset });
    };
  }, []);
  useEffect(() => {
    getPosts({ id, getHome, type, pageNumber, setHasMore });
  }, [pageNumber]);
  const fetchMorePosts = () => {
    setPageNumber((prevPage) => prevPage + 1);
  };

  return (
    <div className="posts">
      {loading ? (
        <InlineLoader />
      ) : Object.keys(posts).length === 0 ? (
        <div className="posts__empty-container">Found no Posts</div>
      ) : (
        <InfiniteScroll
          className="posts__infinite-scroller"
          dataLength={Object.keys(posts).length}
          next={fetchMorePosts}
          loader={
            <div className="ui medium active centered inline loader"></div>
          }
          hasMore={hasMore}
          endMessage={<p className="end-message">No More Posts</p>}
          scrollThreshold="200px"
        >
          {renderPost(posts)}
        </InfiniteScroll>
      )}
    </div>
  );
};

Posts.defaultProps = {
  id: "",
  type: null,
  getHome: false,
};
Posts.propTypes = {
  id: PropTypes.string.isRequired,
  getHome: PropTypes.bool.isRequired,
  posts: PropTypes.object.isRequired,
  type: PropTypes.string.isRequired,
  loading: PropTypes.bool.isRequired,
  getPosts: PropTypes.func.isRequired,
  setReducer: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => {
  return { posts: state.Posts.data, loading: state.Posts.loading };
};
export default connect(mapStateToProps, { setReducer, getPosts })(Posts);
