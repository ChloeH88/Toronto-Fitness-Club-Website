import * as React from "react";

const CardInfo = ({ card, setUpdateCard }) => {
  return (
    <>
      <div className="grid place-items-center mx-2 self-start">
        <div className="w-full max-w-sm p-4 bg-white border border-gray-200 rounded-lg shadow-md sm:p-6 md:p-8">
        <div className="font-bold mb-2 text-xl">Payment Information</div>
          { card?.card_num ?
          <>
            <span className="block text-sm mt-2">Card Holder: {card.cardholder}</span>
            <span className="block text-sm mt-2">Card Number: <span className="font-bold">{`***********${card.card_num.substr(-4)}`}</span></span>
            <span className="block text-sm font-medium text-gray-900 truncate mt-2">{}</span>
          </>
          :
          <div className="flex justify-center mt-2">
            <div className="mb-2 text-md">You do not have a card associated with this account</div>
          </div>
          }
          <button
              onClick={()=>{setUpdateCard(true)}}
              className="w-full mt-4 text-white bg-orange-400 hover:bg-orange-600 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
            >{ card?.card_num ? "Update payment info" : "Add payment info"}</button>
        </div>
      </div>
    </>
  );
};

export default CardInfo;
