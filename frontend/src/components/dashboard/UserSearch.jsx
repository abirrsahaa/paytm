import React from "react";
import Input from "../card/Input";

const UserSearch = () => {
  return (
    <>
      <div className="p-4 m-2 mt-3 ">
        <Input
          label="Users"
          type="search"
          placeholder="Search User"
          labelclass={"text-2xl font-bold m-2 "}
        />
      </div>
      <div className="w-[90%]  m-2 flex flex-col justify-center items-center">
        <div className="shadow-lg w-[97%] p-1  m-2 h-[4.2vw] rounded-lg flex justify-between items-between">
          <div className="p-1 w-[10vw]  gap-2  flex items-center justify-between">
            <div className="bg-gray-200 h-[3vw] w-[3vw] rounded-full text-black flex justify-center items-center font-semibold text-xl">
              U1
            </div>
            <span className="text-3xl  font-bold tracking-tighter">User 1</span>
          </div>
          <button className="w-[8vw] h-[3vw] p-1 flex justify-center items-center tracking-tighter font-semibold border-black border-2 border-solid rounded-lg bg-black text-white">
            Send Money
          </button>
        </div>
        <div className="border-2 border-black border-solid w-[97%] p-1  m-2 h-[3vw] rounded-lg"></div>
        <div className="border-2 border-black border-solid w-[97%] p-1  m-2 h-[3vw] rounded-lg"></div>
      </div>
    </>
  );
};

export default UserSearch;
