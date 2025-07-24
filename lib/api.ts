import { baseURL } from "@/constant/statics";
import axios from "axios";

export const api = axios.create({
  baseURL: `${baseURL}/api`,
  withCredentials: true,

  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
    "Access-Control-Allow-Origin": baseURL,
    "Access-Control-Allow-Credentials": "true",
    "Access-Control-Allow-Headers": "Content-Type",
    "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE",
  },
});
