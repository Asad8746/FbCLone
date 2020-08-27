import React, { useState } from "react";
import { Link } from "react-router-dom";
import SecondaryNav from "../../Components/SecondaryNav/SecondaryNav";
import Groups from "./Groups";
const GroupMainPage = () => {
  const [activeItem, setActiveItem] = useState("groups");
  const whatToDisplay = {
    groups: <Groups url="/all" />,
    joined: <Groups url="/joined" />,
    managed: <Groups url="/managed" />,
  };
  const renderRightMenu = () => {
    return (
      <div className="right-menu">
        <Link className="item" to="/group/create">
          Create New Group
        </Link>
      </div>
    );
  };

  return (
    <div className="ui container">
      <SecondaryNav
        itemList={[
          {
            title: "Groups",
            styleId: activeItem === "groups" ? "active" : "",
            onItemClick: () => {
              setActiveItem("groups");
            },
          },
          {
            title: "Groups you're in",
            styleId: activeItem === "joined" ? "active" : "",
            onItemClick: () => {
              setActiveItem("joined");
            },
          },
          {
            title: "Groups Managed by you",
            styleId: activeItem === "managed" ? "active" : "",
            onItemClick: () => {
              setActiveItem("managed");
            },
          },
        ]}
        rightMenu={renderRightMenu()}
      />
      {whatToDisplay[activeItem]}
    </div>
  );
};

export default GroupMainPage;
