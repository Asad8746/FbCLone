import axios from "axios";
import { getToken } from "../utils/tokenUtils";
import runTimeEnv from "@mars/heroku-js-runtime-env";
const env = runTimeEnv();
export const url =
  process.env.NODE_ENV === "production"
    ? env.REACT_APP_URL
    : "http://localhost:5000";

const Api = axios.create({
  baseURL: url,
});
Api.interceptors.request.use((config) => {
  const token = getToken();
  const customHeaders = token ? { "x-auth-token": token } : {};
  config.headers = { ...config.headers, ...customHeaders };
  return config;
});

export default Api;
