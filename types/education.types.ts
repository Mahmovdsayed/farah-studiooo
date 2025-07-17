import { Image } from "./image.types";

type educationTypes = {
  _id?: string;
  schoolName: string;
  faculty?: string;
  from: Date;
  to: Date;
  status: "Currently Studying" | "Graduated";
  description?: string;
  gpa?: number;
  schoolImage?: Image;
  userID?: string;
  createdAt?: Date;
  updatedAt?: Date;
};

export type { educationTypes };
