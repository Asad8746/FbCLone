import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { followProfile, unfollowProfile, checkFollower } from "../../Actions";

import "./index.style.scss";
const FollowBtn = ({ id, check }) => {
  const [isFollower, setIsFollower] = useState(false);
  const [loading, setLoading] = useState(check ? true : false);
  useEffect(() => {
    if (check) {
      checkFollower(id, (status) => {
        setLoading(false);
        if (status) {
          setIsFollower(true);
        }
      });
    }
  }, []);
  return (
    <button
      className="follow__button"
      onClick={(e) => {
        e.stopPropagation();
        return !isFollower
          ? followProfile(id, setIsFollower)
          : unfollowProfile(id, setIsFollower);
      }}
    >
      {loading ? (
        <div className="ui small active inverted centered inline loader"></div>
      ) : isFollower ? (
        "Unfollow"
      ) : (
        "Follow"
      )}
    </button>
  );
};
FollowBtn.defaultProps = {
  check: true,
};
FollowBtn.propTypes = {
  id: PropTypes.string.isRequired,
  check: PropTypes.bool.isRequired,
};

export default FollowBtn;
