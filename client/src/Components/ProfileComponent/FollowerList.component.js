import React from "react";
import history from "../../history";

const List = ({ list }) => {
  const renderList = () => {
    return list.map((item) => {
      return (
        <div
          className="item"
          key={item._id}
          onClick={() => history.push(`/profile/${item._id}`)}
        >
          <img
            className="ui avatar image"
            src={`http://localhost:5000/profile/profile_pic/${item._id}`}
            alt={`${
              item.follower_name ? item.follower_name : item.followed_name
            } profile dp`}
          />
          <div className="content">
            <div className="follower-name">
              {item.follower_name ? item.follower_name : item.followed_name}
            </div>
          </div>
        </div>
      );
    });
  };
  if (list.length === 0 || !list) return <div className="main">No One yet</div>;
  return (
    <div className="main">
      <div className="ui segment">
        <div className="ui middle aligned selection list">{renderList()}</div>
      </div>
    </div>
  );
};

export default List;
