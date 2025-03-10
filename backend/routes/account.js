import express from "express";
import { z } from "zod";
import authfunction from "../middleware/auth.js";
import User, { Account } from "../models/user.js";
import mongoose from "mongoose";
const router = express.Router();
router.use(express.json());

// an api end point for the user to get their balance
router.get("/balance", authfunction, async (req, res) => {
  // i am kinda modifying this code to also get the name of the userr
  // get the userid from the req

  // check if the user exists in the db or not ..as if the user doesnt exist then it is of no use to keep the account of that user

  const id = req.userId;
  if (!id) return res.status(411).json({ message: "user not found" });
  const user = await User.findById(id);
  if (!user)
    return res.status(411).json({ message: "user not found in the db" });
  const account = await Account.findOne({ user_id: id });
  if (!account) return res.status(411).json({ message: "account not found" });
  const balance = account.balance;
  if (!balance) return res.status(411).json({ message: "balance not found" });
  return res.status(200).json({ balance, name: user.firstname });
});

//  An endpoint for user to transfer money to another account
router.post("/transfer", authfunction, async (req, res) => {
  // first zod validation start kor

  // age session start kor
  const session = await mongoose.startSession();

  session.startTransaction();
  const transferInput = z.object({
    to: z.string().max(24),
    amount: z.number().min(1),
  });
  console.log(req.body);
  console.log(typeof req.body.to, typeof req.body.amount);
  // const to = req.body.to;
  // const amount = Number(req.body.amount);
  const parsedInput = transferInput.safeParse(req.body);
  if (!parsedInput.success) {
    await session.abortTransaction();
    return res.status(411).json({ success: false, message: "Invalid input" });
  }
  console.log("parsed input of transfer -> ", parsedInput);
  if (!req.userId) {
    await session.abortTransaction();
    return res.status(411).json({ success: false, message: "User not found" });
  }
  // getting the sender account details
  const senderAccount = await Account.findOne({ user_id: req.userId }).session(
    session,
  );
  if (!senderAccount || senderAccount.balance < parsedInput?.data?.amount) {
    await session.abortTransaction();
    return res
      .status(411)
      .json({ success: false, message: "Account not found" });
  }

  // now getting the receiver account details
  const receiverAccount = await Account.findOne({
    user_id: parsedInput?.data?.to,
  }).session(session);

  if (!receiverAccount) {
    await session.abortTransaction();
    return res
      .status(411)
      .json({ success: false, message: "Receiver not found" });
  }

  // now handle the transactions finally
  // first update the sender account
  await Account.updateOne(
    {
      user_id: req?.userId,
    },
    {
      $inc: {
        balance: -parsedInput?.data?.amount,
      },
    },
  ).session(session);

  await Account.updateOne(
    {
      user_id: parsedInput?.data?.to,
    },
    {
      $inc: {
        balance: parsedInput?.data?.amount,
      },
    },
  ).session(session);

  //now commiting the transaction
  await session.commitTransaction();

  return res
    .status(200)
    .json({ success: true, message: "Transaction successful" });
});

export default router;
