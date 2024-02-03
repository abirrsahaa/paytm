import mongoose from "mongoose";

const dbConnect = async () => {
  try {
    const connectionInstance = await mongoose.connect(
      "mongodb+srv://abirsaha453:vW0ZnURNnoZjxACO@cluster0.answreb.mongodb.net/" +
        "paytm"
    );
    console.log(
      "connection Instance: ",
      connectionInstance.connections[0].host
    );
    console.log("mongo db connected");
  } catch (error) {
    console.log("mongo db connection failed ", error);
    process.exit(1);
  }
};

export default dbConnect;
