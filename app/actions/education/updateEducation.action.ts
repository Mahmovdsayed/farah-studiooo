"use server";
import { authorizeUser, errResponse, successResponse } from "@/Helpers/helpers";
import { connectToDatabase } from "@/lib/connectToDatabase";
import Education from "@/models/education.model";
import { ActionState } from "@/types/action.types";
import { educationValidation } from "@/validations/education.validation";
import { revalidateTag } from "next/cache";

export async function updateEducation(
  _state: ActionState,
  formData: FormData,
  id: string
): Promise<ActionState> {
  try {
    await connectToDatabase();
    const user = await authorizeUser();
    if (!user || "error" in user) return user;

    if (!id) return errResponse("ID is required");

    const education = await Education.findById(id);
    if (!education) return errResponse("Education not found");

    if (education.userID.toString() !== user.id)
      return errResponse("You are not authorized to update this education");

    const data = {
      schoolName: formData.get("schoolName") || "",
      faculty: formData.get("faculty") || "",
      status: formData.get("status") || "",
      gpa: formData.get("gpa")
        ? parseFloat(formData.get("gpa") as string)
        : null,
      description: formData.get("description") as string | null,
    };

    const result = await educationValidation.safeParseAsync(data);
    if (!result.success) {
      return errResponse(result.error.issues[0]?.message || "Invalid input");
    }

    await Education.findByIdAndUpdate(id, data, {
      new: true,
    });

    revalidateTag("education");

    return successResponse("Education updated successfully");
  } catch (error) {
    console.log(error);
    return errResponse("Something went wrong");
  }
}
