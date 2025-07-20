"use server";

import {
  authorizeUser,
  errResponse,
  successResponse,
  uploadImageToCloudinary,
} from "@/Helpers/helpers";
import { connectToDatabase } from "@/lib/connectToDatabase";
import Experience from "@/models/experience.model";
import { ActionState } from "@/types/action.types";
import { workValidationSchema } from "@/validations/work.validation";
import { revalidateTag } from "next/cache";

export async function addWork(
  _state: ActionState,
  formData: FormData
): Promise<ActionState> {
  try {
    const [dbConnection, user] = await Promise.all([
      connectToDatabase(),
      authorizeUser(),
    ]);

    if (!user || "error" in user) return user;
    const experienceCount = await Experience.countDocuments({
      userID: user.id,
    });

    if (experienceCount >= 10)
      return await errResponse(
        "You have reached the maximum limit of 10 work experiences."
      );

    const data = {
      companyName: formData.get("companyName") || "",
      positionName: formData.get("positionName") || "",
      description: formData.get("description") || "",
      from: formData.get("from"),
      to: formData.get("to") || null,
      current: formData.get("current") === "true",
      employmentType: formData.get("employmentType") || "",
      companyImage: formData.get("companyImage") as File | null,
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

    const defaultImageUrl =
      "https://res.cloudinary.com/dtpsyi5am/image/upload/v1741391758/wpojdb4im9vb6lv1tim4.svg";
    let imageUrl = defaultImageUrl;
    let publicId = "";

    if (
      data.companyImage &&
      data.companyImage instanceof File &&
      data.companyImage.size > 0
    ) {
      const uploadResult = await uploadImageToCloudinary(
        data.companyImage,
        "Experience"
      );
      if (uploadResult) {
        imageUrl = uploadResult.imageUrl;
        publicId = uploadResult.publicId;
      }
    }

    await Experience.create({
      ...data,
      companyImage: { url: imageUrl, public_id: publicId || null },
      userID: user.id,
    });

    revalidateTag("work");
    return successResponse("Work added successfully");
  } catch {
    return errResponse("Something went wrong");
  }
}
