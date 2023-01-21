import * as React from 'react';
import { useEffect, useState } from 'react';
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import NavAccountDropdown from './NavAccountDropdown';
import LoadingCircle from './LoadingCircle';

const NavAccount = () => {
  const [user, setUser] = useState("loading");
  const navigate = useNavigate();

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
      setUser(null);
    }
  }

  const logout = async (form) => {
    try {
      const token = JSON.parse(localStorage.getItem("userToken"));
      const res = await axios({
        method: "get",
        url: "http://127.0.0.1:8000/accounts/logout/",
        headers: { Authorization: `Bearer ${token}` },
      });
    } catch (e) {
      
    }
    localStorage.clear()
    setUser(null);
    navigate('/');
  };

  useEffect(() => {
    getUserInfo();
  }, []);

  return (
    <>
      {(() => {
        if (user === "loading") {
          return (
            <LoadingCircle />
          )
        } else if (user === null) {
          return (
            <ul className="flex p-4 flex-row space-x-8 mt-0 text-sm font-medium border-0">
              <li>
                <Link
                  to="/register/"
                  className="block text-gray-700 hover:text-blue-600 p-0 text-sm"
                >
                  Register
                </Link>
              </li>
              <li>
                <Link
                  to="/login/"
                  className="block text-gray-700 hover:text-blue-600 p-0 text-sm"
                >
                  Login
                </Link>
              </li>
            </ul>
          )
        } else {
          return <NavAccountDropdown
            user={user}
            logout={logout}
          />
        }
      })()}
    </>
  );
}

export default NavAccount;