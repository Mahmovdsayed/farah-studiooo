"use server";

import { authorizeUser, errResponse, successResponse } from "@/Helpers/helpers";
import { connectToDatabase } from "@/lib/connectToDatabase";
import Client from "@/models/clients.model";
import { ActionState } from "@/types/action.types";
import { clientValidation } from "@/validations/clients.validation";
import { isValidObjectId } from "mongoose";
import { revalidateTag } from "next/cache";

export async function updateClient(
  _state: ActionState,
  formData: FormData,
  id: string
): Promise<ActionState> {
  try {
    if (!id) return errResponse("Client ID is required.");
    if (!isValidObjectId(id)) return errResponse("Invalid ID");

    const [dbConnection, user] = await Promise.all([
      connectToDatabase(),
      authorizeUser(),
    ]);

    if (!user || "error" in user) return user;

    const client = await Client.findById(id);
    if (!client) return errResponse("Client not found.");

    if (client.userID.toString() !== user.id)
      return errResponse("You are not authorized to update this client.");

    const data = {
      name: formData.get("name") as string,
      url: formData.get("url") as string,
      description: formData.get("description") as string,
    };

    const result = await clientValidation.safeParseAsync(data);
    if (!result.success) {
      return errResponse(result.error.issues[0]?.message || "Invalid input");
    }

    await Client.findByIdAndUpdate(id, data, { new: true });

    revalidateTag("clients");
    return successResponse("Client updated successfully.");
  } catch {
    return errResponse("Something went wrong.");
  }
}
