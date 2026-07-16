import { ChatMessage } from "../db/typedata";
import { Socket, Server } from "socket.io";
export default (io: Server) => {
  io.on("connection", (socket: Socket) => {
    // console.log("Socket connectée:", socket.id);

    // Un client s'identifie (rejoindre sa room perso)
    socket.on("userConnected", (userId: string) => {
      socket.join(`user_${userId}`);
      // console.log(`User ${userId} rejoint sa room user_${userId}`);
    });

    socket.on("joinConversation", (conversationId: string) => {
      socket.join(conversationId);
      // console.log(`Socket ${socket.id} a rejoint conversation ${conversationId}`);
    });

    socket.on(
      "sendMessage",
      (message: { newChatMessage: ChatMessage; conversationId: string }) => {
        if(message.newChatMessage.conversationId){
          socket.broadcast.to(message.newChatMessage.conversationId).emit(
            "newMessage",
            message.newChatMessage 
          );
        }
      },
    );

    socket.on("disconnect", () => {
      // console.log(`Socket déconnectée: ${socket.id}`);
    });
  });
};
