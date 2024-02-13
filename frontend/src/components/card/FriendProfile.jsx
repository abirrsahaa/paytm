import React from "react";
import { useSelector } from "react-redux";
// import store from "../../store/store";

const FriendProfile = () => {
  const naam = useSelector((store) => store.friend.dost);
  return (
    <div className="ml-2 mt-8 p-1 flex items-center gap-2">
      <div className="w-[3vw] h-[3vw] rounded-full bg-green-500 text-white flex justify-center items-center text-2xl">
        {naam && naam[0]}
      </div>
      {naam && <span className="text-2xl font-bold">{naam}</span>}
    </div>
  );
};

export default FriendProfile;
