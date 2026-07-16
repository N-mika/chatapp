import { Router } from "express";
import {
  getConversationUser,
  getAllUser,
  getChatConvesation,
  getAllConversationUsers,
  getMessages,
  sendMessage,
  setChatConvesation,
  setConversationUser,
  updateConversationUser,
  updatedConversation,
  getCurrentConversation,
  getLastMessages,
} from "../controllers/controllers";
import { auth } from "../controllers/auth";
import { addUser } from "../controllers/users";

const router = Router();
// Get router
router.get("/getchatconversation/:idUser", getChatConvesation);
router.get("/getchatMessage/:conversationId", getMessages);
router.get("/getconversationusers/:idUser", getAllConversationUsers);
router.get("/getconversationuser/:idUser/:idConversation", getConversationUser);
router.get("/getusers", getAllUser);
router.get("/getconversationusers", getAllConversationUsers);
router.get("/getcurrentconversation/:conversationId", getCurrentConversation);
router.get('/getlastmessages', getLastMessages)

router.post("/setchatconversation", setChatConvesation);
router.post("/setconversationUser", setConversationUser);
router.post("/sendmessage", sendMessage);
router.post("/auth", auth);
router.post("/adduser", addUser);

router.put("/updateconversationUser", updateConversationUser);
router.put("/updatedconversation", updatedConversation);

export default router;