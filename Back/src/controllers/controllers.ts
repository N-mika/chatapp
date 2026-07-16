import { Request, Response } from "express";
import ChatMessageModel from "../models/chatMessage";
import ConversationUsers from "../models/conversationUser";
import ChatConversationModel from "../models/chatConversation";
import UserModel from "../models/user";
import type {
  ChatMessage,
  ChatConversation,
  ConversationUser,
} from "../db/typedata";

/* =========================
   MESSAGE
========================= */

export const sendMessage = async (
  req: Request<{}, {}, ChatMessage>,
  res: Response,
) => {
  const { conversationId, content, senderId, id, file } = req.body;

  try {
    const message = await ChatMessageModel.create({
      id,
      content,
      conversationId,
      senderId,
      file: file || null,
    });

    return res.status(201).json({
      message: "Message envoyé !",
      data: message,
    });
  } catch (error) {
    console.error("Erreur serveur :", error);
    return res.status(500).json({
      error: "Erreur lors de l'envoi du message",
    });
  }
};

export const getMessages = async (
  req: Request<{ conversationId: string }>,
  res: Response,
) => {
  const { conversationId } = req.params;

  try {
    const messages = await ChatMessageModel.find({ conversationId }).sort({
      createdAt: 1,
    });

    return res.json(messages);
  } catch (error) {
    console.error("Erreur serveur :", error);
    return res.status(500).json({
      error: "Erreur lors de la récupération des messages",
    });
  }
};


export const getAllUser = async (
  req: Request,
  res: Response
) => {
  try {
    const user = await UserModel.find();
    return user.length !== 0 ? res.json(user) : [];
  } catch (err) {
    console.log(err);
  }
};

export const setChatConvesation = async (
  req: Request<{}, {}, ChatConversation>,
  res: Response,
) => {
  const { id, name, userIdConversations } = req.body;

  try {
    const chatConversation = await ChatConversationModel.create({
      id,
      name,
      userIdConversations,
    });

    return res.status(201).json({
      message: "Conversation créée !",
      data: chatConversation,
    });
  } catch (error) {
    console.log("Erreur :", error);
    return res.status(500).json({
      error: "Erreur lors de la création de la conversation",
    });
  }
};


export const getChatConvesation = async (
  req: Request<{ idUser: string }>,
  res: Response,
) => {
  const { idUser } = req.params;

  try {
    const chatConversation = await ChatConversationModel.find({
      userIdConversations: idUser,
    }).sort({ updatedAt: -1 });

    return res.json(chatConversation);
  } catch (error) {
    console.error("Erreur serveur :", error);
    return res.status(500).json({
      error: "Erreur lors de la récupération des conversations",
    });
  }
};


export const getCurrentConversation = async (
  req: Request,
  res: Response
) => {
  const { conversationId } = req.params;

  try {
    const conversation = await ChatConversationModel.findOne({
      id: conversationId,
    });

    if (!conversation) {
      return res.status(404).json({
        message: "Conversation introuvable",
      });
    }

    return res.status(200).json(conversation);

  } catch (err) {
    console.error("Erreur :", err);

    return res.status(500).json({
      message: "Erreur serveur",
    });
  }
};


export const updatedConversation = async (
  req: Request,
  res: Response
) => {
  const { conversationId, userIds, conversation } = req.body;

  if (!conversationId) {
    return res.status(400).json({
      message: "conversationId requis",
    });
  }

  try {
    const updateQuery: any = {};

    if (userIds?.length) {
      updateQuery.$addToSet = {
        userIdConversations: {
          $each: userIds,
        },
      };
    }

    if (conversation) {
      updateQuery.$set = conversation;
    }

    if (!Object.keys(updateQuery).length) {
      return res.status(400).json({
        message: "Rien à mettre à jour",
      });
    }

    const updatedConversation =
      await ChatConversationModel.findOneAndUpdate(
        { id: conversationId },
        updateQuery,
        { new: true },
      );

    if (!updatedConversation) {
      return res.status(404).json({
        message: "Conversation introuvable",
      });
    }

    return res.status(200).json(updatedConversation);

  } catch (err) {
    console.error("Erreur :", err);

    return res.status(500).json({
      message: "Erreur serveur",
    });
  }
};


/* =========================
   CONVERSATION USERS
========================= */

export const setConversationUser = async (
  req: Request<{}, {}, ConversationUser[]>,
  res: Response,
) => {
  const conversationUsers = req.body;

  try {
    const conversationUser = await ConversationUsers.insertMany(conversationUsers);

    return res.status(201).json({
      message: "Utilisateur ajouté",
      data: conversationUser,
    });

  } catch (error) {
    console.error("Erreur serveur :", error);

    return res.status(500).json({
      error: "Erreur lors de l'ajout",
    });
  }
};


export const getAllConversationUsers = async (
  req: Request<{ idUser: string }>,
  res: Response,
) => {
  const { idUser } = req.params;
  // console.log(idUser)

  try {
    const conversationUsers = await ConversationUsers.find({
      idUser,
    });

    return res.json(conversationUsers);

  } catch (error) {
    console.error("Erreur récupération utilisateurs");

    return res.status(500).json({
      error: "Erreur récupération utilisateurs",
    });
  }
};


export const getConversationUser = async (
  req: Request<{ idConversation: string; idUser: string }>,
  res: Response,
) => {
  const { idConversation, idUser } = req.params;

  try {
    const conversationUser = await ConversationUsers.findOne({
      idConversation,
      idUser,
    });

    return res.status(200).json(conversationUser);

  } catch (error) {
    console.error("Erreur serveur :", error);

    return res.status(500).json({
      error: "Erreur récupération utilisateur",
    });
  }
};

export const getLastMessages = async (
  req: Request<{}, {}, { conversationIds: string[] }>,
  res: Response,
) => {
  const { conversationIds } = req.body;

  try {
    const messages = await ChatMessageModel.aggregate([
      {
        $match: {
          conversationId: { $in: conversationIds },
        },
      },
      {
        $sort: {
          createdAt: -1,
        },
      },
      {
        $group: {
          _id: "$conversationId",
          message: {
            $first: "$$ROOT",
          },
        },
      },
    ]);

    return res.status(200).json(messages);
  } catch (err) {
    console.error(err);
    return res.status(500).json({
      message: "Erreur serveur",
    });
  }
};

export const updateConversationUser = async (
  req: Request<{}, {}, ConversationUser>,
  res: Response,
) => {
  const { idConversation, idUser, isRead } = req.body;

  try {
    const updated = await ConversationUsers.updateOne(
      {
        idConversation,
        idUser,
      },
      {
        $set: {
          isRead,
        },
      },
    );

    if (updated.modifiedCount > 0) {
      return res.status(200).json({
        message: "Statut mis à jour",
      });
    }

    return res.status(404).json({
      message: "Aucune modification",
    });

  } catch (error) {
    console.error("Erreur serveur :", error);

    return res.status(500).json({
      error: "Erreur mise à jour",
    });
  }
};