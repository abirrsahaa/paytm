import React from "react";
import Card from "../components/card/Card";

const Signin = () => {
  return (
    <div className="w-full h-screen flex justify-center items-center bg-slate-600">
      <Card
        header="Sign In"
        headerText="Enter your credentials to access your account"
        cardWarn="Don't have an account?"
        linking="Sign Up"
      />
    </div>
  );
};

export default Signin;
