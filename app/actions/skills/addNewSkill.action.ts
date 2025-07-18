"use server";

import { authorizeUser, errResponse, successResponse } from "@/Helpers/helpers";
import { connectToDatabase } from "@/lib/connectToDatabase";
import Skills from "@/models/skills.model";
import { ActionState } from "@/types/action.types";
import { skillsValidationSchema } from "@/validations/skills.validation";
import { revalidateTag } from "next/cache";

export async function addSkill(
  _state: ActionState,
  formData: FormData
): Promise<ActionState> {
  const [dbConnection, user] = await Promise.all([
    connectToDatabase(),
    authorizeUser(),
  ]);

  if (!user || "error" in user) return user;

  const data = {
    name: formData.get("name") || "",
    category: formData.get("category") || "",
    proficiency: formData.get("proficiency") || "",
  };

  const result = await skillsValidationSchema.safeParseAsync(data);
  if (!result.success)
    return errResponse(result.error.issues[0]?.message || "Invalid input");

  await Skills.create({
    ...data,
    userID: user.id,
  });

  revalidateTag("skills");
  return successResponse("Skill added successfully");
  try {
  } catch (error) {
    return errResponse("Something went wrong");
  }
}
