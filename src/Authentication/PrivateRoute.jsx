import React from "react";
import UseAuth from "../Hooks/UseAuth";
import Loader from "./Loader";
import { Navigate, useLocation } from "react-router";

const PrivateRoute = ({ children }) => {
  const { user, loading } = UseAuth();
  const location = useLocation()

  if (loading) {
    return <Loader></Loader>;
  }

  if (user && user?.email) {
    return <div>{children}</div>;
  }
  else{
    return <Navigate state={location.pathname} to='/login'></Navigate>
  }
};

export default PrivateRoute;
