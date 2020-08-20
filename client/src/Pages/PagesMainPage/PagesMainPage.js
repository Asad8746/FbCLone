import React, { useState } from "react";
import "./pages.style.scss";
import SecondaryNav from "../../Components/SecondaryNav/SecondaryNav";
import PageContainer from "../../Components/FbPages/PageListContainer";
import Actions from "../../Actions";
import { connect } from "react-redux";
const { getPages } = Actions;
// Pages Component
const Pages = () => {
  const [activeItem, setActiveItem] = useState("allpages");
  const whatToDisplay = {
    allpages: <PageContainer url="all" />,
    liked: <PageContainer url="liked" />,
    managed: <PageContainer url="my" />,
  };
  return (
    <div className="pages-container">
      <SecondaryNav
        itemList={[
          {
            title: "Pages",
            styleId: activeItem === "allpages" ? "active" : "",
            onItemClick: () => {
              setActiveItem("allpages");
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
      />
      {whatToDisplay[activeItem]}
    </div>
  );
};

export default connect(null, { getPages })(Pages);
