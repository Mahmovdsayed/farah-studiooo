"use server";

import { authorizeUser, errResponse, successResponse } from "@/Helpers/helpers";
import { connectToDatabase } from "@/lib/connectToDatabase";
import User from "@/models/User.model";
import { ActionState } from "@/types/action.types";
import { userValidation } from "@/validations/user.validation";
import { revalidateTag } from "next/cache";

export async function updateProfile(
  _state: ActionState,
  formData: FormData
): Promise<ActionState> {
  try {
    await connectToDatabase();
    const user = await authorizeUser();
    if (!user || "error" in user) return user;

    const data = {
      name: formData.get("name"),
      username: formData.get("username"),
      email: formData.get("email"),
      phone: formData.get("phone"),
      country: formData.get("country"),
      city: formData.get("city"),
      positionName: formData.get("positionName"),
      birthday: formData.get("birthday"),
      about: formData.get("about"),
    };

    const result = await userValidation.safeParseAsync(data);
    if (!result.success) {
      return errResponse(result.error.issues[0]?.message || "Invalid input");
    }

    const updatedUser = await User.findByIdAndUpdate(user.id, data, {
      new: true,
    });

    if (!updatedUser) return errResponse("Failed to update your profile");

    revalidateTag("user-profile");
    return successResponse("Profile updated successfully");
  } catch (error) {
    return errResponse("Something went wrong");
  }
}
