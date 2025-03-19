import React, { useState } from "react";
import HeaderCard from "./HeaderCard";
import HeaderCardText from "./HeaderCardText";
import Input from "./Input";
import Button from "./Button";
import CardWarnText from "./CardWarnText";
import FriendProfile from "./FriendProfile";
import { Navigate, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setting } from "../../store/tokenSlice";
import axios from "axios";

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
  const [amount, setAmount] = useState(0);
  const [user, setUser] = useState(false);
  const navigate=useNavigate();
  // will be using three button handlers as everything will be handled on clicking on the button !
  // now that i have track of every input its my turn to send them to the backend
  // i will be using fetch api to send the data to the backend
  const dispatch = useDispatch();
  // handling the urls
  const signupRoute = "http://localhost:3000/users";
  const signinRoute = "http://localhost:3000/api/v1/user/signin";
  const transferRoute = "http://localhost:3000/api/v1/account/transfer";

  // getting the token from my store
  // i dont think i need it !

  // creating the function for signin
  // idhar hi alteration karni padegi mujhe 
  const signinHandler = async () => {

    

    const user_data=await axios.get("http://localhost:3000/users");
    const account_data=await axios.get("http://localhost:3000/accounts");

    const finding_username=user_data.data.filter((e)=>e.username==username);
    if(finding_username){
      console.log("the finding_username is ",finding_username);
      console.log("the password is ",password)
      console.log(typeof(finding_username.password))
      console.log(typeof(password));
      if(finding_username[0].password==password){
        
       
        // abhi iska account details nikalo 
        const user_account=account_data.data.filter((e)=>e.user_id==finding_username[0].id);
        setUser(true);
        dispatch(setting({
          name:finding_username[0].firstname,
          balance:user_account[0].balance
        }))
        alert("chalo sab sorted hai ab");
        // redirect karna hai shayad 
        navigate("/dashboard");
        
      }else{
        alert("password galat dala hai ");
        return;
      }

    }else{
      alert("No such user with firstname");
      return;
    }



    // const response = await signingIn.json();

    // console.log(" the response from the signin is --> ", response);
    // if (response.success) {
    //   alert("User signed in successfully");
    //   setUser(true);
    //   dispatch(setting(response.token));
    // } else {
    //   alert("User sign in failed");
    // }
  };

  // creating the function for signup
// same alteration idhar bhi mujhe karni padegi
  const signupHandler = async () => {
    console.log("the signup handler is called");
    console.log("the data ->", username, password, firstName, lastName, email);
    const getting_data=await axios.get("http://localhost:3000/users");
    const length=(getting_data.data.length)+1;

    const signingup = await fetch(signupRoute, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        id:length.toString(),
        username: username,
        password: password,
        firstname: firstName,
        lastname: lastName,
        email: email,
      }),
    });
    const response = await signingup.json();
    console.log("the response ->", response);
    // idhar account bhi create kar 
    // balance: 1 + Math.floor(Math.random() * 10000),
    const account_getting=await axios.get("http://localhost:3000/accounts");
    const length_account=account_getting.data.length+1;
    const final_length="100"+length_account;
    const creating_account=await fetch("http://localhost:3000/accounts",{
      method:"POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        id:final_length,
        user_id:response.id,
        balance:1 + Math.floor(Math.random() * 10000)
      }),
    });
    const account_info=await creating_account.json();
    dispatch(setting({
      name:response.firstname,
      balance:account_info.balance
    }));
    alert("Hey the user is created and also the amount for the user ");
    // redirect karna hoga shayad 

    // here i place of error i will be playing with react toastify
    // if (response.success) {
    //   alert("User created successfully");
    //   setUser(true);
    //   console.log(response.token);
    //   dispatch(setting(response.token));
    // } else {
    //   alert("User creation failed");
    // }
    // agar mai user signup kar rha hu toh uska mujhe account bhi banana hoga 

  };

  // creating the function for send money
  // const name = useSelector((store) => store.friend.dost);
  const to = useSelector((store) => store.friend.id);
  const token = useSelector((store) => store.token.token);

  // idhar bhi changes karne padenge 
  const transferHandler = async () => {
    // write the logic first
    // you need to pass the body with the name and amount
    // name i will be getting from the redux store
    // amount i will be getting from the state variable
    // and then i will be getting the reponse from an api call
    // which i will be making by setting my token from again the store
    const converted = Number(amount);
    console.log("the type of amount is --> ", typeof converted);
    const reponseTransfer = await fetch(transferRoute, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`,
      },
      body: JSON.stringify({
        to: to,
        amount: converted,
      }),
    });

    const response = await reponseTransfer.json();
    console.log("the response from the transfer is --> ", response);
    if (response.success) {
      alert("Transfer successful");
      setUser(true);
    } else {
      alert("Transfer failed");
    }
  };

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
          <Button
            classname={"bg-black"}
            text="Sign In"
            getting={signinHandler}
          />
        )}
        {header == "Sign Up" && (
          <Button
            classname={"bg-black"}
            text="Sign Up"
            getting={signupHandler}
          />
        )}
        {header == "Send Money" && (
          <Button
            classname={"bg-green-500"}
            text="Initiate Transfer"
            getting={transferHandler}
          />
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
