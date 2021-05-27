import React from "react";
import { Link } from "react-router-dom";
import "./index.style.scss";
const ExpiredLink = () => {
  return (
    <div className="expired">
      <p className="expired__message">
        The Link you are trying to access is expired
      </p>
      <Link className="expired__btn" to="/">
        &larr; Go Home
      </Link>
    </div>
  );
};

export default ExpiredLink;
