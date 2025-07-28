"use server";

import { authorizeUser, errResponse, successResponse } from "@/Helpers/helpers";
import { connectToDatabase } from "@/lib/connectToDatabase";
import Testimonial from "@/models/testimonials.model";
import { isValidObjectId } from "mongoose";
import { revalidateTag } from "next/cache";

export async function deleteTestimonial(id: string) {
  try {
    if (!id) return errResponse("ID is required");
    if (!isValidObjectId(id)) return errResponse("Invalid ID");

    const [dbConnection, user] = await Promise.all([
      connectToDatabase(),
      authorizeUser(),
    ]);
    if (!user || "error" in user) return user;

    const testimonial = await Testimonial.findById(id);
    if (!testimonial) return errResponse("Testimonial not found");
    await testimonial.deleteOne();

    revalidateTag("testimonials");

    return successResponse("Testimonial deleted successfully");
  } catch (error) {
    return errResponse("Something went wrong");
  }
}
