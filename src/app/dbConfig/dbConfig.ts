// importing the mongoose module to talk to Mongoose
import mongoose from "mongoose";

export async function connect() {
  try {
    await mongoose.connect(process.env.MONGODB_URI!);
    const connection = mongoose.connection;

    connection.on("connected", () => {
      console.log("MongoDB connected Successfully");
    });

    connection.on("error", (err) => {
      console.log("MongoDB connection error");
      console.log(err);
      process.exit();
    });
  } catch (error) {
    console.log("Error connecting to Mongo");
    console.log(error);
  }
}
