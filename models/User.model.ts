import { Schema, model, models } from "mongoose";
import ImageSchema from "./image.model";

const userSchema = new Schema(
  {
    name: { type: String, required: true },
    username: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    avatar: ImageSchema,
    about: {
      type: String,
      trim: true,
    },
    birthday: {
      type: Date,
      trim: true,
    },
    country: {
      type: String,
      trim: true,
    },
    city: {
      type: String,
      trim: true,
    },
    positionName: {
      type: String,
      trim: true,
    },
    phone: {
      type: String,
      trim: true,
    },
    resetPasswordToken: { type: String },
    resetPasswordExpires: { type: Date },
    aiContent: [
      {
        description: {
          type: String,
          trim: true,
        },
      },
    ],
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

const User = models.User || model("User", userSchema);

export default User;
