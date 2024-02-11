import React from "react";
import Card from "../components/card/Card";

const SignUp = () => {
  return (
    <div className="w-full h-screen flex justify-center items-center bg-slate-600">
      <Card
        header="Sign Up"
        headerText="Enter your information to create an account"
        cardWarn="Already have an account?"
        linking="Login"
      />
    </div>
  );
};

export default SignUp;
