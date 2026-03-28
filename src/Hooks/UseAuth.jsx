import React, { use } from "react";
import { AuthContext } from "../Authentication/AuthProvider";

const UseAuth = () => {
  
  return use(AuthContext);
};

export default UseAuth;
