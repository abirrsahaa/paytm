import React from "react";
import Header from "./Header";
import Balance from "./Balance";
import UserSearch from "./UserSearch";

const Dashboard = () => {
  return (
    <div className="bg-white w-full h-screen">
      <Header />
      <Balance />
      <UserSearch />
    </div>
  );
};

export default Dashboard;
