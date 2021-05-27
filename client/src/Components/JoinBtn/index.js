import React, { useState, useEffect } from "react";
import { requestGroup, checkIsRequested, cancelRequest } from "../../Actions";
import Loader from "../Loader";

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
  }, [id]);
  if (isRequested === null) return <Loader />;
  return (
    <>
      <button
        style={{ marginTop: 10 }}
        className="ui blue button"
        onClick={() => {
          return isRequested
            ? cancelRequest(id, setIsRequested)
            : requestGroup(id, setIsRequested);
        }}
      >
        {isRequested ? "Cancel Request" : "Join"}
      </button>
    </>
  );
};

export default JoinBtn;
