import { Image } from "./image.types";

type workTypes = {
  _id?: string;
  companyName: string;
  positionName: string;
  description: string;
  from: Date;
  to: Date;
  current: boolean;
  employmentType: string;
  companyImage: Image;
  userID: string;
};

export type { workTypes };
