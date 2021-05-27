import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";

import FollowBtn from "../FollowBtn";
import history from "../../history";
import { url } from "../../Api";

import "./index.style.scss";

const PeopleItem = ({ id, name, profile_id }) => {
  return (
    <div
      className="people__item"
      onClick={() => history.push(`/profile/${id}`)}
      key={id}
    >
      <div className="people__item__left">
        <img
          className="people__item__avatar"
          src={`${url}/profile/profile_pic/${id}`}
          alt={`${name} Profile dp`}
        />
      </div>
      <div className="people__item__right">
        <h3 className="people__item__name">{name}</h3>
        {id !== profile_id && <FollowBtn check={false} id={id} />}
      </div>
    </div>
  );
};

PeopleItem.propTypes = {
  id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  profile_id: PropTypes.string.isRequired,
};

const mapStateToProps = (state) => {
  return { profile_id: state.Authentication.id };
};
export default connect(mapStateToProps)(PeopleItem);
