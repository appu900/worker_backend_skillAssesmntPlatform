import mongoose from "mongoose";

async function connectToDatabase() {
  try {
    await mongoose.connect(
      "mongodb+srv://msubham193:sonu@cluster0.62xyd.mongodb.net/prisma-skillassement?retryWrites=true&w=majority"
    );
    console.log("Database connected");
  } catch (error) {
    console.log("Error occured in connecting database", error.message);
    throw error;
  }
}

export default connectToDatabase;
