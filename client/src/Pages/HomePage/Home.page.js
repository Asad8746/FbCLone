import React, { useEffect } from "react";
import { connect } from "react-redux";
import Actions from "../../Actions";
import Posts from "../../Components/Posts/PostsList.component";
import "./home.style.scss";
const { getNewsFeed, setReducer } = Actions;

const Home = ({ posts, getNewsFeed, setReducer }) => {
  useEffect(() => {
    getNewsFeed();
    return () => {
      setReducer({ type: "GET_POSTS", payload: [] });
    };
  }, []);
  return (
    <div className="home-section">
      <Posts posts={posts} />
    </div>
  );
};

const mapStateToProps = (state) => {
  return { posts: state.Posts };
};

export default connect(mapStateToProps, { getNewsFeed, setReducer })(Home);
