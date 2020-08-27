import Api from "../Api/localhost";
import { getToken } from "../utils/tokenUtils";
import history from "../history";

const getAllGroups = (url) => {
  return async (dispatch) => {
    try {
      const response = await Api.get(`/groups/${url}`, {
        headers: { "x-auth-token": getToken() },
      });
      dispatch({ type: "GET_GROUPS", payload: response.data });
    } catch (err) {
      console.log(err.message);
    }
  };
};
const getRequests = (id) => {
  return async (dispatch) => {
    try {
      const response = await Api.get(`/groups/requests/${id}`, {
        headers: { "x-auth-token": getToken() },
      });
      dispatch({ type: "UPDATE_REQUESTS", payload: response.data });
    } catch (err) {
      console.log(err.message);
      history.push("/expired");
    }
  };
};

const getMembers = (id) => {
  return async (dispatch) => {
    try {
      const response = await Api.get(`/groups/members/${id}`, {
        headers: { "x-auth-token": getToken() },
      });
      dispatch({ type: "UPDATE_MEMBERS", payload: response.data });
    } catch (err) {
      console.log(err.message);
      history.push("/expired");
    }
  };
};

const createGroup = (formValues) => {
  return async (dispatch, getState) => {
    try {
      let formData = new FormData();
      formData.append("name", formValues.name);
      formData.append("description", formValues.description);
      formData.append("group_privacy", formValues.privacy);

      if (getState().image) {
        formData.append("file", getState().image);
      }
      const response = await Api.post("/groups/", formData, {
        headers: { "x-auth-token": getToken() },
      });
      if (response.status === 201) {
        dispatch({ type: "SET_IMAGE", payload: null });
        return history.push("/groups");
      }
    } catch (err) {
      console.log(err.message);
    }
  };
};

const getGroup = (id) => {
  return async (dispatch) => {
    try {
      const response = await Api.get(`/groups/${id}`, {
        headers: { "x-auth-token": getToken() },
      });
      if (response.status === 200) {
        dispatch({ type: "GET_GROUP", payload: response.data });
      }
    } catch (err) {
      console.log(err.response.data);
    }
  };
};

const checkPrivacy = (id) => {
  return async (dispatch) => {
    try {
      const response = await Api.get(`/groups/privacy/${id}`, {
        headers: { "x-auth-token": getToken() },
      });
      dispatch({ type: "SET_PRIVACY", payload: response.data });
    } catch (err) {
      console.log(err.message);
    }
  };
};
const checkIsMember = (id) => {
  return async (dispatch) => {
    try {
      const response = await Api.get(`/groups/check/${id}`, {
        headers: { "x-auth-token": getToken() },
      });
      dispatch({ type: "CHECK_MEMBER", payload: response.data });
    } catch (err) {
      console.log(err.message);
    }
  };
};

const requestGroup = async (id, setState) => {
  try {
    await Api.put(
      `/groups/request/${id}`,
      {},
      { headers: { "x-auth-token": getToken() } }
    );
    setState(true);
  } catch (err) {
    setState(false);
    console.log(err.message);
  }
};
const cancelRequest = async (id, setState) => {
  try {
    await Api.put(
      `/groups/cancelRequest/${id}`,
      {},
      {
        headers: { "x-auth-token": getToken() },
      }
    );
    setState(false);
  } catch (err) {
    console.log(err.message);
  }
};

const addMember = async (member_id, group_id) => {
  try {
    await Api.put(
      `/groups//add/${group_id}/member/${member_id}`,
      {},
      {
        headers: { "x-auth-token": getToken() },
      }
    );
    history.push(`/groups/${group_id}`);
  } catch (err) {
    console.log(err.message);
  }
};
const checkIsRequested = async (id, setState) => {
  try {
    const response = await Api.get(`/groups/check/${id}/request`, {
      headers: {
        "x-auth-token": getToken(),
      },
    });
    setState(response.data);
  } catch (err) {
    console.log(err.message);
  }
};

const leaveGroup = async (group_id) => {
  try {
    console.log(group_id);
    await Api.put(
      `/groups/leave/${group_id}`,
      {},
      {
        headers: { "x-auth-token": getToken() },
      }
    );
    history.push(`/groups/`);
  } catch (err) {
    console.log(err.message);
  }
};

const getPostsForGroup = (group_id) => {
  return async (dispatch) => {
    try {
      const response = await Api.get(`/groups/${group_id}/posts`, {
        headers: { "x-auth-token": getToken() },
      });
      dispatch({ type: "GET_POSTS", payload: response.data });
    } catch (err) {
      console.log(err.message);
    }
  };
};

const updateGroup = async (id, formValues) => {
  try {
    const response = await Api.patch(
      `/groups/${id}`,
      {
        ...formValues,
      },
      {
        headers: { "x-auth-token": getToken() },
      }
    );
    if (response.status === 200) {
      return history.push(`/groups/${id}`);
    }
  } catch (err) {
    console.log(err.response.data);
  }
};

const deleteGroup = (id) => {
  return async (dispatch) => {
    try {
      const response = await Api.delete(`/groups/${id}`, {
        headers: { "x-auth-token": getToken() },
      });
      if (response.status === 200) {
        history.push("/groups");
        return dispatch({ type: "GET_GROUP", payload: null });
      }
    } catch (err) {
      console.log(err.message);
    }
  };
};

const removeMember = async (group_id, member_id) => {
  try {
    const response = await Api.put(
      `/groups/remove/${group_id}/member/${member_id}`,
      {},
      {
        headers: { "x-auth-token": getToken() },
      }
    );
    if (response.status === 200) {
      history.push(`/groups/${group_id}`);
    }
  } catch (err) {
    console.log(err.message);
  }
};

export default {
  getAllGroups,
  createGroup,
  getGroup,
  checkIsMember,
  checkPrivacy,
  requestGroup,
  addMember,
  leaveGroup,
  cancelRequest,
  checkIsRequested,
  getPostsForGroup,
  getRequests,
  updateGroup,
  deleteGroup,
  getMembers,
  removeMember,
};
