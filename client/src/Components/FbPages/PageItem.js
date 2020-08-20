import React from "react";
import history from "../../history";

const PageItem = ({ page }) => {
  console.log(page);
  return (
    <div
      className="page-item"
      onClick={() => history.push(`/pages/${page._id}`)}
    >
      <div className="overlay-container"></div>
      <img
        className="page-item-image"
        src={`http://localhost:5000/pages/${page._id}/cover`}
        alt={`${page.page_name} cover`}
      />
      <div className="content-box">
        <h3 className="page-item-title">{page.page_name}</h3>
        <p className="page-item-description">{page.page_description}</p>
      </div>
    </div>
  );
};

export default PageItem;
