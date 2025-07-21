"use server";

import {
  authorizeUser,
  deleteImageFromCloudinary,
  errResponse,
  successResponse,
} from "@/Helpers/helpers";
import { connectToDatabase } from "@/lib/connectToDatabase";
import Client from "@/models/clients.model";
import { isValidObjectId } from "mongoose";
import { revalidateTag } from "next/cache";

export async function deleteClient(id: string) {
  try {
    if (!isValidObjectId(id)) return errResponse("Invalid ID");

    const [dbConnection, user] = await Promise.all([
      connectToDatabase(),
      authorizeUser(),
    ]);

    if (!user || "error" in user) return user;
    if (!id) return errResponse("Client ID is required.");

    const client = await Client.findById(id);
    if (!client) return errResponse("Client not found.");

    if (client.userID.toString() !== user.id)
      return errResponse("You are not authorized to delete this client.");

    if (client.clientImage?.public_id) {
      await deleteImageFromCloudinary(client.clientImage.public_id);
    }

    await Client.findByIdAndDelete(id);

    revalidateTag("clients");
    return successResponse("Client deleted successfully.");
  } catch (error) {
    return errResponse("Something went wrong.");
  }
}
