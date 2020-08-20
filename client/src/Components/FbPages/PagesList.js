import React from "react";
import PageItem from "./PageItem";
const PagesList = ({ pages }) => {
  if (!pages) {
    return <div className="ui active loader"></div>;
  }
  return (
    <div className="page-list">
      {pages.map((item) => {
        return <PageItem page={item} key={item._id} />;
      })}
    </div>
  );
};

export default PagesList;
