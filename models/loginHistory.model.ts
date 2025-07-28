import { models, Schema, model } from "mongoose";

const loginHistorySchema = new Schema(
  {
    userID: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true,
    },
    userAgent: {
      type: String,
      required: true,
    },
    location: {
      type: String,
      required: true,
    },
    time: {
      type: Date,
      default: Date.now,
    },
  },
  {
    timestamps: false,
    versionKey: false,
  }
);

const LoginHistory =
  models.LoginHistory || model("LoginHistory", loginHistorySchema);

export default LoginHistory;
