import React from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";

import "./index.style.scss";
const About = ({ name, about, gender }) => {
  return (
    <section className="profile-about">
      <h3 className="profile-about__heading">About {name}</h3>
      <div className="profile__information">
        {/* {renderInfo()} */}
        <div className="profile__information-item">
          <i className="graduation rounded cap icon"></i>
          <p>{about} </p>
        </div>
        <div className="profile__information-item">
          <i className="user rounded icon"></i>
          <p>{gender}</p>
        </div>
      </div>
    </section>
  );
};

About.defaultProps = {
  renderInfo: () => {},
};
About.propTypes = {
  name: PropTypes.string.isRequired,
  about: PropTypes.string.isRequired,
  gender: PropTypes.string.isRequired,
};
const mapStateToProps = (state) => {
  const { f_name, l_name, about, gender } = state.profileReducer.profile;
  return {
    name: `${f_name} ${l_name}`,
    about,
    gender,
  };
};
export default connect(mapStateToProps)(About);
