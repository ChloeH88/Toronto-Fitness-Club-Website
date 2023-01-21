import * as React from "react";
import { useEffect } from 'react';
import axios from "axios";
import Navigation from "../components/Navigation";
import RegisterBox from "../components/accounts/RegisterBox";

const Login = () => {
  return (
    <>
      <Navigation />
      <div className="mt-10">
        <RegisterBox type="Login" />
      </div>
    </>
  );
};

export default Login;
