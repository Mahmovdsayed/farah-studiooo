"use server";

import { authorizeUser, errResponse, successResponse } from "@/Helpers/helpers";
import { connectToDatabase } from "@/lib/connectToDatabase";
import Experience from "@/models/experience.model";
import { ActionState } from "@/types/action.types";
import { workValidationSchema } from "@/validations/work.validation";
import { revalidateTag } from "next/cache";

export async function updateWork(
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

    const work = await Experience.findById(id);
    if (!work) return errResponse("Work not found");

    if (work.userID.toString() !== user.id)
      return errResponse("You are not authorized to update this work");

    const data = {
      companyName: formData.get("companyName") || "",
      positionName: formData.get("positionName") || "",
      description: formData.get("description") as string | null,
      from: formData.get("from"),
      to: formData.get("to") || null,
      current: formData.get("current") === "true",
      employmentType: formData.get("employmentType") || "",
    };
    const result = await workValidationSchema.safeParseAsync(data);
    if (!result.success)
      return errResponse(result.error.issues[0]?.message || "Invalid input");

    if (!data.to) {
      data.current = true;
      data.to = null;
    } else if (data.current === true && data.to != null) {
      data.to = null;
    }

    await Experience.findByIdAndUpdate(id, data, {
      new: true,
    });

    revalidateTag("work");
    return successResponse("Work updated successfully");
  } catch {
    return errResponse("Something went wrong");
  }
}
