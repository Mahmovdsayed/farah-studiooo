"use server";

import { authorizeUser, errResponse, successResponse } from "@/Helpers/helpers";
import { connectToDatabase } from "@/lib/connectToDatabase";
import Resume from "@/models/resume.model";
import { ActionState } from "@/types/action.types";
import { resumeValidationSchema } from "@/validations/resume.validation";
import { isValidObjectId } from "mongoose";
import { revalidateTag } from "next/cache";

export async function updateResume(
  _state: ActionState,
  formData: FormData,
  id: string
): Promise<ActionState> {
  try {
    if (!id) return errResponse("ID is required");
    if (!isValidObjectId(id)) return errResponse("Invalid ID");

    const [dbConnection, user] = await Promise.all([
      connectToDatabase(),
      authorizeUser(),
    ]);

    if (!user || "error" in user) return user;

    const resume = await Resume.findById(id);
    if (!resume) return errResponse("Resume not found");
    if (resume.userID.toString() !== user.id)
      return errResponse("You are not authorized to update this resume");

    const data = {
      title: formData.get("title") || "",
      resumeURL: formData.get("resumeURL") || "",
    };

    const result = await resumeValidationSchema.safeParseAsync(data);
    if (!result.success) {
      return errResponse(result.error.issues[0]?.message || "Invalid input");
    }

    await Resume.findByIdAndUpdate(id, data, {
      new: true,
    });

    revalidateTag("resume");
    return successResponse("Resume updated successfully");
  } catch {
    return errResponse("Something went wrong");
  }
}
