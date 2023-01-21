import { alpha } from "@mui/material";
import * as React from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useRef } from "react";

const CardBox = (props) => {
  const { isAdd } = props;
  const navigate = useNavigate();

  const getErrorMessage = (e) => {
    console.log(Object.values(e))
    let fullMessage = "Please fix the following errors: ";
    e.values().forEach(message => {
      fullMessage += `- ${message}\n`;
    })
    return fullMessage;
  };


  const add = async (form) => {
    try {
      const token = JSON.parse(localStorage.getItem("userToken"));
      const res = await axios({
        method: "post",
        url: "http://127.0.0.1:8000/subscriptions/card/add/",
        data: form,
        headers: { Authorization: `Bearer ${token}` },
      });
      alert("Payment Information Added");
      window.location.replace("/edit/");
    } catch (e) {
      alert(getErrorMessage(e));
    }
  };

  const update = async (form) => {  
    try {
      const token = JSON.parse(localStorage.getItem("userToken"));
      const res = await axios({
        method: "put",
        url: "http://127.0.0.1:8000/subscriptions/card/update/",
        data: form,
        headers: { Authorization: `Bearer ${token}` },
      });
      alert("Payment Information Updated");
      window.location.replace("/edit/");
    } catch (e) {
      alert(getErrorMessage(e));
    }
  };

  return (
    <>
      <div className="grid place-items-center mx-2 self-start border-l">
        <div className="w-full max-w-sm p-4 bg-white border border-gray-200 rounded-lg shadow-md sm:p-6 md:p-8">
          <div className="font-bold mb-2">Card Information</div>
          <form className="space-y-6" onSubmit={event => {
              (isAdd ? add : update)(new FormData(event.target));
              event.preventDefault();
            }}>
            <div>
              <label
                htmlFor="card_num"
                className="block mb-2 text-sm font-medium text-gray-900"
              >
                Card Number
              </label>
              <input
                type="text"
                name="card_num"
                id="card_num"
                minlength="16" 
                maxlength="16"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                placeholder="Card Number"
                required
              />
            </div>
            <div>
              <label
                htmlFor="cardholder"
                className="block mb-2 text-sm font-medium text-gray-900"
              >
                Card Holder
              </label>
              <input
                type="text"
                name="cardholder"
                id="cardholder"
                placeholder="Card Holder"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                required
              />
            </div>
            <div>
              <label
                htmlFor="expiry_date"
                className="block mb-2 text-sm font-medium text-gray-900"
              >
                Expiry Date
              </label>
              <input
                type="date"
                name="expiry_date"
                id="expiry_date"
                placeholder="1980-01-01"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                required
              />
            </div>
            <div>
              <label
                htmlFor="CVV"
                className="block mb-2 text-sm font-medium text-gray-900"
              >
                CVV
              </label>
              <input
                type="text"
                name="CVV"
                id="CVV"
                placeholder="123"
                minlength="3" 
                maxlength="3"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                required
              />
            </div>
            <button
              type="submit"
              className="w-full text-white bg-orange-400 hover:bg-orange-600 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
            >
              {isAdd ? "Add Card" : "Update Card"}
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default CardBox;
