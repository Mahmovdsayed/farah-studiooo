"use server";

import { authorizeUser, errResponse, successResponse } from "@/Helpers/helpers";
import { connectToDatabase } from "@/lib/connectToDatabase";
import Service from "@/models/services.model";
import { ActionState } from "@/types/action.types";
import { servicesValidation } from "@/validations/services.validation";
import { isValidObjectId } from "mongoose";
import { revalidateTag } from "next/cache";

export async function updateService(
  _state: ActionState,
  formData: FormData,
  id: string
): Promise<ActionState> {
  try {
    if (!isValidObjectId(id)) return errResponse("Invalid ID");

    const [dbConnection, user] = await Promise.all([
      connectToDatabase(),
      authorizeUser(),
    ]);

    if (!user || "error" in user) return user;

    if (!id) return errResponse("ID is required");

    const services = await Service.findById(id);
    if (!services) return errResponse("Service not found");

    if (services.userID.toString() !== user.id)
      return errResponse("You are not authorized to update this service");

    const data = {
      title: formData.get("title") || "",
      description: formData.get("description") || "",
    };
    const result = await servicesValidation.safeParseAsync(data);
    if (!result.success) {
      return errResponse(result.error.issues[0]?.message || "Invalid input");
    }

    await Service.findByIdAndUpdate(id, data, {
      new: true,
    });

    revalidateTag("services");
    return successResponse("Service updated successfully");
  } catch (error) {
    return errResponse("Something went wrong");
  }
}
