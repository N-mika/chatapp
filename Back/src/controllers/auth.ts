import bcrypt from "bcryptjs";
import UserModel from "../models/user";
import { Request, Response } from "express";

export const auth = async (req : Request<{ password : string; idUser: string }>, res : Response) => {
  try {
    const { idUser, password } = req.body;

    const user = await UserModel.findOne({
      $or: [{ userName: idUser }, { email: idUser }],
    });

    if (!user) {
      return res.status(404).json({ message: "Compte non disponible." });
    }

    const correctPass = await bcrypt.compare(password, user.password);
    if (!correctPass) {
      return res.status(400).json({ message: "Votre mot de passe n'est pas correct." });
    }

    res.status(200).json(user);
  } catch (err) {
    res.status(500).json({
      message: "Erreur de récupération de l'utilisateur.",
      error: err,
    });
  }
};
