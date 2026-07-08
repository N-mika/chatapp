import { emptyUser } from "../Data/DataEmpty";
import { User } from "../Data/DataType";

export const findUser = (
  users: User[],
  idUsers: string[],
  currentUserId: string,
) => {
  const idUser = idUsers.find(id => id !== currentUserId);

  if (!idUser) return emptyUser;

  return users.find(user => user.id === idUser) || emptyUser;
};