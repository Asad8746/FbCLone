import React, { useState, useEffect } from "react";
import Actions from "../../Actions";
import { connect } from "react-redux";
const { checkIsLiked, likePage, disLikePage } = Actions;
const PageLikeButton = ({ likePage, page_id, disLikePage }) => {
  const [isLiked, setIsLiked] = useState(null);
  useEffect(() => {
    checkIsLiked(page_id, setIsLiked);
  }, []);
  useEffect(() => {}, [isLiked]);

  // Click Handlers
  const onLikeBtnClick = () => {
    likePage(page_id, setIsLiked);
  };
  const onDisLikeBtnClick = () => {
    disLikePage(page_id, setIsLiked);
  };
  if (isLiked === null) {
    return null;
  } else if (!isLiked) {
    return (
      <button className="animateBtn pageBtn" onClick={() => onLikeBtnClick()}>
        <i class="heart outline icon" id="btnIcon"></i>
      </button>
    );
  } else {
    return (
      <button
        className="animateBtn pageBtn"
        onClick={() => onDisLikeBtnClick()}
      >
        <i class="heart  icon" id="btnIcon"></i>
      </button>
    );
  }
};

export default connect(null, { likePage, disLikePage })(PageLikeButton);
