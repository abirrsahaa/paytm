import express from "express";
import { z } from "zod";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import jwt_secret from "../config/jwt.js";
const router = express.Router();
router.use(express.json());
import User from "../models/user.js";
import authfunction from "../middleware/auth.js";
import { Account } from "../models/user.js";

// need to make routes for the user
// the first route is to sign up the user

// created the signup router

router.use(express.json());

router.post("/signup", async (req, res) => {
  // write the algorithm that you want ..
  // first use zod for validation
  //   console.log("the request ->", req);

  console.log("body data -> ", req.body);
  const signupInput = z.object({
    username: z.string().min(4).max(20),
    password: z.string().min(8),
    firstname: z.string().min(2).max(20),
    lastname: z.string().min(2).max(20),
    email: z.string().email(),
  });
  console.log(typeof req.body);
  console.log(typeof req.body.username);
  //   !the zod validations have been provided
  // then we will be extracting the data from the body
  //   const { username, password, firstname, lastname, email } = req.body;
  //   console.log("before parsing", username, password, firstname, lastname, email);
  let parsedInput = signupInput.safeParse(req.body);
  console.log("after parsing ", parsedInput);
  if (!parsedInput.success) {
    return res.status(411).json({ Zod_error: parsedInput.error });
  }
  const { username, password, firstname, lastname, email } = parsedInput.data;
  // then we will be checking wether such user exists previously or not
  const existing = await User.findOne({
    $or: [{ username }, { email }],
  });
  // if present then we need to send a error
  if (existing) {
    return res.status(411).json({
      success: false,
      message: "Email already taken / Incorrect inputs",
    });
  }

  const hashed = await bcrypt.hash(password, 10);

  const user = await User.create({
    username,
    hashed_password: hashed,
    firstname,
    lastname,
    email,
  });

  // now that the user has been created lets also initialize the account for the user
  const account = await Account.create({
    user_id: user._id,
    balance: 1 + Math.floor(Math.random() * 10000),
  });
  // if not present then we need to hash the password  then create a entry in the database
  // then create a jwt token with the id of the user
  const token = jwt.sign(
    {
      id: user._id,
    },
    jwt_secret,
  );

  const created_user = await User.findById(user._id).select("-hashed_password");

  return res.status(200).json({
    success: true,
    message: "User created successfully",
    token: token,
    created_user: created_user,
  });
});

// created the signin router for the user

router.post("/signin", async (req, res) => {
  console.log("checking the headers content --> ", req.headers);
  // implement zod validation for it
  const signinInput = z.object({
    username: z.string().min(4).max(20),
    password: z.string().min(8),
  });
  let parsedInput = signinInput.safeParse(req.body);
  if (!parsedInput.success) {
    return res
      .status(411)
      .json({ message: "the credentials provided are not matching criteria " });
  }
  const { username, password } = parsedInput.data;
  const user = await User.findOne({ username });
  if (!user) {
    return res
      .status(411)
      .json({ message: "no user with such username exists" });
  }
  const pass_check = await bcrypt.compare(password, user.hashed_password);
  if (!pass_check) {
    return res
      .status(411)
      .json({ message: "the password provided is incorrect" });
  }

  const token = jwt.sign({ id: user._id }, jwt_secret);
  const user_details = await User.findById(user._id).select("-hashed_password");
  return res
    .status(200)
    .json({ message: "user logged in successfully", token, user_details });
});

// created the update router for the user
router.put("/", authfunction, async (req, res) => {
  // build up the algorithm first
  // first apply zod validation and esure you provide that these are optional such that out of the three fields
  // it can be also possible that only one field is provided
  // extract the password lastname and firstname from the body
  // whatever is present update that field
  const updateInput = z.object({
    password: z.optional(z.string().min(8)),
    firstname: z.optional(z.string().min(2).max(20)),
    lastname: z.optional(z.string().min(2).max(20)),
  });

  let parsedInput = updateInput.safeParse(req.body);
  if (!parsedInput.success) {
    return res
      .status(411)
      .json({ message: "the inputs provided are not matching the criteria" });
  }
  try {
    const { password, firstname, lastname } = parsedInput.data;
    const user = await User.findById(req.userId);
    if (!user) {
      return res.status(411).json({ message: "no such user exists" });
    }
    if (password) {
      const hashed = await bcrypt.hash(password, 10);
      user.hashed_password = hashed;
    }
    if (firstname) {
      user.firstname = firstname;
    }
    if (lastname) {
      user.lastname = lastname;
    }
    // the saving will save the new updated thing in the database
    // do check the documentation to dive deep into mongoose function of findandupdate and save
    // also check the aggregation pipeline of mongodb
    await user.save();

    // this was all waste
    // the below code is the most simplest way to update the user
    // await User.updateOne(parsedInput.data, {
    //   _id: req.userId,
    // });
    return res.status(200).json({ message: "user updated successfully" });
  } catch (error) {
    return res.status(411).json({ message: "error while updating the user " });
  }
});

// to create the get user router on basis of filtering of firstname or lastname
// !doubt--? do i need to implement the zod validation for this
// and my answer for this is yes damn yes !!
router.get("/bulk", authfunction, async (req, res) => {
  // define the algorithm first
  const filter = req.query.filter;
  console.log("filter -> ", filter);
  if (!filter) {
    return res.status(411).json({ message: "no name provided provided" });
  }
  const user = await User.find({
    $or: [
      {
        firstname: {
          $regex: filter,
        },
      },
      {
        lastname: {
          $regex: filter,
        },
      },
    ],
  });
  console.log("user-> ", user);
  if (user.length <= 0) {
    return res.status(411).json({ message: "no such user exists" });
  }

  return res.status(200).json({
    user: user.map((user) => ({
      username: user.username,
      firstName: user.firstname,
      lastName: user.lastname,
      _id: user._id,
    })),
  });
});

// but only thing is that i need to know is so many db calls making is a good option or not !!?

// i need to get a route to get details of individual user
// and all the details of all  the user
export default router;
