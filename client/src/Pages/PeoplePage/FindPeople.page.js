import React, { useEffect } from "react";
import { connect } from "react-redux";
import Actions from "../../Actions";
import PeopleItem from "./PeopleItem.component";

const { getPeople, setReducer } = Actions;

const FindPeople = ({ getPeople, peopleList, id, setReducer }) => {
  useEffect(() => {
    getPeople(id);
    return () => {
      setReducer({ type: "FETCH_PEOPLE", payload: [] });
      setReducer({ type: "GET_PROFILE_BY_ID", payload: {} });
    };
  }, []);

  const renderPeopleList = () => {
    if (peopleList === null) {
      return (
        <div className="ui active inverted dimmer">
          <div className="ui text loader">Loading</div>
        </div>
      );
    }
    return peopleList.map((people) => {
      return <PeopleItem people={people} key={people._id} />;
    });
  };
  return (
    <div className="ui container">
      <div className="ui segment">
        <h3 className="ui header">Who to Follow</h3>
        <div className="ui middle aligned divided list">
          {renderPeopleList()}
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => {
  return { peopleList: state.peopleList, id: state.Authentication.id };
};
export default connect(mapStateToProps, { getPeople, setReducer })(FindPeople);
