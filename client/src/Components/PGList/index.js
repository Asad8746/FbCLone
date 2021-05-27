import React, { useEffect } from "react";
import ScrollView from "react-infinite-scroll-component";
import { connect } from "react-redux";
import PropTypes from "prop-types";

import PGItem from "./PGItem";

import { setReducer } from "../../Actions";
import { paginationTypes } from "../../Reducers/constants";

import "./index.style.scss";
const List = ({
  pageNumber,
  hasMore,
  type,
  data,
  source,
  loading,
  endMessage,
  emptyMessage,
  getResource,
  setReducer,
  reset,
}) => {
  useEffect(() => {
    return () => {
      setReducer({ type: paginationTypes.reset });
      reset();
    };
  }, [type]);
  useEffect(() => {
    getResource(pageNumber);
  }, [pageNumber, type]);

  if (loading) {
    return <div className="ui active loader"></div>;
  }

  if (data.length === 0) {
    return <div className="empty-container">{emptyMessage}</div>;
  }
  const next = () => {
    setReducer({ type: paginationTypes.incPageNumber });
  };
  return (
    <ScrollView
      dataLength={data.length}
      hasMore={hasMore}
      next={next}
      loader={<div className="ui inline active loader"></div>}
      className="pg__list"
      endMessage={<div className="endmessage">{endMessage}</div>}
      scrollThreshold="200px"
    >
      {data.map((item) => {
        return <PGItem item={item} key={item._id} source={source} />;
      })}
    </ScrollView>
  );
};
List.defaultProps = {
  reset: () => {},
  getResource: () => {},
};

List.propTypes = {
  pageNumber: PropTypes.number.isRequired,
  hasMore: PropTypes.bool.isRequired,
  type: PropTypes.string.isRequired,
  data: PropTypes.array.isRequired,
  source: PropTypes.string.isRequired,
  loading: PropTypes.bool.isRequired,
  endMessage: PropTypes.string.isRequired,
  emptyMessage: PropTypes.string.isRequired,
  getResource: PropTypes.func.isRequired,
  setReducer: PropTypes.func.isRequired,
  reset: PropTypes.func,
};
const mapStateToProps = (state) => {
  const { pageNumber, hasMore } = state.pagination;
  return {
    pageNumber,
    hasMore,
  };
};
export default connect(mapStateToProps, { setReducer })(List);
