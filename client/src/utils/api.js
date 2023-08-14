import axios from "axios";

const Axios = axios.create({
  baseURL: "http://localhost:8888", // This corresponds to the path you set up in the proxy
});

export default Axios;
