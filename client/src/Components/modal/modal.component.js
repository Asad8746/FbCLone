import React from "react";
import ReactDOM from "react-dom";

const Modal = ({ header, body, onDismiss, actions }) => {
  return ReactDOM.createPortal(
    <div
      className="ui dimmer modals visible active"
      onClick={() => {
        onDismiss();
      }}
    >
      <div
        className="ui standard modal visible active"
        onClick={(e) => {
          e.stopPropagation();
        }}
      >
        <div className="header">{header}</div>
        {!body ? null : <div className="body">{body}</div>}
        <div className="actions">{actions}</div>
      </div>
    </div>,
    document.querySelector("#modal")
  );
};

export default Modal;
