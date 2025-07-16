import { Image } from "./image.types";

type User = {
  _id: string;
  name: string;
  username: string;
  email: string;
  password: string;
  avatar?: Image;
  about?: string;
  birthday?: Date;
  country?: string;
  city?: string;
  positionName?: string;
  phone?: string;
  resetPasswordToken?: string;
  resetPasswordExpires?: Date;
  aiContent?: { description: string }[];
  createdAt: Date;
  updatedAt: Date;
};

export type { User };
