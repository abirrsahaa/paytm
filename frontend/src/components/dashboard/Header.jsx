import React from "react";

const Header = ({ name }) => {
  return (
    <div className="w-full pb-6 m-2 p-2 flex justify-between items-center border-b-2 border-solid border-gray-200">
      <div className="w-[15vw] p-2  text-2xl font-bold tracking-tighter">
        Payments App
      </div>
      <div className="w-[13vw] p-2  flex gap-3 justify-center items-center">
        <span className="text-xl font-semibold tracking-tighter ">
          Hello, {name}{" "}
        </span>
        <div className="h-[2.5vw] w-[2.5vw] rounded-full bg-gray-200 text-black flex justify-center items-center text-2xl">
          U
        </div>
      </div>
    </div>
  );
};

export default Header;
