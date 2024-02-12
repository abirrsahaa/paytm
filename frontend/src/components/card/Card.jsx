import React, { useState } from "react";
import HeaderCard from "./HeaderCard";
import HeaderCardText from "./HeaderCardText";
import Input from "./Input";
import Button from "./Button";
import CardWarnText from "./CardWarnText";
import FriendProfile from "./FriendProfile";
import { Navigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setting } from "../../store/tokenSlice";

const Card = ({
  header = "",
  headerText = "",
  cardWarn = "",
  linking = "",
}) => {
  // now i need to decide how this same card will serve different purposes

  // handling backennd for sign in and sign up and send money also

  // first lets write all the logic for everything here then i will be performing seperation of concerns

  // so for every three things mentioned i need to extract the data from the user and then send it to the backend
  // and everything will be on click of the button

  // i need state variables for keeping track of the input fields and then i need to send them to the backend
  // so for every field start defining the state variables and then the onchange functions and then the onsubmit functions
  const [username, setUsername] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [amount, setAmount] = useState("");
  const [user, setUser] = useState(false);
  // will be using three button handlers as everything will be handled on clicking on the button !
  // now that i have track of every input its my turn to send them to the backend
  // i will be using fetch api to send the data to the backend
  const dispatch = useDispatch();
  // handling the urls
  const signupRoute = "http://localhost:3000/api/v1/user/signup";
  const signinRoute = "http://localhost:3000/api/v1/user/signin";
  const transferRoute = "http://localhost:3000/api/v1/account/transfer";

  // getting the token from my store
  // i dont think i need it !

  // creating the function for signin
  const signinHandler = async () => {};

  // creating the function for signup

  const signupHandler = async () => {
    console.log("the signup handler is called");
    console.log("the data ->", username, password, firstName, lastName, email);
    const signingup = await fetch(signupRoute, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username: username,
        password: password,
        firstname: firstName,
        lastname: lastName,
        email: email,
      }),
    });
    const response = await signingup.json();
    console.log("the response ->", response);
    // here i place of error i will be playing with react toastify
    if (response.success) {
      alert("User created successfully");
      setUser(true);
      console.log(response.token);
      dispatch(setting(response.token));
    } else {
      alert("User creation failed");
    }
  };

  // creating the function for send money

  const transferHandler = async () => {};

  return (
    <div className="w-[25vw] flex flex-col justify-center items-center p-2 bg-slate-50 relative   rounded-lg">
      <div className="flex flex-col justify-center items-center">
        <HeaderCard text={header} />
        <HeaderCardText text={headerText} />
      </div>

      <div className="w-full ">
        {header == "Send Money" && <FriendProfile />}
        {(header === "Sign Up" || header == "Sign In") && (
          <Input
            label="Username"
            value={username}
            setUsername={setUsername}
            type="text"
          />
        )}
        {header === "Sign Up" && (
          <Input
            label="First Name"
            value={firstName}
            setFirstName={setFirstName}
            type="text"
            placeholder="John"
            labelclass={"text-sm font-bold text-black"}
          />
        )}
        {header === "Sign Up" && (
          <Input
            label="Last Name"
            value={lastName}
            setLastName={setLastName}
            type="text"
            placeholder="Doe"
          />
        )}
        {(header === "Sign Up" || header == "Sign In") && (
          <Input
            label="Email"
            value={email}
            setEmail={setEmail}
            type="email"
            placeholder="johndoe@example.com"
          />
        )}
        {(header === "Sign Up" || header == "Sign In") && (
          <Input
            label="Password"
            value={password}
            setPassword={setPassword}
            type="password"
          />
        )}
        {header === "Send Money" && (
          <Input
            label="Amount (in Rs) "
            value={amount}
            setAmount={setAmount}
            type="number"
            placeholder="Enter Amount"
          />
        )}
        {header == "Sign In" && (
          <Button classname={"bg-black"} text="Sign In" />
        )}
        {header == "Sign Up" && (
          <Button
            classname={"bg-black"}
            text="Sign Up"
            getting={signupHandler}
          />
        )}
        {header == "Send Money" && (
          <Button classname={"bg-green-500"} text="Initiate Transfer" />
        )}
        {(header == "Sign In" || header == "Sign Up") && (
          <CardWarnText text={cardWarn} linking={linking} />
        )}
        {user && <Navigate to="/dashboard" replace={true} />}
      </div>
    </div>
  );
};

export default Card;
