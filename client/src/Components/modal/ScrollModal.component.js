import React from "react";

const ScrollModal = ({ header, content, onDismiss }) => {
  return (
    <div
      className="ui dimmer modals visible active"
      onClick={() => {
        onDismiss();
      }}
    >
      <div
        className="ui active modal"
        onClick={(e) => {
          e.stopPropagation();
        }}
      >
        <div className="header">{header}</div>
        <div className="scrolling content">{content}</div>
      </div>
    </div>
  );
};

export default ScrollModal;
