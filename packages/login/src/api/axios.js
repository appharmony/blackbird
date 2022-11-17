import axios from "axios";
const BASE_URL =
  "http://auth-LoadBa-CGBE68BBZ13X-bf0d1207c1bf57b7.elb.us-east-1.amazonaws.com:8080";

export default axios.create({
  baseURL: BASE_URL,
});

export const axiosPrivate = axios.create({
  baseURL: BASE_URL,
  headers: { "Content-Type": "application/json" },
  withCredentials: true,
});
