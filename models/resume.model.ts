import { Schema, model, models } from "mongoose";

const resumeSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    resumeURL: {
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
    versionKey: false,
    timestamps: false,
  }
);

const Resume = models.Resume || model("Resume", resumeSchema);
export default Resume;
