import React from "react";
import CheckIcon from '../CheckIcon';

const SubscriptionBox = ({disabled, plan, changePlan}) => {
  return (
    <div className="w-full max-w-sm p-4 mx-2 bg-white border rounded-lg shadow-md sm:p-8">
      <h5 className="mb-4 text-xl font-medium text-gray-500">
        {plan.billing_cycle}
      </h5>
      <div className="flex items-baseline text-gray-900">
        <span className="text-3xl font-semibold">$</span>
        <span className="text-5xl font-extrabold tracking-tight">{plan.price}</span>
        <span className="ml-1 text-xl font-normal text-gray-500"></span>
      </div>
      <ul role="list" className="space-y-5 my-7">
        <li className="flex space-x-3">
          <CheckIcon />
          <span className="text-base font-normal leading-tight text-gray-500 ">
            Full access to class enrollment
          </span>
        </li>
        <li className="flex space-x-3">
          <CheckIcon />
          <span className="text-base font-normal leading-tight text-gray-500">
            Access to studio amenities
          </span>
        </li>
        <li className="flex space-x-3">
          <CheckIcon />
          <span className="text-base font-normal leading-tight text-gray-500">
            Premium membership perks
          </span>
        </li>
        <li className={`flex space-x-3 ${plan.id === 1 && "line-through"} decoration-gray-500`}>
          <CheckIcon isDisabled={plan.id === 1} />
          <span className="text-base font-normal leading-tight text-gray-500">
            Save $4.66/month
          </span>
        </li>
      </ul>
      {!disabled ? (
        <button
          onClick={() => {changePlan(plan)}}
          type="button"
          className="text-white bg-orange-400 hover:bg-orange-600 focus:ring-4 focus:outline-none focus:ring-blue-200 font-medium rounded-lg text-sm px-5 py-2.5 inline-flex justify-center w-full text-center"
        >
          {" "}
          Choose plan
        </button>
      ) : (
        <button
          disabled
          type="button"
          onClick={() => {changePlan(plan)}}
          className="text-white bg-gray-600 hover:bg-gray-700 focus:ring-4 focus:outline-none focus:ring-blue-200 font-medium rounded-lg text-sm px-5 py-2.5 inline-flex justify-center w-full text-center"
        >
          Current Plan
        </button>
      )}
    </div>
  );
};

export default SubscriptionBox;
