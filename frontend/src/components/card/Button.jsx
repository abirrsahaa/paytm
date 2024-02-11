import React from "react";

const Button = ({ classname, text = "", getting }) => {
  return (
    <div className="p-1 ">
      <button
        onClick={getting}
        className={`${classname}  text-white text-lg text-center font-semibold  w-[90%] p-1 pl-4 m-2 h-[2.9vw] rounded-lg`}
      >
        {text}
      </button>
    </div>
  );
};

export default Button;
