import React, { useState } from "react";
import { Link } from "react-router-dom";
import SecondaryNav from "../../Components/SecondaryNav/";
import PGList from "../../Components/PGList";

import { getPages, resetPages } from "../../Actions";
import { connect } from "react-redux";

const Pages = ({ pages, loading, getPages, resetPages }) => {
  const [activeItem, setActiveItem] = useState("all");
  const renderRightMenu = () => {
    return (
      <div className="right-menu">
        <Link className="item" to="/pages/new">
          Create New Page
        </Link>
      </div>
    );
  };

  const getResource = (pageNumber = 1) => {
    getPages(activeItem, pageNumber);
  };
  const reset = () => {
    resetPages();
  };
  return (
    <div>
      <SecondaryNav
        itemList={[
          {
            title: "Pages",
            styleId: activeItem === "all" ? "active" : "",
            onItemClick: () => {
              setActiveItem("all");
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
      <PGList
        type={activeItem}
        data={pages}
        loading={loading}
        reset={reset}
        getResource={getResource}
        endMessage={"No More Pages"}
        emptyMessage={"Found No Pages"}
        source="pages"
      />
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    pages: state.pages.pagesList,
    loading: state.pages.loading,
  };
};
export default connect(mapStateToProps, { getPages, resetPages })(Pages);
