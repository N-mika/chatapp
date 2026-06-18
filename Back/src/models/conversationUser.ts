import mongoose, { Schema, Model, HydratedDocument } from "mongoose";
import { ConversationUser as ConversationUserModel } from "../db/typedata";

type ConversationUserDocument = HydratedDocument<ConversationUserModel>;

const conversationUserSchema: Schema<ConversationUserDocument> = new Schema(
  {
    idConversation: {
      type: String,
      required: true,
    },
    idUser: {
      type: String,
      required: true,
    },
    isRead: {
      type: Boolean,
      required: true,
    },
  },
  {
    timestamps: true,
  },
);

conversationUserSchema.index(
  { idConversation: 1, idUser: 1 },
  { unique: true },
);

// Optimisation des requêtes
conversationUserSchema.index({ idUser: 1 });
conversationUserSchema.index({ idConversation: 1 });

const ConversationUserModel: Model<ConversationUserModel> =
  mongoose.model<ConversationUserModel>("ConversationUser", conversationUserSchema);

export default ConversationUserModel;
