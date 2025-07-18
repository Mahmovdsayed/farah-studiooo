"use server";

import { authorizeUser, errResponse, successResponse } from "@/Helpers/helpers";
import { connectToDatabase } from "@/lib/connectToDatabase";
import Skills from "@/models/skills.model";
import { revalidateTag } from "next/cache";

export async function deleteSkill(id: string) {
  try {
    const [dbConnection, user] = await Promise.all([
      connectToDatabase(),
      authorizeUser(),
    ]);

    if (!user || "error" in user) return user;
    if (!id) return errResponse("ID is required");

    const skill = await Skills.findById(id);
    if (!skill) return errResponse("Skill not found");
    if (skill.userID.toString() !== user.id)
      return errResponse("You are not authorized to delete this skill");

    await Skills.findByIdAndDelete(id);
    revalidateTag("skills");
    return successResponse("Skill deleted successfully");
  } catch (error) {
    return errResponse("Something went wrong");
  }
}
