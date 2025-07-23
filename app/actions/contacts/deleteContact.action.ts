"use server";

import { authorizeUser, errResponse, successResponse } from "@/Helpers/helpers";
import { connectToDatabase } from "@/lib/connectToDatabase";
import Contact from "@/models/contacts.model";
import { isValidObjectId } from "mongoose";
import { revalidateTag } from "next/cache";

export async function deleteContact(id: string) {
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
      return errResponse("You are not authorized to delete this contact");

    await Contact.findByIdAndDelete(id);
    revalidateTag("contacts");
    return successResponse("Contact deleted successfully");
  } catch {
    return errResponse("Something went wrong");
  }
}
