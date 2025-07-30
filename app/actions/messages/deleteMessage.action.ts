"use server";
import {
  authorizeUser,
  deleteImageFromCloudinary,
  errResponse,
  successResponse,
} from "@/Helpers/helpers";
import { connectToDatabase } from "@/lib/connectToDatabase";
import Message from "@/models/message.model";
import { isValidObjectId } from "mongoose";
import { revalidateTag } from "next/cache";
export async function deleteMessage(id: string) {
  try {
    if (!id) return errResponse("ID is required");
    if (!isValidObjectId(id)) return errResponse("Invalid ID");

    const [dbConnection, user] = await Promise.all([
      connectToDatabase(),
      authorizeUser(),
    ]);

    if (!user || "error" in user) return user;

    const message = await Message.findById(id);
    if (!message) return errResponse("message not found");

    await Message.findByIdAndDelete(id);
    revalidateTag("messages");
    return successResponse("Message deleted successfully");
  } catch (error) {
    return errResponse("Something went wrong");
  }
}
