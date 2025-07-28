"use server";

import { authorizeUser, errResponse, successResponse } from "@/Helpers/helpers";
import { connectToDatabase } from "@/lib/connectToDatabase";
import sendEmailService from "@/lib/email";
import Testimonial from "@/models/testimonials.model";
import { ActionState } from "@/types/action.types";
import { testimonialValidation } from "@/validations/testimonial.validation";
import { revalidateTag } from "next/cache";

export async function addTestimonials(
  _state: ActionState,
  formData: FormData
): Promise<ActionState> {
  try {
    const data = {
      name: formData.get("name") || "",
      position: formData.get("position") || "",
      message: formData.get("message") || "",
      rating: formData.get("rating") || "",
    };

    const result = await testimonialValidation.safeParseAsync(data);
    if (!result.success)
      return errResponse(result.error.issues[0]?.message || "Invalid input");
    await connectToDatabase();
    await Testimonial.create({
      ...data,
    });
    revalidateTag("testimonials");

    await sendEmailService({
      to: process.env.FARAH_EMAIL,
      subject: `New Feedback Received! - ${data.name}`,
      message: `<div style="font-family: Arial, sans-serif; background-color: #f4f4f4; padding: 20px;">
    <div style="max-width: 600px; margin: 0 auto; background-color: #ffffff; padding: 20px; border-radius: 10px; box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);">
      <h1 style="color: #333333; text-align: center; font-size: 16px;">New Feedback Received!</h1>
      <p style="color: #555555; font-size: 13px; text-align: center;">
        A new testimonial has been submitted on your website.
      </p>
      
      <div style="margin: 20px 0;">
        <table style="width: 100%; font-size: 13px; color: #555555;">
          <tr>
            <td style="padding: 8px 0;"><strong>Name:</strong></td>
            <td style="padding: 8px 0;">${data.name}</td>
          </tr>
          <tr>
            <td style="padding: 8px 0;"><strong>Position:</strong></td>
            <td style="padding: 8px 0;">${data.position}</td>
          </tr>
          <tr>
            <td style="padding: 8px 0;"><strong>Rating:</strong></td>
            <td style="padding: 8px 0;">${data.rating} out of 5 stars</td>
          </tr>
          <tr>
            <td style="padding: 8px 0;"><strong>Message:</strong></td>
            <td style="padding: 8px 0;">${data.message}</td>
          </tr>
        </table>
      </div>

      <div style="text-align: center; margin-top: 20px;">
        <a href="https://www.instagram.com/nest.dev/" target="_blank" style="display: inline-block; font-size: 13px; color: #999999; text-decoration: none; margin-top: 10px;">
          © ${new Date().getFullYear()} NEST. All rights reserved.
        </a>
      </div>
    </div>
  </div>
`,
    });

    return successResponse("Thank you for your feedback!");
  } catch (error) {
    return errResponse("Something went wrong");
  }
}
