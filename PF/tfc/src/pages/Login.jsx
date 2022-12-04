import * as React from "react";
import { useEffect } from 'react';
import axios from "axios";
import Navigation from "../components/Navigation";
import RegisterBox from "../components/RegisterBox";

const Login = () => {
  return (
    <>
      <Navigation />
      <RegisterBox isLogin={true} />
    </>
  );
};

export default Login;
