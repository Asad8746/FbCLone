const pagination = "pagination";
const group = "group";
const page = "page";
const comment = "comment";
const auth = "auth";
const check = "check";
const profile = "profile";
const people = "people";
const posts = "posts";
const image = "image";
const block = "block";

export const paginationTypes = {
  setPageNumber: `${pagination}/setPageNumber`,
  incPageNumber: `${pagination}/incPageNumber`,
  hasMore: `${pagination}/setHasMore`,
  pageLimit: `${pagination}/pageLimit`,
  reset: `${pagination}/reset`,
};

export const groupTypes = {
  getGroups: `${group}/GET_GROUPS`,
  getMoreGroups: `${group}/GET_MORE_GROUPS`,
  resetGroups: `${group}/RESET_GROUPS`,
  getGroup: `${group}/GET_GROUP`,
  checkMember: `${group}/CHECK_MEMBER`,
  updateRequest: `${group}/UPDATE_REQUESTS`,
  updateMembers: `${group}/UPDATE_MEMBERS`,
  setAdmin: `${group}/SET_ADMIN`,
  setLoading: `${group}/SET_LOADING`,
};

export const pageTypes = {
  getPages: `${page}/GET_PAGES`,
  getMorePages: `${page}/GET_MORE_PAGES`,
  getPage: `${page}/GET_PAGE`,
  modifyPage: `${page}/MODIFY_PAGE`,
  updatePageLikes: `${page}/UPDATE_PAGE_LIKES`,
  resetPages: `${page}/RESET_PAGES`,
  reset: `${page}/RESET`,
  setLoading: `${page}/SET_LOADING`,
};

export const commentTypes = {
  getComments: `${comment}/getComments`,
  getMoreComments: `${comment}/getMoreComments`,
  setLoading: `${comment}/setLoading`,
  createComment: `${comment}/createComment`,
  deleteComment: `${comment}/deleteComment`,
  setTotal: `${comment}/setTotal`,
};

export const AuthTypes = {
  SET_AUTH: `${auth}/SET_AUTH`,
  SET_USER: `${auth}/SET_USER`,
  tokenCheck: `${auth}/CHECK`,
  login: `${auth}/LOGIN_USER`,
  register: `${auth}/REGISTER`,
  logout: `${auth}/LOGOUT`,
  reset: `${auth}/RESET`,
  setLoading: `${auth}/SET_LOADING`,
};
export const checkTypes = {
  checkUser: `${check}/CHECK_USER`,
};

export const profileTypes = {
  getProfile: `${profile}/SET_PROFILE`,
  setLoading: `${profile}/SET_LOADING`,
  reset: `${profile}/RESET_STATE`,
  error: `${profile}/ERROR`,
  getProfileID: `${profile}/GET_PROFILE_ID`,
  getFollowers: `${profile}/GET_FOLLOWERS`,
  getFollowing: `${profile}/GET_FOLLOWING`,
  createPost: `${profile}/CREATEPOST`,
  followUser: `${profile}/FOLLOW_USER`,
  unfollow: `${profile}/UNFOLLOW_USER`,
};

export const peopleTypes = {
  SET_PEOPLE: `${people}/FETCH_PEOPLE`,
  reset: `${people}/RESET`,
  setLoading: `${people}/SET_LOADING`,
};

export const postTypes = {
  reset: `${posts}RESET_POSTS`,
  setPosts: `${posts}GET_POSTS`,
  setMorePosts: `${posts}GET_MORE_POSTS`,
  createPost: `${posts}CREATE_POST`,
  updatePost: `${posts}UPDATE_POST`,
  incPostComments: `${posts}INC_POST_COMMENTS`,
  decPostComments: `${posts}DEC_POST_COMMENTS`,
  deletePost: `${posts}DELETE_POST`,
  setPost: `${posts}/GET_POST`,
  setLoading: `${posts}/SET_LOADING`,
};

export const imageTypes = {
  setImage: `${image}/SET_IMAGE`,
};

export const blockTypes = {
  checkIsBLocked: `${block}/CHECK_IS_BLOCKED`,
  setBlockedUsers: `${block}/BLOCKED_USERS`,
  setLoading: `${block}/SET_LOADING`,
  reset: `${block}/RESET`,
  resetBlockState: `${block}/RESET_BLOCK_STATE`,
  setBlockStatus: `${block}/SET_BLOCK_STATUS`,
  setMessage: `${block}/SET_MESSAGE`,
};
