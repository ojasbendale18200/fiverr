import axios from "axios";

const newRequest = axios.create({
  baseURL: "https://fair-blue-cod-cape.cyclic.app/api/",
  withCredentials: true,
});

export default newRequest;
