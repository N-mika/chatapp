import mongoose, { Schema, Model, HydratedDocument } from "mongoose";
import { ChatMessage } from "../db/typedata";

type ChatMessageDocument = HydratedDocument<ChatMessage>;

const chatSchema: Schema<ChatMessageDocument> = new Schema(
  {
    id: {
      type: String,
      required: true,
      unique: true,
    },
    conversationId: {
      type: String,
      default: null,
    },
    content: {
      type: String,
      required : true,
    },
    senderId: {
      type: String,
      required: true,
    },
    file: {
      type: String,
      default: null,
    },
  },
  {
    timestamps: true,
  }
);

/* =========================
   MODEL
========================= */

const ChatMessageModel: Model<ChatMessage> = mongoose.model<ChatMessage>("ChatMessage", chatSchema);

export default ChatMessageModel;