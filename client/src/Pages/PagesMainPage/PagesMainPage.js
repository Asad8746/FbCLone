import React, { useState } from "react";
import { Link } from "react-router-dom";
import SecondaryNav from "../../Components/SecondaryNav/SecondaryNav";
import PageContainer from "../../Components/FbPages/PageListContainer";

import Actions from "../../Actions";
import { connect } from "react-redux";
const { getPages } = Actions;
// Pages Component
const Pages = () => {
  const [activeItem, setActiveItem] = useState("pages");
  const whatToDisplay = {
    pages: <PageContainer url="all" />,
    liked: <PageContainer url="liked" />,
    managed: <PageContainer url="my" />,
  };
  const renderRightMenu = () => {
    return (
      <div className="right-menu">
        <Link className="item" to="/pages/new">
          Create New Page
        </Link>
      </div>
    );
  };
  return (
    <div className="ui container">
      <SecondaryNav
        itemList={[
          {
            title: "Pages",
            styleId: activeItem === "pages" ? "active" : "",
            onItemClick: () => {
              setActiveItem("pages");
            },
          },
          {
            title: "Liked Page",
            styleId: activeItem === "liked" ? "active" : "",
            onItemClick: () => {
              setActiveItem("liked");
            },
          },
          {
            title: "Pages Managed by you",
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

export default connect(null, { getPages })(Pages);
