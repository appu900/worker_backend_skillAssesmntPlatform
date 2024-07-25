import amqplib from "amqplib";
import dotenv from "dotenv";
import CertificateService from "../service/Certificate_generation.js";
dotenv.config();

const certificateService = new CertificateService();

const messageBrokerUrl = process.env.MESSAGE_BROKER_URL;
const exchnageName = process.env.EXCHANGE_NAME;

const createChannel = async () => {
  try {
    const connection = await amqplib.connect(messageBrokerUrl);
    const channel = await connection.createChannel();
    await channel.assertExchange(exchnageName, "direct", true);
    return channel;
  } catch (error) {
    throw error;
  }
};

const subScribeMessages = async (channel, service, binding_key) => {
  try {
    const applicationQueue = await channel.assertQueue("AssesmentQueue");
    channel.bindQueue(applicationQueue.queue, exchnageName, binding_key);

    channel.consume(applicationQueue.queue, async (msg) => {
      console.log("recived Data");
      const res = JSON.parse(msg.content.toString());
      console.log(res.data);
      await certificateService.generateCertificate(
        res.data.studentId,
        res.data.batchId,
        res.data.examId,
        res.data.courseName,
        res.data.courseCredit,
        res.data.courseLevel,
        res.data.TrainingCenter,
        res.data.duration
      );
      channel.ack(msg);
    });
  } catch (error) {
    throw error;
  }
};

export { createChannel, subScribeMessages };
