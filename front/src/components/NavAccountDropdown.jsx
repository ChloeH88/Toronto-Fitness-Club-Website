import * as React from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import Divider from '@mui/material/Divider';

const NavAccountDropdown = ({ user, logout }) => {
  const [open, setOpen] = React.useState(false);

  return (
    <div>
      <button 
        onClick={() => {setOpen(!open)}}
      >
        <img 
          className="h-10 rounded-full hover:brightness-90"
          src={user.avatar ? `http://127.0.0.1:8000/${user.avatar}` : '/user.svg'}
        />
      </button>
      {open &&
      <div className="relative">
        <div className="absolute bg-white text-base right-1 z-50 list-none divide-y divide-gray-100 rounded shadow my-3">
          <div className="inset-x-20 left-10 py-3 p-5">
            <span className="block text-sm">{`${user.first_name} ${user.last_name}`}</span>
            <span className="block text-sm font-medium text-gray-900 truncate">{user.email}</span>
            <ul className="py-1" aria-labelledby="dropdownDefault">
              <li>
                  <Link to="/edit/" className="text-sm hover:bg-gray-100 text-gray-700 block p-2 rounded">Edit account</Link>
                  <Divider sx={{my:0.5}}></Divider>
                  <Link to="/myClasses/" className="text-sm hover:bg-gray-100 text-gray-700 block p-2 rounded">My Classes</Link>
                  <Divider sx={{my:0.5}}></Divider>
                  <Link to="/subscriptions/" className="text-sm hover:bg-gray-100 text-gray-700 block p-2 rounded">My Subscription</Link>
                  <Divider sx={{my:0.5}}></Divider>
                  <Link to="/myPayments/" className="text-sm hover:bg-gray-100 text-gray-700 block p-2 rounded">My Payments</Link>
                  <Divider sx={{my:0.5}}></Divider>
                  <Link onClick={logout} className="text-sm hover:bg-gray-100 text-gray-700 block p-2 rounded">Logout</Link>
              </li>
            </ul>
          </div>
        </div>
      </div>
      }
    </div>
  );
}

export default NavAccountDropdown;
