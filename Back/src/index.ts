import express from "express";
import cors from "cors";
import { Server } from "socket.io";
import dotenv from "dotenv";
dotenv.config();
import http from "http";
import connectDB from "./db/configdb";
import chatRoutes from "./routes/chatRoutes";
import { initData } from "./db/initData";
import socketInit from "./Socket/Socket";

initData();
connectDB();
const app = express();
const server = http.createServer(app);
const port = process.env.PORT || 3000;

app.use(
  cors({
    origin: process.env.ORIGIN,
    credentials: true,
  }),
);

app.use(express.json());

const io = new Server(server, {
  cors: {
    origin: process.env.ORIGIN,
    credentials: true,
  },
});

socketInit(io);

app.use("/", chatRoutes);

server.listen(port, () => {
  console.log(`Serveur lancé sur ${port}`);
});
