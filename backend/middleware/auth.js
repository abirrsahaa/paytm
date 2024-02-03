import jwt_secret from "../config/jwt.js";
import jwt from "jsonwebtoken";

const authfunction = async (req, res, next) => {
  // now first develop the intuition
  // !doubt--? do i need zod validation for checking the token from header (#my view is no as it is not provided by the user)
  // !the problem statement says that i need to look for the token in the header
  //   console.log(req.headers);
  // so taking the value from header
  const token = req?.headers?.authorization.split(" ")[1];
  if (!token) {
    return res.status(411).json({ message: "no token provided in the header" });
  }
  // now we need to verify the token
  try {
    const verified = jwt.verify(token, jwt_secret);
    console.log("after jwt verify ", verified);
    if (!verified) {
      return res
        .status(411)
        .json({ message: "the token provided is not valid" });
    }
    const id = verified.id;
    req.userId = id;
    next();
  } catch (error) {
    console.log(error);
    return res.status(411).json({ message: "the token provided is not valid" });
  }
};

export default authfunction;
