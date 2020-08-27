import React, { useState, useEffect } from "react";
import Actions from "../../Actions";
import Loader from "../Loader";
const { requestGroup, checkIsRequested, cancelRequest } = Actions;

const JoinBtn = ({ id }) => {
  const [isRequested, setIsRequested] = useState(null);
  useEffect(() => {
    let mounted = true;
    if (mounted) {
      checkIsRequested(id, setIsRequested);
    }
    return () => {
      mounted = false;
    };
  }, []);
  useEffect(() => {}, [checkIsRequested]);
  if (isRequested === null) return <Loader />;
  return (
    <>
      {!isRequested ? (
        <button
          className="ui blue button"
          onClick={() => {
            requestGroup(id, setIsRequested);
          }}
        >
          Join
        </button>
      ) : (
        <button
          className="ui  button"
          onClick={() => {
            cancelRequest(id, setIsRequested);
          }}
        >
          Cancel Request
        </button>
      )}
    </>
  );
};

export default JoinBtn;
