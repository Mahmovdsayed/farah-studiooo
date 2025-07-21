import { models, Schema, model } from "mongoose";
import ImageSchema from "./image.model";

const clientSchema = new Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  url: {
    type: String,
    required: true,
    trim: true,
  },
  userID: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  clientImage: ImageSchema,
  description: {
    type: String,
    trim: true,
  },
});

const Client = models.Client || model("Client", clientSchema);

export default Client;
