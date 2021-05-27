import React from "react";
import history from "../../history";
import { url } from "../../Api";
const PageItem = ({ item, source }) => {
  return (
    <div
      className="pg__item"
      onClick={() => history.push(`/${source}/${item._id}`)}
    >
      <img
        className="pg__item-image"
        src={`${url}/${source}/${item._id}/cover`}
        alt={`${item.name} cover`}
      />
      <div className="overlay-container"></div>
      <div className="pg__info">
        <h3 className="pg__item-title">{item.name}</h3>
        <p className="pg__item-description">{item.description}</p>
      </div>
    </div>
  );
};

export default PageItem;
