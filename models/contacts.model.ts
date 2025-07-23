import { models, Schema, model } from "mongoose";

const allowedPlatforms = [
  "website",
  "email",
  "phone",
  "facebook",
  "instagram",
  "twitter",
  "linkedIn",
  "github",
  "behance",
  "dribbble",
  "whatsapp",
  "telegram",
  "youtube",
  "tiktok",
  "discord",
  "snapchat",
  "pinterest",
  "reddit",
  "tumblr",
  "medium",
  "vimeo",
  "flickr",
  "twitch",
  "slack",
  "other",
];

const ContactSchema = new Schema(
  {
    userID: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    platform: {
      type: String,
      enum: allowedPlatforms,
      trim: true,
      default: "other",
      required: true,
    },
    url: {
      type: String,
      trim: true,
      required: true,
    },
  },
  {
    timestamps: false,
    versionKey: false,
  }
);

const Contact = models.Contact || model("Contact", ContactSchema);
export default Contact;

export { allowedPlatforms };
