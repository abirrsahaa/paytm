import React from "react";

const FriendProfile = () => {
  return (
    <div className="ml-2 mt-8 p-1 flex items-center gap-2">
      <div className="w-[3vw] h-[3vw] rounded-full bg-green-500 text-white flex justify-center items-center text-2xl">
        A
      </div>
      <span className="text-2xl font-bold">Friend's Name</span>
    </div>
  );
};

export default FriendProfile;
