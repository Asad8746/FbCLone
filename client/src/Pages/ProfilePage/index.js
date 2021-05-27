import React from "react";
import { connect } from "react-redux";
import {
  profileTypes,
  checkTypes,
  postTypes,
  blockTypes,
} from "../../Reducers/constants";
import Loader from "../../Components/Loader";
import Header from "../../Components/Header";
import TimeLine from "../../Components/TimeLine";
import { Redirect } from "react-router-dom";
import {
  getProfileById,
  getPosts,
  checkIsUser,
  setReducer,
  checkBlocked,
} from "../../Actions";

import "./index.style.scss";
class Profile extends React.Component {
  componentDidMount() {
    const { id } = this.props.match.params;
    if (this.props.id !== id) {
      this.props.checkBlocked(id);
    } else {
      this.props.setReducer({
        type: blockTypes.setLoading,
        payload: false,
      });
      this.props.setReducer({
        type: blockTypes.setBlockStatus,
        payload: false,
      });
    }
  }

  componentDidUpdate(prevProps) {
    const { id: prevId } = prevProps.match.params;
    const { id } = this.props.match.params;
    const { blockLoader, blockedStatus } = this.props;
    if (prevId !== id) {
      if (Object.keys(this.props.profile).length > 0) {
        this.props.setReducer({ type: profileTypes.reset });
      }
      if (blockedStatus) {
        this.props.setReducer({ type: blockTypes.reset });
        this.props.checkBlocked(id);
      }
    }
    if (
      !blockLoader &&
      !blockedStatus &&
      Object.keys(this.props.profile).length === 0
    ) {
      this.props.getProfileById(id);
      this.props.checkIsUser(this.props.id, id);
    }
  }

  componentWillUnmount() {
    this.props.setReducer({ type: profileTypes.reset });
    this.props.setReducer({ type: postTypes.reset });
    this.props.setReducer({ type: blockTypes.resetBlockState });
    this.props.setReducer({ type: checkTypes.checkUser, payload: false });
  }
  render() {
    const { blockLoader, blockedStatus } = this.props;
    if (blockLoader) return <Loader />;
    if (blockedStatus) return <Redirect to="/blocked/message" />;
    if (this.props.error) {
      return <div>{this.props.error}</div>;
    }
    if (this.props.loading) return <Loader />;
    return (
      <div className="profile">
        <Header />
        <section className="timeline-section">
          <TimeLine urlToPost="/posts/create" />
        </section>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    id: state.Authentication.id,
    profile: state.profileReducer.profile,
    loading: state.profileReducer.loading,
    error: state.profileReducer.error,
    isUser: state.isUser,
    blockLoader: state.blocked.blockLoader,
    blockedStatus: state.blocked.blockedStatus,
  };
};

export default connect(mapStateToProps, {
  getProfileById,
  getPosts,
  checkIsUser,
  setReducer,
  checkBlocked,
})(Profile);
