import axios from "axios";
import React from "react";
const AxiosInstance = axios.create({
    baseURL: 'http://localhost:3000'
})
const UseAxios = () => {
  return {AxiosInstance};
};

export default UseAxios;
