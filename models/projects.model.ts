import { models, Schema, model } from "mongoose";
import ImageSchema from "./image.model";

const projectSchema = new Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  description: {
    type: String,
    required: true,
  },
  projectImage: ImageSchema,
  userID: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
    index: true,
  },
  client: {
    clientName: {
      type: String,
      trim: true,
    },
    clientImage: ImageSchema,
    clientURL: {
      type: String,
      trim: true,
    },
  },
  projectCategory: {
    from: { type: Date, required: true },
    to: { type: Date },
    projectType: {
      type: String,
      required: true,
      enum: [
        "graphic Design",
        "UI/UX Design",
        "Digital Marketing",
        "Video Editing",
        "Photography",
        "Illustration",
        "Animation",
        "Interaction Design",
        "Visual Design",
        "Branding",
        "Logo Design",
        "Fashion Design",
        "Jewelry Design",
        "Textile Design",
        "Product Design",
        "Industrial Design",
        "Packaging Design",
        "Exhibition Design",
        "Service Design",
        "Sound Design",
        "UX Research",
        "UI Prototyping",
        "Wireframing",
        "Usability Testing",
        "Information Architecture",
        "Typography",
        "Color Theory",
        "Layout Design",
        "Print Design",
        "Editorial Design",
        "Advertising Design",
        "Poster Design",
        "Brochure Design",
        "Flyer Design",
        "Book Design",
        "Magazine Design",
        "Album Art Design",
        "Packaging Design",
        "Merchandise Design",
        "Signage Design",
        "Content Creation",
        "Writing",
        "Other",
      ],
      default: "graphic Design",
    },
    status: {
      type: String,
      enum: ["Planned", "In-Progress", "Completed", "On-Hold"],
      default: "Completed",
    },
  },
  projectLinks: {
    projectURL: {
      type: String,
    },
    designFileURL: String,
    moreImages: [{ url: { type: String, required: true } }],
  },
  projectInfo: {
    moreInfo: [
      {
        title: {
          type: String,
        },
        description: {
          type: String,
        },
      },
    ],
    designTools: [
      {
        name: {
          type: String,
          trim: true,
        },
      },
    ],
    otherTools: [
      {
        name: {
          type: String,
          trim: true,
        },
      },
    ],
  },
  views: {
    type: Number,
    default: 0,
  },
});

const Project = models.Project || model("Project", projectSchema);

export default Project;
