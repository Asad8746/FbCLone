import React from "react";
import FollowBtn from "../../Components/FollowBtn/FollowBtn.component";

import history from "../../history";

const PeopleItem = ({ people }) => {
  return (
    <div
      className="item"
      onClick={() => history.push(`/profile/${people._id}`)}
      key={people._id}
      style={{ cursor: "pointer" }}
    >
      <div
        className="right floated content"
        onClick={(e) => e.stopPropagation()}
      >
        <FollowBtn id={people._id} />
      </div>
      <img
        className="ui avatar image"
        src={`http://localhost:5000/profile/profile_pic/${people._id}`}
        alt={`${people.f_name} ${people.l_name} Profile dp`}
      />
      <div className="content">
        {people.f_name} {people.l_name}
      </div>
    </div>
  );
};

export default PeopleItem;
