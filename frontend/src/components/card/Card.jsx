import React from "react";
import HeaderCard from "./HeaderCard";
import HeaderCardText from "./HeaderCardText";
import Input from "./Input";
import Button from "./Button";
import CardWarnText from "./CardWarnText";
import FriendProfile from "./FriendProfile";

const Card = () => {
  return (
    <div className="w-[25vw] flex flex-col justify-center items-center p-2 bg-slate-50 relative   rounded-lg">
      <div className="flex flex-col justify-center items-center">
        <HeaderCard />
        {/* <HeaderCardText /> */}
      </div>

      <div className="w-full ">
        <FriendProfile />
        {/* <Input label="First Name" type="text" placeholder="John" labelclass={} /> */}
        {/* <Input label="Last Name" type="text" placeholder="Doe" /> */}
        {/* <Input label="Email" type="email" placeholder="johndoe@example.com" /> */}
        {/* <Input label="Password" type="password" /> */}
        <Input
          label="Amount (in Rs) "
          type="number"
          placeholder="Enter Amount"
        />
        <Button classname={"bg-green-500"} />
        {/* <CardWarnText /> */}
      </div>
    </div>
  );
};

export default Card;
