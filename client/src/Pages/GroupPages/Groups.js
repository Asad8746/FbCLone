import React, { useEffect } from "react";
import PagesList from "../../Components/PageOrGroupList/List";
import { connect } from "react-redux";
import Actions from "../../Actions";
const { getAllGroups, setReducer } = Actions;
const Groups = ({ url, getAllGroups, groups, setReducer }) => {
  useEffect(() => {
    getAllGroups(url);
    return () => {
      setReducer({
        type: "GET_GROUPS",
        payload: null,
      });
    };
  }, [url]);
  return <PagesList data={groups} source="groups" />;
};

const mapStateToProps = (state) => {
  return { groups: state.group.groups };
};

export default connect(mapStateToProps, { getAllGroups, setReducer })(Groups);
