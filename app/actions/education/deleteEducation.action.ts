"use server";

import {
  authorizeUser,
  deleteImageFromCloudinary,
  errResponse,
  successResponse,
} from "@/Helpers/helpers";
import { connectToDatabase } from "@/lib/connectToDatabase";
import Education from "@/models/education.model";
import { revalidateTag } from "next/cache";

export async function deleteEducation(id: string) {
  try {
    const [dbConnection, user] = await Promise.all([
    connectToDatabase(),
    authorizeUser(),
  ]);

  if (!user || "error" in user) return user;

    if (!id) return errResponse("ID is required");

    const education = await Education.findById(id);
    if (!education) return errResponse("Education not found");

    if (education.userID.toString() !== user.id)
      return errResponse("You are not authorized to delete this education");

    if (education.schoolImage?.public_id) {
      await deleteImageFromCloudinary(education.schoolImage.public_id);
    }

    await Education.findByIdAndDelete(id);

    revalidateTag("education");
    return successResponse("Education deleted successfully");
  } catch (error) {
    return errResponse("Something went wrong");
  }
}
