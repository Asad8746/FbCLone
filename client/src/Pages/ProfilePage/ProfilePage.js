import React from "react";
import About from "../../Components/ProfileComponent/ProfileSideBar/ProfileAbout/ProfileAbout";
import Header from "../../Components/Header/Header";
import List from "../../Components/ProfileComponent/FollowerList.component";
import Actions from "../../Actions";

import { connect } from "react-redux";

import "./Profile.styles.scss";
import Loader from "../../Components/Loader";
import { Redirect } from "react-router-dom";
import TimeLine from "../../Components/TimeLine/TimeLine.component";
const {
  getProfileById,
  getPosts,
  checkIsUser,
  setReducer,
  checkBlocked,
} = Actions;
class Profile extends React.Component {
  componentDidMount() {
    const { id } = this.props.match.params;
    if (this.props.id !== id) {
      console.log(this.props.id);
      console.log(id);
      console.log("i am running");
      this.props.checkBlocked(id);
    } else {
      this.props.setReducer({
        type: "CHECK_IS_BLOCKED",
        payload: { blockLoader: false, blockedStatus: false },
      });
    }
    this.props.getProfileById(id);
    this.props.getPosts(id);
    this.props.checkIsUser(this.props.id, id);
  }

  componentDidUpdate(prevProps) {
    const { id: prevId } = prevProps.match.params;
    const { id } = this.props.match.params;
    if (prevId !== id) {
      this.props.setReducer({ type: "GET_PROFILE", payload: {} });
      this.props.setReducer({ type: "GET_POSTS", payload: [] });
      this.props.setReducer({ type: "CHECK_USER", payload: false });
      this.props.getProfileById(id);
      this.props.checkIsUser(this.props.id, id);
      this.props.getPosts(id);
    }
  }

  componentWillUnmount() {
    this.props.setReducer({ type: "GET_PROFILE", payload: {} });
    this.props.setReducer({ type: "GET_POSTS", payload: [] });
    this.props.setReducer({ type: "CHECK_USER", payload: false });
  }
  render() {
    const { blockLoader, blockedStatus } = this.props.blockedObject;
    if (blockLoader) return <Loader />;
    if (blockedStatus) return <Redirect to="/blocked/message" />;
    if (Object.keys(this.props.profile).length === 0 || !this.props.profile) {
      return <Loader />;
    }
    const { profile, isUser, posts } = this.props;
    const { _id, f_name, l_name, gender, about } = profile;
    const name = `${f_name}  ${l_name}`;
    const whatToShow = {
      timeline: (
        <TimeLine isAuthUser={isUser} posts={posts} urlToPost="/posts/create" />
      ),
      followers: <List list={profile.followers} />,
      following: <List list={profile.following} />,
    };
    if (!profile) {
      return <div>Loading </div>;
    }
    console.log(_id);
    return (
      <div className="profile_box">
        <Header />
        <div className="profile_body">
          <About
            name={name}
            gender={gender}
            dob="14-08-1998"
            about={about}
            isUser={isUser}
            id={_id}
          />
        </div>
        <section className="timeline-section">
          {whatToShow[this.props.display]}
        </section>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    display: state.display,
    profile: state.Profile,
    posts: state.Posts,
    id: state.Authentication.id,
    isUser: state.isUser,
    blockedObject: state.blocked,
  };
};

export default connect(mapStateToProps, {
  getProfileById,
  getPosts,
  checkIsUser,
  setReducer,
  checkBlocked,
})(Profile);
