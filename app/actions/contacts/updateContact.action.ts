"use server";

import { authorizeUser, errResponse, successResponse } from "@/Helpers/helpers";
import { connectToDatabase } from "@/lib/connectToDatabase";
import Contact from "@/models/contacts.model";
import { ActionState } from "@/types/action.types";
import { contactValidation } from "@/validations/contacts.validations";
import { isValidObjectId } from "mongoose";
import { revalidateTag } from "next/cache";

export async function updateContact(
  _state: ActionState,
  formData: FormData,
  id: string
): Promise<ActionState> {
  try {
    if (!id) return errResponse("ID is required");
    if (!isValidObjectId(id)) return errResponse("Invalid ID");

    const [dbConnection, user] = await Promise.all([
      connectToDatabase(),
      authorizeUser(),
    ]);

    if (!user || "error" in user) return user;

    const contact = await Contact.findById(id);
    if (!contact) return errResponse("Contact not found");
    if (contact.userID.toString() !== user.id)
      return errResponse("You are not authorized to update this contact");

    const data = {
      platform: formData.get("platform") || "",
      url: formData.get("url") || "",
    };

    const result = await contactValidation.safeParseAsync(data);
    if (!result.success) {
      return errResponse(result.error.issues[0]?.message || "Invalid input");
    }

    await Contact.findByIdAndUpdate(id, data, {
      new: true,
    });
    revalidateTag("contacts");
    return successResponse("Contact updated successfully");
  } catch {
    return errResponse("Something went wrong");
  }
}
