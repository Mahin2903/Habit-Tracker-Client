import axios from "axios";
import React from "react";
const AxiosInstance = axios.create({
  baseURL: "https://habit-tracker-blue-kappa.vercel.app",
});
const UseAxios = () => {
  return { AxiosInstance };
};

export default UseAxios;
