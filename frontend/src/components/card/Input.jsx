import React from "react";

const Input = ({
  labelclass = "",
  label = "",
  value,
  type = "text",
  classname = "",
  placeholder = "",
  setUsername,
  setFirstName,
  setLastName,
  setPassword,
  setEmail,
  setAmount,
  setSearchUser,
  ...props
}) => {
  return (
    <div className=" mt-2 mb-1 p-1">
      {label && (
        <label className={`${labelclass} m-2 mb-1.5 block `}>{label}</label>
      )}
      {label === "Username" && (
        <input
          type={type}
          value={value}
          onChange={(e) => {
            console.log(value);
            setUsername(e.target.value);
          }}
          className={`border-2 border-black border-solid w-[90%] p-1 pl-4 m-2 h-[2.9vw] rounded-lg`}
          placeholder={placeholder}
        />
      )}
      {label === "First Name" && (
        <input
          type={type}
          value={value}
          onChange={(e) => {
            console.log(value);
            setFirstName(e.target.value);
          }}
          className={`border-2 border-black border-solid w-[90%] p-1 pl-4 m-2 h-[2.9vw] rounded-lg`}
          placeholder={placeholder}
        />
      )}
      {label === "Last Name" && (
        <input
          type={type}
          value={value}
          onChange={(e) => {
            console.log(value);
            setLastName(e.target.value);
          }}
          className={`border-2 border-black border-solid w-[90%] p-1 pl-4 m-2 h-[2.9vw] rounded-lg`}
          placeholder={placeholder}
        />
      )}
      {label === "Email" && (
        <input
          type={type}
          value={value}
          onChange={(e) => {
            console.log(value);
            setEmail(e.target.value);
          }}
          className={`border-2 border-black border-solid w-[90%] p-1 pl-4 m-2 h-[2.9vw] rounded-lg`}
          placeholder={placeholder}
        />
      )}
      {label === "Password" && (
        <input
          type={type}
          value={value}
          onChange={(e) => {
            console.log(value);
            setPassword(e.target.value);
          }}
          className={`border-2 border-black border-solid w-[90%] p-1 pl-4 m-2 h-[2.9vw] rounded-lg`}
          placeholder={placeholder}
        />
      )}
      {label === "Amount (in Rs) " && (
        <input
          type={type}
          value={value}
          onChange={(e) => {
            console.log(value);
            setAmount(e.target.value);
          }}
          className={`border-2 border-black border-solid w-[90%] p-1 pl-4 m-2 h-[2.9vw] rounded-lg`}
          placeholder={placeholder}
        />
      )}
      {label === "Users" && (
        <input
          type={type}
          value={value}
          onChange={(e) => {
            console.log(value);
            setSearchUser(e.target.value);
          }}
          className={`border-2 border-black border-solid w-[90%] p-1 pl-4 m-2 h-[2.9vw] rounded-lg`}
          placeholder={placeholder}
        />
      )}
    </div>
  );
};

export default Input;
