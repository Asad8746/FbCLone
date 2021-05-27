import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { checkIsLiked, likePage, disLikePage } from "../../Actions";
const PageLikeButton = ({ likePage, page_id, disLikePage }) => {
  const [isLiked, setIsLiked] = useState(null);
  const [loading, setLoading] = useState(true);
  const cb = (likeStatus) => {
    setLoading(false);
    if (likeStatus !== null && likeStatus !== isLiked) {
      setIsLiked(likeStatus);
    }
  };
  useEffect(() => {
    checkIsLiked(page_id, cb);
  }, [page_id]);

  const onClick = () => {
    if (loading) return;
    if (!isLiked) {
      setIsLiked(true);
      likePage(page_id, cb);
      return;
    } else {
      setIsLiked(false);
      disLikePage(page_id, cb);
    }
  };

  return (
    <button className="animateBtn circle-btn" onClick={() => onClick()}>
      {loading ? (
        <div className="ui mini active inline loader"></div>
      ) : (
        <i className={`heart ${!isLiked && "outline"} icon`} id="btnIcon"></i>
      )}
    </button>
  );
};
PageLikeButton.propTypes = {
  likePage: PropTypes.func.isRequired,
  page_id: PropTypes.string.isRequired,
  disLikePage: PropTypes.func.isRequired,
};

export default connect(null, { likePage, disLikePage })(PageLikeButton);
