import React, { useEffect } from "react";
import { connect } from "react-redux";

import Actions from "../../Actions";
import PagesList from "./PagesList";
const { getPages, setReducer } = Actions;

const PageContainer = ({ url, getPages, pages, setReducer }) => {
  useEffect(() => {
    getPages(url);
    return () => {
      setReducer({
        type: "GET_PAGES",
        payload: { pagesList: null },
      });
    };
  }, [url]);

  return <PagesList pages={pages} />;
};

const mapStateToProps = (state) => {
  return { pages: state.pages.pagesList };
};
export default connect(mapStateToProps, { getPages, setReducer })(
  PageContainer
);
