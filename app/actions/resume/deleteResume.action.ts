"use server";

import { authorizeUser, errResponse, successResponse } from "@/Helpers/helpers";
import { connectToDatabase } from "@/lib/connectToDatabase";
import Resume from "@/models/resume.model";
import { isValidObjectId } from "mongoose";
import { revalidateTag } from "next/cache";

export async function deleteResume(id: string) {
  try {
    if (!id) return errResponse("ID is required");
    if (!isValidObjectId(id)) return errResponse("Invalid ID");

    const [dbConnection, user] = await Promise.all([
      connectToDatabase(),
      authorizeUser(),
    ]);

    if (!user || "error" in user) return user;

    const resume = await Resume.findOne({ userID: user.id });
    if (!resume) return errResponse("Resume not found");

    if (resume.userID.toString() !== user.id)
      return errResponse("You are not authorized to delete this resume");

    await Resume.findByIdAndDelete(id);

    revalidateTag("resume");
    return successResponse("Resume deleted successfully");
  } catch (error) {
    return errResponse("Something went wrong");
  }
}
