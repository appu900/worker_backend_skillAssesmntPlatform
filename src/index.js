import express from "express";
import { createChannel, subScribeMessages } from "./config/messageQueue.js";
import connectToDatabase from "./config/databaseConfig.js";


const app = express();

async function startServer() {
  try {
    await connectToDatabase()
    const channel = await createChannel();
    subScribeMessages(channel, null, "CREATE_CERTIFICATE");

    app.listen(3002, function () {
      console.log("server is running");
    });
  } catch (error) {
    console.log("error occured on starting the server", error.message);
    throw error;
  }
}

startServer();
