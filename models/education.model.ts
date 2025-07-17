import { models, Schema, model } from "mongoose";
import ImageSchema from "./image.model";

const EducationSchema = new Schema(
  {
    schoolName: { type: String, trim: true, required: true },
    faculty: { type: String, trim: true },
    from: { type: Date, required: true },
    to: { type: Date },
    status: {
      type: String,
      enum: ["Currently Studying", "Graduated"],
      default: "Currently Studying",
    },
    description: { type: String, trim: true },
    gpa: { type: Number, min: 0, max: 4 },
    schoolImage: ImageSchema,
    userID: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  { timestamps: true, versionKey: false }
);

const Education = models.Education || model("Education", EducationSchema);
export default Education;
