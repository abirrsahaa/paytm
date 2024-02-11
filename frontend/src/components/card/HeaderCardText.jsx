import React from "react";

const HeaderCardText = ({ text }) => {
  return (
    <div className="  mt-2">
      <p className="flex justify-center items-center tracking-normal text-lg   text-center  m-1 pt-1 w-[19vw]">
        {text}
      </p>
    </div>
  );
};

export default HeaderCardText;
