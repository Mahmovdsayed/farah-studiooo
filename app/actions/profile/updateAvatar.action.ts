"use server";

import {
  authorizeUser,
  errResponse,
  successResponse,
  updateImageInCloudinary,
} from "@/Helpers/helpers";
import { connectToDatabase } from "@/lib/connectToDatabase";
import { ActionState } from "@/types/action.types";
import { userValidation } from "@/validations/user.validation";
import { revalidateTag } from "next/cache";

export async function updateAvatar(
  _state: ActionState,
  formData: FormData
): Promise<ActionState> {
  try {
    await connectToDatabase();
    const user = await authorizeUser();
    if (!user || "error" in user) return user;

    const avatar = formData.get("avatar") as File;
    if (!avatar) return errResponse("Avatar is required");

    const avatarSchema = userValidation.pick({ avatar: true });
    const result = await avatarSchema.safeParseAsync({ avatar });
    if (!result.success) {
      return errResponse(result.error.issues[0]?.message || "Invalid input");
    }

    const { imageUrl, publicId } = await updateImageInCloudinary(
      avatar,
      "Avatar",
      user.avatar.public_id
    );

    user.avatar = {
      url: imageUrl,
      public_id: publicId,
    };

    await user.save();

    revalidateTag("user-profile");
    revalidateTag("user-info");

    return successResponse("Avatar updated successfully");
  } catch (error) {
    console.log(error);
    return errResponse("Something went wrong");
  }
}
