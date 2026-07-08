import { Request, Response } from "express";
import  UserModel  from "../models/user";
import bcrypt from "bcryptjs";

export const addUser = async (req: Request<{}, {}, UserModel>, res: Response) => {
  const { id, email, userName, surName, pseudo, password, roleUser, tel, status, avatar } = req.body;

  try {
    const existingUser = await UserModel.findOne({ email });
    if (existingUser) {
      return res.status(400).json({
        message: "Utilisateur déjà existant",
      });
    }
    const passwordHash = await bcrypt.hash(password, 10);
    const newUser = {
      id,
      email,
      userName,
      surName,
      pseudo,
      password : passwordHash,
      roleUser,
      tel,
      status,
      avatar,
    };
    
    const savedUser = await UserModel.create(newUser);
    return res.status(201).json(savedUser);
  } catch (error) {
    console.error("Erreur serveur :", error);
    return res.status(500).json({
      error: "Erreur lors de l'ajout de l'utilisateur",
    });
  }
};
