import mongoose, { Schema, Model, HydratedDocument } from "mongoose";
import { User as UserModel } from "../db/typedata";

type UserDocument = HydratedDocument<UserModel>;

const UserShema: Schema<UserDocument> = new Schema({
  id: {
    type: String,
    require: true,
    unique: true,
  },
  email :{
    type: String,
    required: true,
    unique: true,
  },
  userName: {
    type: String,
    required: true,
  },
  surName: {
    type: String,
  },
  pseudo: {
    type: String,
  },
  password: {
    type: String,
    required: true,
  },
  roleUser: {
    type: String,
  },
  tel: {
    type: String,
  },
  status: {
    type: Boolean,
  },
  avatar: {
    type: String,
  },
});

const UserModel: Model<UserModel> = mongoose.model<UserModel>("User", UserShema);

export default UserModel;
