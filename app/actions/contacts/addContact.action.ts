"use server";

import { authorizeUser, errResponse, successResponse } from "@/Helpers/helpers";
import { connectToDatabase } from "@/lib/connectToDatabase";
import Contact from "@/models/contacts.model";
import { ActionState } from "@/types/action.types";
import { contactValidation } from "@/validations/contacts.validations";
import { revalidateTag } from "next/cache";

export async function addContact(
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
      platform: formData.get("platform"),
      url: formData.get("url"),
    };

    const result = await contactValidation.safeParseAsync(data);
    if (!result.success)
      return errResponse(result.error.issues[0]?.message || "Invalid input");

    await Contact.create({
      ...data,
      userID: user.id,
    });

    revalidateTag("contacts");
    return successResponse("Contact added successfully");
  } catch (error) {
    return errResponse("Something went wrong");
  }
}
