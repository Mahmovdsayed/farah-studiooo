"use server";

import { authorizeUser, errResponse, successResponse } from "@/Helpers/helpers";
import { connectToDatabase } from "@/lib/connectToDatabase";
import Service from "@/models/services.model";
import { ActionState } from "@/types/action.types";
import { revalidateTag } from "next/cache";

export async function deleteServices(id: string): Promise<ActionState> {
  try {
    const [dbConnection, user] = await Promise.all([
       connectToDatabase(),
       authorizeUser(),
     ]);
   
     if (!user || "error" in user) return user;

    if (!id) return errResponse("ID is required");
    const services = await Service.findById(id);
    if (!services) return errResponse("Service not found");

    if (services.userID.toString() !== user.id)
      return errResponse("You are not authorized to delete this service");

    await Service.findByIdAndDelete(id);

    revalidateTag("services");
    return successResponse("Service deleted successfully");
  } catch (error) {
    return errResponse("Something went wrong");
  }
}
