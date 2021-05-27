import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import SecondaryNav from "../../Components/SecondaryNav";
import PGList from "../../Components/PGList";
import { connect } from "react-redux";
import { groupTypes } from "../../Reducers/constants";
import { getAllGroups, setReducer } from "../../Actions";
const GroupMainPage = ({ groups, loading, getAllGroups, setReducer }) => {
  const [activeItem, setActiveItem] = useState("all");
  useEffect(() => {
    return () => {
      setReducer({ type: groupTypes.resetGroups });
    };
  }, [setReducer]);
  const renderRightMenu = () => {
    return (
      <div className="right-menu">
        <Link className="item" to="/group/create">
          Create New Group
        </Link>
      </div>
    );
  };
  const getResource = (pageNumber) => {
    getAllGroups(activeItem, pageNumber);
  };
  const reset = () => {
    setReducer({ type: groupTypes.resetGroups });
  };

  return (
    <div style={{ width: "100%" }}>
      <SecondaryNav
        itemList={[
          {
            title: "Groups",
            styleId: activeItem === "all" ? "active" : "",
            onItemClick: () => {
              setActiveItem("all");
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

      <PGList
        type={activeItem}
        data={groups}
        loading={loading}
        reset={reset}
        getResource={getResource}
        endMessage={"No More Groups"}
        emptyMessage={"Found No Groups"}
        source="groups"
      />
    </div>
  );
};
const mapStateToProps = (state) => {
  return { groups: state.group.groups, loading: state.group.loading };
};

export default connect(mapStateToProps, { getAllGroups, setReducer })(
  GroupMainPage
);
