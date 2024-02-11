import React from "react";
import { Link } from "react-router-dom";

const CardWarnText = ({ text = "", linking = "" }) => {
  return (
    <div className="w-full text-center">
      {text} {linking == "Login" && <Link to="/signin">{linking}</Link>}{" "}
      {linking == "Sign Up" && <Link to="/signup">{linking}</Link>}
    </div>
  );
};

export default CardWarnText;
