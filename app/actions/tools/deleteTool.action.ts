"use server";

import { authorizeUser, errResponse, successResponse } from "@/Helpers/helpers";
import { connectToDatabase } from "@/lib/connectToDatabase";
import Tools from "@/models/tools.model";
import { revalidateTag } from "next/cache";

export async function deleteTool(id: string) {
  try {
    const [dbConnection, user] = await Promise.all([
      connectToDatabase(),
      authorizeUser(),
    ]);

    if (!user || "error" in user) return user;
    if (!id) return errResponse("ID is required");

    const tool = await Tools.findById(id);
    if (!tool) return errResponse("Skill not found");

    if (tool.userID.toString() !== user.id) return errResponse("You are not authorized to delete this tool");

    await Tools.findByIdAndDelete(id);
    revalidateTag("tools");
    
    return successResponse("Tool deleted successfully");
  } catch (error) {
    return errResponse("Something went wrong");
  }
}
