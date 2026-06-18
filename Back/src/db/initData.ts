import UserModel from "../models/user";
import bcrypt from "bcryptjs";
import type { ChatConversation, ChatMessage, User } from "./typedata";
import ChatMessageModel from "../models/chatMessage";
import ChatConversationModel from "../models/chatConversation";
import ConversationUserModel from "../models/conversationUser";
const messagesMock: ChatMessage[] = [
  {
    id: "m1",
    conversationId: "c1",
    content: "Bonjour Mari",
    senderId: "u1",
  },
  {
    id: "m2",
    conversationId: "c1",
    content: "Bonjour Mika",
    senderId: "u2"
  },
  {
    id: "m3",
    conversationId: "c2",
    content: "Salut Rabe",
    senderId: "u1"
  },
  {
    id: "m4",
    conversationId: "c2",
    content: "Salut Mika",
    senderId: "u3"
  }
];
const userMocke : UserModel[] =[
    {
    id: "u1",
    userName: "Mika",
    surName: "Tieko",
    email: "mika@email.com",
    pseudo: "mika",
    password: "123456",
    status: true,
    roleUser : 'user',
    tel : '0344444',
    avatar: "https://i.pravatar.cc/150?img=1"
  },
  {
    id: "u2",
    userName: "Mari",
    surName: "Ranaivo",
    email: "mari@email.com",
    pseudo: "mari",
    password: "123456",
    status: true,
    avatar: "https://i.pravatar.cc/150?img=2",
    tel : '032000000',
    roleUser : ''
  },
  {
    id: "u3",
    userName: "Rabe",
    surName: "Rakoto",
    email: "rabe@email.com",
    pseudo: "rabe",
    password: "123456",
    roleUser: "user",
    status: true,
    avatar: "https://i.pravatar.cc/150?img=2",
    tel : '0333'
  },
  {
    id: "u4",
    userName: "Randria",
    surName: "Andry",
    email: "randria@email.com",
    pseudo: "randria",
    password: "123456",
    avatar: "https://i.pravatar.cc/150?img=2",
    roleUser: "user",
    status: false,
    tel : '044444'
  }
] 
const chatConversationsMocke: ChatConversation[] = [
  {
    id: "c1",
    name: "Mari",
    isRead: true,
    userIdConversations: ["u1", "u2"],
  },
  {
    id: "c2",
    name: "Rabe",
    isRead: false,
    userIdConversations: ["u1", "u3"],
    },
  {
    id: "c3",
    name: "Dev Chat",
    isRead: true,
    userIdConversations: ["u1", "u3", "u4"],
  },
];
const conversationUserMocke =  [
  {
    idConversation: "c1",
    idUser: "u1",
    isRead: true,
  },
  {
    idConversation: "c1",
    idUser: "u2",
    isRead: true,
  },
  {
    idConversation: "c2",
    idUser: "u1",
    isRead: false,
  },
  {
    idConversation: "c2",
    idUser: "u3",
    isRead: true,
  },
];

export const initData =  async ()=>{
  try {
    const findUser = await UserModel.findOne({id : userMocke[0].id});
    const findMessge = await ChatMessageModel.find();
    const finChatConversation = await ChatConversationModel.find();
    const findConversationUser = await ConversationUserModel.find();

    if(findConversationUser.length === 0){
      await ConversationUserModel.insertMany(conversationUserMocke);
      console.log('init conversationUser');
    }
    if(findMessge.length === 0 ){
      await ChatMessageModel.insertMany(messagesMock);
      console.log('init message');
    }
    if(finChatConversation.length === 0){
      await ChatConversationModel.insertMany(chatConversationsMocke);
      console.log('init chatConversation')
    }
    if(!findUser){
      const hashedpassword = await bcrypt.hash(userMocke[0].password , 10);
      await UserModel.insertMany(userMocke);
      console.log("utilisateur annitialiser");
    }
  }catch(err){
    console.log("Erreur : " , err )
  }
}