import { ChatMessage } from "../../Data/DataType";

export const getLastMessageForConversation = (msg: ChatMessage[] = []) => {
  if (!msg || msg.length === 0) {
    return {
      content: "Pas encore de message",
      createdAt: new Date(),
    };
  }
  const lastMsg = msg.reduce((latest, m) =>
    new Date(m.createdAt as string).getTime() > new Date(latest.createdAt as string).getTime()
      ? m
      : latest
  );

  const hasText = lastMsg.content && lastMsg.content.trim() !== "";
  const hasFile = !!lastMsg.file;

  return {
    content: hasText
      ? lastMsg.content
      : hasFile
      ? "Fichier envoyé"
      : "Pas encore de message",
    createdAt: lastMsg.createdAt,
  };
};

export const truncate = (text: string, maxLength: number = 30) => {
  if (!text) return "";
  return text.length > maxLength ? text.slice(0, maxLength) + "..." : text;
};