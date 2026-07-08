import mongoose, { Schema, Model, HydratedDocument } from "mongoose";
import { ChatConversation as ChatConversationModel } from "../db/typedata";

type ChatConversationDocument = HydratedDocument<ChatConversationModel> 
const chatConversationSchema: Schema<ChatConversationDocument> = new Schema(
  {
    id: {
      type: String,
      required: true,
      unique: true,
    },
    name: {
      type: String,
      default : '',
    },
    userIdConversations: {
      type: [String],
      required: true,
    },
    icon: {
      type: String,
      default: "",
    },
  },
  {
    timestamps: true,
  }
);

/* =========================
   INDEX (PERFORMANCE)
========================= */

chatConversationSchema.index({ userIdConversations: 1 });
chatConversationSchema.index({ updatedAt: -1 });

/* =========================
   MODEL
========================= */

const ChatConversationModel: Model<ChatConversationModel> =
  mongoose.model<ChatConversationModel>(
    "ChatConversation",
    chatConversationSchema
  );

export default ChatConversationModel;