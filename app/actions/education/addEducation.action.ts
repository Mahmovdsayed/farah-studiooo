"use server";

import {
  authorizeUser,
  errResponse,
  successResponse,
  uploadImageToCloudinary,
} from "@/Helpers/helpers";
import { connectToDatabase } from "@/lib/connectToDatabase";
import Education from "@/models/education.model";
import { ActionState } from "@/types/action.types";
import { educationValidation } from "@/validations/education.validation";
import { revalidateTag } from "next/cache";

export async function addEducation(
  _state: ActionState,
  formData: FormData
): Promise<ActionState> {
  try {
    await connectToDatabase();
    const user = await authorizeUser();
    if (!user || "error" in user) return user;

    const educationCount = await Education.countDocuments({
      userID: user.id,
    });
    if (educationCount >= 5) {
      return await errResponse(
        "You have reached the maximum limit of 5 Educations."
      );
    }

    const educationData = {
      schoolName: formData.get("schoolName"),
      faculty: formData.get("faculty"),
      status: formData.get("status"),
      gpa: formData.get("gpa")
        ? parseFloat(formData.get("gpa") as string)
        : null,
      from: formData.get("from"),
      description: formData.get("description") as string | null,
      to: formData.get("to"),
      schoolImage: formData.get("schoolImage") as File | null,
    };

    const result = await educationValidation.safeParseAsync(educationData);
    if (!result.success) {
      return errResponse(result.error.issues[0]?.message || "Invalid input");
    }

    const defaultImageUrl =
      "https://res.cloudinary.com/dtpsyi5am/image/upload/v1741391758/z9mzkfjfalpokwes25er.svg";
    let imageUrl = defaultImageUrl;
    let publicId = "";

    if (
      educationData.schoolImage &&
      educationData.schoolImage instanceof File &&
      educationData.schoolImage.size > 0
    ) {
      const uploadResult = await uploadImageToCloudinary(
        educationData.schoolImage,
        "Education"
      );
      if (uploadResult) {
        imageUrl = uploadResult.imageUrl;
        publicId = uploadResult.publicId;
      }
    }

    const newEducation = new Education({
      ...educationData,
      schoolImage: { url: imageUrl, public_id: publicId || null },
      userID: user.id,
    });

    await newEducation.save();
    revalidateTag("education");

    return successResponse("Education added successfully");
  } catch (error) {
    return errResponse("Something went wrong");
  }
}
