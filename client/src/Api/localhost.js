import axios from "axios";

const token = sessionStorage.getItem("token") || null;

export default axios.create({
    baseURL:"http://localhost:5000",
    headers : {"x-auth-token":token}
}
)