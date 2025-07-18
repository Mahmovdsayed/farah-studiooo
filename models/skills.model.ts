import { Schema, model, models } from "mongoose";

const skillsSchema = new Schema({
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
  category: {
    type: String,
    required: true,
  },
  proficiency: {
    type: String,
    enum: ["Beginner", "Intermediate", "Advanced", "Expert"],
    default: "Beginner",
  },
});

const Skills = models.Skills || model("Skills", skillsSchema);

export default Skills;
