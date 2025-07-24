"use server";

import { authorizeUser, errResponse, successResponse } from "@/Helpers/helpers";
import { connectToDatabase } from "@/lib/connectToDatabase";
import Course from "@/models/course.model";
import { isValidObjectId } from "mongoose";
import { revalidateTag } from "next/cache";

export async function deleteCourse(id: string) {
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

    if (course.userID.toString() !== user.id) {
      return errResponse("You are not authorized to delete this course");
    }

    await Course.findByIdAndDelete(id);

    revalidateTag("courses");
    return successResponse("Course deleted successfully");
  } catch (error) {
    return errResponse("Something went wrong");
  }
}
