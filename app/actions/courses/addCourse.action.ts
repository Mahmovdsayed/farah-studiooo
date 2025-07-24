"use server";

import { authorizeUser, errResponse, successResponse } from "@/Helpers/helpers";
import { connectToDatabase } from "@/lib/connectToDatabase";
import Course from "@/models/course.model";
import { ActionState } from "@/types/action.types";
import { courseValidationSchema } from "@/validations/courses.validation";
import { revalidateTag } from "next/cache";

export async function addCourse(
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
      title: formData.get("title") || "",
      description: formData.get("description") || "",
      date: formData.get("date"),
      certificateURL: formData.get("certificateURL") || "",
    };

    const result = await courseValidationSchema.safeParseAsync(data);

    if (!result.success)
      return errResponse(result.error.issues[0]?.message || "Invalid input");

    await Course.create({
      ...data,
      userID: user.id,
    });

    revalidateTag("courses");
    return successResponse("Course added successfully");
  } catch {
    return errResponse("Something went wrong");
  }
}
