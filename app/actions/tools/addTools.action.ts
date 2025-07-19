"use server";

import { authorizeUser, errResponse, successResponse } from "@/Helpers/helpers";
import { connectToDatabase } from "@/lib/connectToDatabase";
import Tools from "@/models/tools.model";
import { ActionState } from "@/types/action.types";
import { toolsValidation } from "@/validations/tools.validation";
import { revalidateTag } from "next/cache";

export async function addTool(
  _state: ActionState,
  formData: FormData
): Promise<ActionState> {
  try {
    const [dbConnection, user] = await Promise.all([
      connectToDatabase(),
      authorizeUser(),
    ]);
    if (!user || "error" in user) return user;

    const data = {
      name: formData.get("name") || "",
    };

    const result = await toolsValidation.safeParseAsync(data);
    if (!result.success)
      return errResponse(result.error.issues[0]?.message || "Invalid input");

    await Tools.create({
      ...data,
      userID: user.id,
    });

    revalidateTag("tools");
    return successResponse("Tool added successfully");
  } catch (error) {
    console.log(error);
    return errResponse("Something went wrong");
  }
}
