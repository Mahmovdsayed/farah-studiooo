import { Schema, model, models } from "mongoose";

const toolsSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    userID: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

const Tools = models.Tools || model("Tools", toolsSchema);

export default Tools;
