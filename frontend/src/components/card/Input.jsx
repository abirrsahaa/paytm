import React from "react";

const Input = ({
  labelclass = "",
  label = "",
  type = "text",
  classname = "",
  placeholder = "",
  ...props
}) => {
  return (
    <div className=" mt-2 mb-1 p-1">
      {label && (
        <label className={`${labelclass} m-2 mb-1.5 block `}>{label}</label>
      )}
      <input
        type={type}
        className={`border-2 border-black border-solid w-[90%] p-1 pl-4 m-2 h-[2.9vw] rounded-lg`}
        placeholder={placeholder}
      />
    </div>
  );
};

export default Input;
