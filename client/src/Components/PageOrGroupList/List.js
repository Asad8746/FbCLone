import React from "react";
import PageItem from "./PageItem";
import "./list.style.scss";
const List = ({ data, source }) => {
  if (!data) {
    return <div className="ui active loader"></div>;
  }
  return (
    <div className="page-list">
      {data.map((item) => {
        return <PageItem item={item} key={item._id} source={source} />;
      })}
    </div>
  );
};

export default List;
