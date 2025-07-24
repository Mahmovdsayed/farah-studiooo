"use server";

import { errResponse, successResponse, authorizeUser } from "@/Helpers/helpers";
import { ActionState } from "@/types/action.types";
import { connectToDatabase } from "@/lib/connectToDatabase";
import { resumeValidationSchema } from "@/validations/resume.validation";
import Resume from "@/models/resume.model";
import { revalidateTag } from "next/cache";

export async function addResume(
  _state: ActionState,
  formData: FormData
): Promise<ActionState> {
  try {
    const [dbConnection, user] = await Promise.all([
      connectToDatabase(),
      authorizeUser(),
    ]);

    if (!user || "error" in user) return user;

    const resume = await Resume.findOne({ userID: user.id });
    if (resume) {
      return errResponse(
        "You already have a resume , you can't add another one Please update your existing resume or delete it."
      );
    }

    const data = {
      title: formData.get("title") || "",
      resumeURL: formData.get("resumeURL") || "",
    };

    const result = await resumeValidationSchema.safeParseAsync(data);
    if (!result.success)
      return errResponse(result.error.issues[0]?.message || "Invalid input");

    await Resume.create({
      ...data,
      userID: user.id,
    });

    revalidateTag("resume");
    return successResponse("Resume added successfully");
  } catch {
    return errResponse("something went wrong");
  }
}
