import React from "react";
import "./index.style.scss";
import PropTypes from "prop-types";

const About = ({ title, description, actions, information }) => {
  return (
    <div className="sidebar">
      <h3 className="sidebar__title">{title}</h3>
      <p className="sidebar__description">{description}</p>
      <div className="sidebar__info">{information}</div>
      <div className="side__actions">{actions}</div>
    </div>
  );
};

About.defaultProps = {
  title: "",
  description: "",
  information: <></>,
  actions: <></>,
};

About.propTypes = {
  title: PropTypes.string,
  description: PropTypes.string,
  information: PropTypes.element,
  actions: PropTypes.element,
};

export default About;
