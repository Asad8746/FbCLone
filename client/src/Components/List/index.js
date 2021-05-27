import React from "react";
import Loader from "../Loader";
import PeopleItem from "../PeopleItem";
import "./index.style.scss";

const List = ({ list }) => {
  if (!list) {
    return (
      <div style={{ height: 200 }}>
        <Loader />
      </div>
    );
  }

  return (
    <div className="list__container">
      {list.length === 0 ? (
        <div className="u-center-text">No One yet</div>
      ) : (
        <div className="list__grid-container">
          {list.map((item) => (
            <PeopleItem
              key={item._id}
              id={item._id}
              name={
                item.follower_name ? item.follower_name : item.followed_name
              }
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default List;
