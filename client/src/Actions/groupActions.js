import Api from "../Api";
import history from "../history";
import { paginationTypes, groupTypes, imageTypes } from "../Reducers/constants";
import { transformGroup } from "../utils/transform";

export const getAllGroups = (type = "", pageNumber = 1) => {
  return async (dispatch, getState) => {
    try {
      let actionType = groupTypes.getGroups;
      const response = await Api.get(
        `/groups?type=${type}&pageNumber=${pageNumber}`
      );
      if (response.data.length === 0) {
        dispatch({ type: paginationTypes.hasMore, payload: false });
        dispatch({ type: groupTypes.setLoading, payload: false });
        return;
      }
      if (getState().group.groups.length > 0) {
        actionType = groupTypes.getMoreGroups;
      }

      dispatch({ type: actionType, payload: response.data });
    } catch (err) {
      console.log(err.message);
      dispatch({ type: groupTypes.setLoading, payload: false });
    }
  };
};
export const getRequests = (id) => {
  return async (dispatch) => {
    try {
      const response = await Api.get(`/groups/requests/${id}`);
      dispatch({ type: groupTypes.updateRequest, payload: response.data });
    } catch (err) {
      console.log(err.message);
      history.push("/expired");
    }
  };
};

export const getMembers = (id) => {
  return async (dispatch) => {
    try {
      const response = await Api.get(`/groups/members/${id}`);
      dispatch({ type: groupTypes.updateMembers, payload: response.data });
    } catch (err) {
      console.log(err.message);
      history.push("/expired");
    }
  };
};

export const createGroup = (formValues) => {
  return async (dispatch, getState) => {
    try {
      let formData = new FormData();
      formData.append("name", formValues.name);
      formData.append("description", formValues.description);
      formData.append("group_privacy", formValues.privacy);

      if (getState().image) {
        formData.append("file", getState().image);
      }
      const response = await Api.post("/groups/", formData);
      if (response.status === 201) {
        dispatch({ type: imageTypes.setImage, payload: null });
        return history.push("/groups");
      }
    } catch (err) {
      console.log(err.message);
    }
  };
};

export const getGroup = (id) => {
  return async (dispatch, getState) => {
    try {
      const response = await Api.get(`/groups/${id}`);
      if (response.status === 200) {
        const { _id: admin_id } = response.data.group_admin_id;
        const { id: auth_id } = getState().Authentication;
        dispatch({ type: groupTypes.setAdmin, payload: admin_id === auth_id });
        dispatch({
          type: groupTypes.getGroup,
          payload: transformGroup(response.data),
        });
        return;
      }
    } catch (err) {
      if (err.response) {
        console.log(err.response.data);
      } else {
        console.log(err.message);
      }
    }
  };
};

export const resetGroups = () => {
  return { type: groupTypes.resetGroups };
};

export const checkIsMember = (id) => {
  return async (dispatch) => {
    try {
      const response = await Api.get(`/groups/check/${id}`);
      dispatch({ type: groupTypes.checkMember, payload: response.data });
    } catch (err) {
      console.log(err.message);
    }
  };
};

export const requestGroup = async (id, setState) => {
  try {
    await Api.put(`/groups/request/${id}`);
    setState(true);
  } catch (err) {
    setState(false);
    console.log(err.message);
  }
};
export const cancelRequest = async (id, setState) => {
  try {
    await Api.put(`/groups/cancelRequest/${id}`);
    setState(false);
  } catch (err) {
    console.log(err.message);
  }
};

export const addMember = async (member_id, group_id) => {
  try {
    await Api.put(`/groups//add/${group_id}/member/${member_id}`);
    history.push(`/groups/${group_id}`);
  } catch (err) {
    console.log(err.message);
  }
};
export const checkIsRequested = async (id, setState) => {
  try {
    const response = await Api.get(`/groups/check/${id}/request`);
    setState(response.data);
  } catch (err) {
    console.log(err.message);
  }
};

export const leaveGroup = async (group_id) => {
  try {
    await Api.put(`/groups/leave/${group_id}`);
    history.push(`/groups/`);
  } catch (err) {
    console.log(err.message);
  }
};

export const updateGroup = async (id, formValues) => {
  try {
    const response = await Api.patch(`/groups/${id}`, {
      ...formValues,
    });
    if (response.status === 200) {
      return history.push(`/groups/${id}`);
    }
  } catch (err) {
    console.log(err.response.data);
  }
};

export const deleteGroup = (id) => {
  return async (dispatch) => {
    try {
      const response = await Api.delete(`/groups/${id}`);
      if (response.status === 200) {
        history.push("/groups");
        return dispatch({ type: "GET_GROUP", payload: null });
      }
    } catch (err) {
      console.log(err.message);
    }
  };
};

export const removeMember = async (group_id, member_id) => {
  try {
    const response = await Api.put(
      `/groups/remove/${group_id}/member/${member_id}`
    );
    if (response.status === 200) {
      history.push(`/groups/${group_id}`);
    }
  } catch (err) {
    console.log(err.message);
  }
};

// export default {
//   getAllGroups,
//   createGroup,
//   getGroup,
//   checkIsMember,
//   checkPrivacy,
//   requestGroup,
//   addMember,
//   leaveGroup,
//   cancelRequest,
//   checkIsRequested,
//   getPostsForGroup,
//   getRequests,
//   updateGroup,
//   deleteGroup,
//   getMembers,
//   removeMember,
// };
