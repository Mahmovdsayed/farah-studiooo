import { models, Schema, model } from "mongoose";

const senderSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    phone: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

const Sender = models.Sender || model("Sender", senderSchema);

export default Sender;
