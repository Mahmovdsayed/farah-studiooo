"use server";

import {
  authorizeUser,
  deleteImageFromCloudinary,
  errResponse,
  successResponse,
} from "@/Helpers/helpers";
import { connectToDatabase } from "@/lib/connectToDatabase";
import Experience from "@/models/experience.model";
import { revalidateTag } from "next/cache";

export async function deleteWork(id: string) {
  try {
    const [dbConnection, user] = await Promise.all([
      connectToDatabase(),
      authorizeUser(),
    ]);
    if (!user || "error" in user) return user;

    if (!id) return errResponse("ID is required");

    const work = await Experience.findById(id);
    if (!work) return errResponse("Work not found");
    if (work.userID.toString() !== user.id)
      return errResponse("You are not authorized to delete this work");
    if (work.companyImage?.public_id) {
      await deleteImageFromCloudinary(work.companyImage.public_id);
    }

    await Experience.findByIdAndDelete(id);

    revalidateTag("work");
    return successResponse("Work deleted successfully");
  } catch (error) {
    return errResponse("Something went wrong");
  }
}
