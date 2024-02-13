import React, { useEffect, useState } from "react";
import Header from "./Header";
import Balance from "./Balance";
import UserSearch from "./UserSearch";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
// import { set } from "mongoose";

const Dashboard = () => {
  // const [got, setgot] = useState(false);
  const [details, setdetails] = useState({});
  const token = useSelector((store) => store.token.token);
  useEffect(() => {
    const fetching = async () => {
      const response = await fetch(
        "http://localhost:3000/api/v1/account/balance",
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`,
          },
        }
      );
      const details = await response.json();
      console.log("the details are --> ", details);
      setdetails(details);
    };
    fetching();
  }, []);
  return (
    <div className="bg-white w-full h-screen">
      {details.name && <Header name={details.name} />}
      {details.balance && <Balance balance={details.balance} />}
      <UserSearch />
      {!token && <Navigate to="/signin" />}
    </div>
  );
};

export default Dashboard;
