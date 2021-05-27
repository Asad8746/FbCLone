import React, { useEffect } from "react";
import { connect } from "react-redux";
import { getPeople, setReducer } from "../../Actions";
import PeopleItem from "../../Components/PeopleItem";
import { peopleTypes } from "../../Reducers/constants";
import "./index.styles.scss";

const FindPeople = ({ peopleList, loading, getPeople, setReducer }) => {
  useEffect(() => {
    getPeople();
    return () => {
      setReducer({ type: peopleTypes.reset });
    };
  }, [getPeople, setReducer]);

  const renderPeopleList = () => {
    return peopleList.map((people) => {
      return (
        <PeopleItem
          id={people._id}
          name={`${people.f_name} ${people.l_name}`}
          key={people._id}
        />
      );
    });
  };
  return (
    <div className="people__container">
      <div className="u-center-text">
        <h3 className="people__header">Who to Follow</h3>
      </div>
      {loading ? (
        <div className="loader__container">
          <div className="ui inline active loader"></div>
        </div>
      ) : peopleList.length === 0 ? (
        <div className="people__empty-container">Found no Person</div>
      ) : (
        <div className="people__list-container">{renderPeopleList()}</div>
      )}
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    peopleList: state.People.list,
    loading: state.People.loading,
  };
};
export default connect(mapStateToProps, { getPeople, setReducer })(FindPeople);
