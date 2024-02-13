import React from "react";

const Balance = ({ balance }) => {
  return (
    <div className="p-4 m-2 mt-3 mb-3">
      <span className="text-xl font-bold ">Your Balance ${balance}</span>
    </div>
  );
};

export default Balance;
