"use server";

import { authorizeUser, errResponse, successResponse } from "@/Helpers/helpers";
import { connectToDatabase } from "@/lib/connectToDatabase";
import Service from "@/models/services.model";
import { ActionState } from "@/types/action.types";
import { servicesValidation } from "@/validations/services.validation";
import { revalidateTag } from "next/cache";

export async function addService(
  _state: ActionState,
  formData: FormData
): Promise<ActionState> {
  try {
    const [dbConnection, user] = await Promise.all([
      connectToDatabase(),
      authorizeUser(),
    ]);

    if (!user || "error" in user) return user;

    const data = {
      title: formData.get("title") || "",
      description: formData.get("description") || "",
    };

    const result = await servicesValidation.safeParseAsync(data);
    if (!result.success) {
      return errResponse(result.error.issues[0]?.message || "Invalid input");
    }

    await Service.create({
      ...data,
      userID: user.id,
    });

    revalidateTag("services");
    return successResponse("Service added successfully");
  } catch (error) {
    return errResponse("Something went wrong");
  }
}
