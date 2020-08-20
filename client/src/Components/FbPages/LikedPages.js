import React, { useEffect } from "react";
import PagesList from "./PagesList";
import { connect } from "react-redux";
import Actions from "../../Actions";
const { getPages, setReducer } = Actions;
const LikedPages = ({ getPages, pages, setReducer }) => {
  useEffect(() => {
    getPages("liked");
    return () => {
      setReducer({
        type: "GET_PAGES",
        payload: { pagesList: null },
      });
    };
  }, []);
  return <PagesList pages={pages} />;
};

const mapStateToProps = (state) => {
  return { pages: state.pages.pagesList };
};

export default connect(mapStateToProps, { getPages, setReducer })(LikedPages);
