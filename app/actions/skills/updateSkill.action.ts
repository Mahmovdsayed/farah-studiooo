"use server";

import { authorizeUser, errResponse, successResponse } from "@/Helpers/helpers";
import { connectToDatabase } from "@/lib/connectToDatabase";
import Skills from "@/models/skills.model";
import { ActionState } from "@/types/action.types";
import { skillsValidationSchema } from "@/validations/skills.validation";
import { revalidateTag } from "next/cache";

export async function updateSkill(
  _state: ActionState,
  formData: FormData,
  id: string
): Promise<ActionState> {
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
      return errResponse("You are not authorized to update this skill");

    const data = {
      name: formData.get("name") || "",
      category: formData.get("category") || "",
      proficiency: formData.get("proficiency") || "",
    };

    const result = await skillsValidationSchema.safeParseAsync(data);
    if (!result.success) {
      return errResponse(result.error.issues[0]?.message || "Invalid input");
    }

    await Skills.findByIdAndUpdate(id, data, {
      new: true,
    });

    revalidateTag("skills");
    return successResponse("Skill updated successfully");
  } catch (error) {
    return errResponse("Something went wrong");
  }
}
