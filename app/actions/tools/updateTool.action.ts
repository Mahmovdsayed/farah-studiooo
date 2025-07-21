"use server";

import { authorizeUser, errResponse, successResponse } from "@/Helpers/helpers";
import { connectToDatabase } from "@/lib/connectToDatabase";
import Tools from "@/models/tools.model";
import { ActionState } from "@/types/action.types";
import { toolsValidation } from "@/validations/tools.validation";
import { isValidObjectId } from "mongoose";
import { revalidateTag } from "next/cache";

export async function updateTool(
  _state: ActionState,
  formData: FormData,
  id: string
): Promise<ActionState> {
  try {
    if (!isValidObjectId(id)) return errResponse("Invalid ID");

    const [dbConnection, user] = await Promise.all([
      connectToDatabase(),
      authorizeUser(),
    ]);
    if (!user || "error" in user) return user;

    if (!id) return errResponse("ID is required");

    const tool = await Tools.findById(id);
    if (!tool) return errResponse("Tool not found");

    if (tool.userID.toString() !== user.id)
      return errResponse("You are not authorized to update this tool");

    const data = {
      name: formData.get("name"),
    };

    const result = await toolsValidation.safeParseAsync(data);
    if (!result.success)
      return errResponse(result.error.issues[0]?.message || "Invalid input");

    await Tools.findByIdAndUpdate(id, data, {
      new: true,
    });

    revalidateTag("tools");

    return successResponse("Tool updated successfully");
  } catch (error) {
    return errResponse("Something went wrong");
  }
}
