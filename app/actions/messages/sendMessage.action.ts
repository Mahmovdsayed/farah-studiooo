"use server";

import { errResponse, successResponse } from "@/Helpers/helpers";
import { connectToDatabase } from "@/lib/connectToDatabase";
import sendEmailService from "@/lib/email";
import Message from "@/models/message.model";
import Sender from "@/models/sender.model";
import { ActionState } from "@/types/action.types";
import { messageValidationSchema } from "@/validations/message.validation";
import { revalidateTag } from "next/cache";

export async function sendMessage(
  _state: ActionState,
  formData: FormData
): Promise<ActionState> {
  try {
    await connectToDatabase();

    const data = {
      name: formData.get("name") || "",
      email: formData.get("email") || "",
      phone: formData.get("phone") || "",
      subject: formData.get("subject") || "",
      message: formData.get("message") || "",
    };

    const result = await messageValidationSchema.safeParseAsync(data);
    if (!result.success) {
      return errResponse(result.error.issues[0]?.message || "Invalid input");
    }

    const existingUnread = await Message.findOne({
      email: data.email,
      isRead: false,
    });

    if (existingUnread) {
      return errResponse(
        "You already have a pending message. Please wait for a response."
      );
    }
    const newMessage = new Message({ ...data });
    await newMessage.save();

    const newSender = new Sender({
      name: data.name,
      email: data.email,
      phone: data.phone,
    });
    await newSender.save();

    await sendEmailService({
      to: String(data.email),
      subject: "Message Received Confirmation",
      message: `
    <div style="font-family: Arial, sans-serif; padding: 20px; color: #333;">
      <h2 style="color: #4A90E2;">Hello ${data.name},</h2>
      <p>Thank you for contacting us. We've received your message and will get back to you shortly.</p>
      <div style="margin: 20px 0; padding: 15px; background-color: #f9f9f9; border-left: 4px solid #4A90E2;">
        <p><strong>Subject:</strong> ${data.subject}</p>
        <p><strong>Message:</strong><br/>${data.message}</p>
      </div>
      <p>We appreciate your patience.<br/><br/>Best regards,<br/>Farah Studio Team</p>
    </div>
  `,
    });

    await sendEmailService({
      to: process.env.FARAH_EMAIL,
      subject: "New Message from Website",
      message: `
    <div style="font-family: Arial, sans-serif; padding: 20px; color: #333;">
      <h2 style="color: #E74C3C;">📬 New Message Received</h2>
      <p><strong>Name:</strong> ${data.name}</p>
      <p><strong>Email:</strong> ${data.email}</p>
      <p><strong>Phone:</strong> ${data.phone}</p>
      <p><strong>Subject:</strong> ${data.subject}</p>
      <p><strong>Message:</strong><br/>${data.message}</p>
      <hr style="margin: 20px 0;" />
      <p style="font-size: 12px; color: #999;">This message was sent from your website contact form.</p>
    </div>
  `,
    });
    revalidateTag("messages");
    return successResponse("your message has been sent to Farah");
  } catch (error) {
    return errResponse("Something went wrong");
  }
}
