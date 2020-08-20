import React from "react";
import BlockButton from "../../../BlockButton/BlockButton";
import FollowUser from "../TimelineNav/TimelineNav.component";
import FollowBtn from "../../../FollowBtn/FollowBtn.component";

import "./About.style.scss";

const About = ({ id, dob, about, isUser }) => {
  return (
    <section className="about-section">
      <div className="about">
        <div className="user-information">
          <i className="birthday cake icon"></i>
          {dob}
        </div>
        <div className="user-information">
          <i className="graduation cap icon"></i>
          {about}
        </div>
        <FollowUser />
        {!isUser ? (
          <div className="actions">
            <FollowBtn id={id} />
            <BlockButton />
          </div>
        ) : null}
      </div>
    </section>
  );
};

export default About;
