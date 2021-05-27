import React, { useEffect } from "react";
import PGList from "../PGList";
import { connect } from "react-redux";
import { getAllGroups, setReducer } from "../../Actions";

const GroupsGetter = ({ type, groups, loading, getAllGroups, setReducer }) => {
  useEffect(() => {
    // getAllGroups(type);
    return () => {
      setReducer({
        type: "RESET_GROUPS",
        payload: [],
      });
    };
  }, [type]);

  const getResource = (pageNumber) => {
    getAllGroups(type, pageNumber);
  };
  return (
    <PGList
      data={groups}
      source="groups"
      getResource={getResource}
      loading={loading}
    />
  );
};

GroupsGetter.defaultProps = {
  type: "",
};
const mapStateToProps = (state) => {
  return { groups: state.group.groups, loading: state.group.loading };
};

export default connect(mapStateToProps, { getAllGroups, setReducer })(
  GroupsGetter
);
