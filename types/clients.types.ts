import { Image } from "./image.types";

type clientTypes = {
  _id: string;
  name: string;
  url: string;
  description: string | null;
  clientImage: Image;
  userID: string;
};

export type { clientTypes };
