import * as React from "react";
import { useEffect, useState } from 'react';
import Navigation from "../components/Navigation";
import axios from "axios";
import { Link } from 'react-router-dom'
import LoadingCircle from "../components/LoadingCircle";

const Root = () => {
  const [user, setUser] = useState(null);

  const getUserInfo = async () => {
    try {
      const token = JSON.parse(localStorage.getItem("userToken"));
      const { data } = await axios({
        method: "get",
        url: "http://127.0.0.1:8000/accounts/get/",
        headers: { Authorization: `Bearer ${token}` },
      });
      setUser(data);
    } catch (e) {
      setUser("none");
    }
  }
  
  useEffect(() => {
    getUserInfo();
  }, []);

  return (
    <div>
      <Navigation />
      <div className="flex justify-center font-bold my-10 text-2xl">
        Welcome to TFC!
      </div>
      <div className="flex justify-center font-bold my-10 text-2xl">
        <img src="/logo.png" alt="TFC Logo" />
      </div>
      { user === "none" ?
      <div className="flex justify-center my-10">
        <Link
          to="/register/"
          className="mt-5 text-white bg-orange-400 hover:bg-orange-600 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
        >
          Register
        </Link>
        <Link
          to="/login/"
          className="ml-3 mt-5 text-white bg-orange-400 hover:bg-orange-600 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
        >
          Login
        </Link>
      </div>
      :
      !user &&
      <div className="flex justify-center my-10">
        <LoadingCircle />
      </div>
    }
    </div>
  );
}

export default Root;
