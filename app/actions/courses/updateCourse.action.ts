"use server";

import { authorizeUser, errResponse, successResponse } from "@/Helpers/helpers";
import { connectToDatabase } from "@/lib/connectToDatabase";
import Course from "@/models/course.model";
import { ActionState } from "@/types/action.types";
import { courseValidationSchema } from "@/validations/courses.validation";
import { isValidObjectId } from "mongoose";
import { revalidateTag } from "next/cache";

export async function updateCourse(
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

    const course = await Course.findById(id);
    if (!course) return errResponse("Course not found");

    if (course.userID.toString() !== user.id)
      return errResponse("You are not authorized to update this course");

    const data = {
      title: formData.get("title") || "",
      description: formData.get("description") as string,
      date: formData.get("date"),
      certificateURL: formData.get("certificateURL") || "",
    };
    const result = await courseValidationSchema.safeParseAsync(data);
    if (!result.success) {
      return errResponse(result.error.issues[0]?.message || "Invalid input");
    }

    await Course.findByIdAndUpdate(id, data, {
      new: true,
    });

    revalidateTag("courses");
    return successResponse("Course updated successfully");
  } catch (error) {
    return errResponse("Something went wrong");
  }
}
