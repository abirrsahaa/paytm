import React from "react";
import HeaderCard from "./HeaderCard";
import HeaderCardText from "./HeaderCardText";
import Input from "./Input";
import Button from "./Button";
import CardWarnText from "./CardWarnText";
import FriendProfile from "./FriendProfile";

const Card = ({
  header = "",
  headerText = "",
  cardWarn = "",
  linking = "",
}) => {
  return (
    <div className="w-[25vw] flex flex-col justify-center items-center p-2 bg-slate-50 relative   rounded-lg">
      <div className="flex flex-col justify-center items-center">
        <HeaderCard text={header} />
        <HeaderCardText text={headerText} />
      </div>

      <div className="w-full ">
        {header == "Send Money" && <FriendProfile />}
        {header === "Sign Up" && (
          <Input
            label="First Name"
            type="text"
            placeholder="John"
            labelclass={"text-sm font-bold text-black"}
          />
        )}
        {header === "Sign Up" && (
          <Input label="Last Name" type="text" placeholder="Doe" />
        )}
        {(header === "Sign Up" || header == "Sign In") && (
          <Input label="Email" type="email" placeholder="johndoe@example.com" />
        )}
        {(header === "Sign Up" || header == "Sign In") && (
          <Input label="Password" type="password" />
        )}
        {header === "Send Money" && (
          <Input
            label="Amount (in Rs) "
            type="number"
            placeholder="Enter Amount"
          />
        )}
        {header == "Sign In" && (
          <Button classname={"bg-black"} text="Sign In" />
        )}
        {header == "Sign Up" && (
          <Button classname={"bg-black"} text="Sign Up" />
        )}
        {header == "Send Money" && (
          <Button classname={"bg-green-500"} text="Initiate Transfer" />
        )}
        {(header == "Sign In" || header == "Sign Up") && (
          <CardWarnText text={cardWarn} linking={linking} />
        )}
      </div>
    </div>
  );
};

export default Card;
