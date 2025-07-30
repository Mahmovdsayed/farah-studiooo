"use server";

import { authorizeUser, errResponse, successResponse } from "@/Helpers/helpers";
import { connectToDatabase } from "@/lib/connectToDatabase";
import { isValidObjectId } from "mongoose";
import Message from "@/models/message.model";
import { revalidateTag } from "next/cache";

export async function markAsRead(id: string) {
  try {
    if (!id) return errResponse("ID is required");
    if (!isValidObjectId(id)) return errResponse("Invalid ID");

    const [dbConnection, user] = await Promise.all([
      connectToDatabase(),
      authorizeUser(),
    ]);

    if (!user || "error" in user) return user;

    const message = await Message.findById(id);
    if (!message) return errResponse("message not found.");

    if (message.isRead) {
      return errResponse("message is already read, idiot");
    }
    message.isRead = true;
    await message.save();
    revalidateTag("messages");
    return successResponse("Message marked as read");
  } catch (error) {}
}
