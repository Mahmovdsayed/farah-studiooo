"use server";

import {
  authorizeUser,
  errResponse,
  successResponse,
  uploadImageToCloudinary,
} from "@/Helpers/helpers";
import { connectToDatabase } from "@/lib/connectToDatabase";
import Client from "@/models/clients.model";
import { ActionState } from "@/types/action.types";
import { clientValidation } from "@/validations/clients.validation";
import { revalidateTag } from "next/cache";

export async function addClient(
  _state: ActionState,
  formData: FormData
): Promise<ActionState> {
  try {
    const [dbConnection, user] = await Promise.all([
      connectToDatabase(),
      authorizeUser(),
    ]);

    if (!user || "error" in user) return user;

    const clientCount = await Client.countDocuments({ userID: user.id });
    if (clientCount >= 15) {
      return errResponse("You have reached the maximum limit of 15 clients.");
    }

    const clientData = {
      name: formData.get("name") as string,
      description: formData.get("description") as string | null,
      clientImage: formData.get("clientImage") as File | null,
      url: formData.get("url") as string,
    };
    const result = await clientValidation.safeParseAsync(clientData);
    if (!result.success) {
      return errResponse(result.error.issues[0]?.message || "Invalid input");
    }

    const defaultImageUrl =
      "https://res.cloudinary.com/dtpsyi5am/image/upload/v1741391758/z9mzkfjfalpokwes25er.svg";
    let imageUrl = defaultImageUrl;
    let publicId = "";

    if (
      clientData.clientImage &&
      clientData.clientImage instanceof File &&
      clientData.clientImage.size > 0
    ) {
      const uploadResult = await uploadImageToCloudinary(
        clientData.clientImage,
        "Clients"
      );
      if (uploadResult) {
        imageUrl = uploadResult.imageUrl;
        publicId = uploadResult.publicId;
      }
    }
    await Client.create({
      ...clientData,
      clientImage: {
        url: imageUrl,
        public_id: publicId,
      },
      userID: user.id,
    });

    revalidateTag("clients");

    return successResponse("Client added successfully");
  } catch (error) {
    return errResponse("Something went wrong");
  }
}
