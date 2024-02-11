import React from "react";

const HeaderCard = ({ text = "" }) => {
  return (
    <div className="font-bold text-4xl flex justify-center items-center leading-none tracking-tighter">
      {text}
    </div>
  );
};

export default HeaderCard;
