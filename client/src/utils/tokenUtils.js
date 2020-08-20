export const getToken = () => {
  return localStorage.getItem("token");
};

export const setToken = (headers) => {
  const token = headers["x-auth-token"];
  localStorage.setItem("token", token);
};

export const removeToken = () => {
  localStorage.removeItem("token");
};
