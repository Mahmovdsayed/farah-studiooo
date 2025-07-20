import { models, Schema, model } from "mongoose";
import ImageSchema from "./image.model";

const experienceSchema = new Schema({
  companyName: { type: String, trim: true, required: true },
  positionName: { type: String, trim: true, required: true },
  description: { type: String, trim: true },
  from: { type: Date, required: true },
  to: { type: Date, default: null },
  companyImage: ImageSchema,
  userID: { type: Schema.Types.ObjectId, ref: "User", required: true },
  current: { type: Boolean, default: false },
  employmentType: {
    type: String,
    trim: true,
    required: true,
    enum: [
      "Full-time",
      "Part-time",
      "Contract",
      "Internship",
      "Freelance",
      "Remote",
      "Temporary",
      "Casual",
      "Volunteer",
      "Self-Employed",
      "Apprenticeship",
      "Other",
    ],
  },
});

const Experience = models.Experience || model("Experience", experienceSchema);

export default Experience;
