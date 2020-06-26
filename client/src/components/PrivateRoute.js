import React from "react";
import { Route, Redirect } from "react-router-dom";

//rest operator (looks a lot like spread operator)
const Privateroute = ({ component: Component, ...rest }) => {
  const token = window.localStorage.getItem("token");
  return (
    <Route
      {...rest}
      render={props => {
        if (token) {
          //return the component
          return <Component {...props} />;
        } else {
          //redirect the user to login
          return <Redirect to='./Login' />;
        }
      }}
    />
  );
};

export default Privateroute;