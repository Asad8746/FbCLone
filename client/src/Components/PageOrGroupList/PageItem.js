import React from "react";
import history from "../../history";

const PageItem = ({ item, source }) => {
  return (
    <div
      className="page-item"
      onClick={() => history.push(`/${source}/${item._id}`)}
    >
      <div className="overlay-container"></div>
      <img
        className="page-item-image"
        src={`http://localhost:5000/${source}/${item._id}/cover`}
        alt={`${item.name} cover`}
      />
      <div className="content-box">
        <h3 className="page-item-title">{item.name}</h3>
        <p className="page-item-description">{item.description}</p>
      </div>
    </div>
  );
};

export default PageItem;
