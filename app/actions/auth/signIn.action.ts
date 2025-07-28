"use server";

import {
  errResponse,
  successResponse,
  verifyPassword,
} from "@/Helpers/helpers";
import { connectToDatabase } from "@/lib/connectToDatabase";
import User from "@/models/User.model";
import { signinValidation } from "@/validations/signIn.validation";
import { cookies } from "next/headers";
import jwt from "jsonwebtoken";
import { ActionState } from "@/types/action.types";
import sendEmailService from "@/lib/email";
import LoginHistory from "@/models/loginHistory.model";

export async function signInAction(
  _state: ActionState,
  formData: FormData
): Promise<ActionState> {
  try {
    await connectToDatabase();

    const email = formData.get("email");
    const password = formData.get("password");
    const userAgent = formData.get("userAgent");
    const location = formData.get("location");

    if (
      !email ||
      !password ||
      typeof email !== "string" ||
      typeof password !== "string"
    ) {
      return errResponse("Email and password are required.");
    }

    const result = await signinValidation.safeParseAsync({ email, password });
    if (!result.success) {
      return errResponse(result.error.issues[0]?.message || "Invalid input");
    }

    const user = await User.findOne({ email }).select(
      "password username email _id"
    );
    if (!user) return errResponse("Invalid login credentials");

    const isValid = await verifyPassword(password, user.password);
    if (!isValid) return errResponse("Invalid login credentials");

    const token = jwt.sign(
      {
        id: user._id,
        userEmail: user.email,
        userName: user.username,
      },
      process.env.LOGIN_SIG!,
      { expiresIn: "30d" }
    );

    (await cookies()).set("userToken", token, {
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      httpOnly: true,
      path: "/",
      maxAge: 30 * 24 * 60 * 60,
    });

    await LoginHistory.create({
      userID: user._id,
      location,
      userAgent,
      time: new Date(),
    });

    await sendEmailService({
      to: user.email,
      subject: "New Login Alert From Farah Studio 🚨",
      message: `
  <div style="font-family: Arial, sans-serif; background-color: #f4f4f4; padding: 20px;">
    <div style="max-width: 600px; margin: 0 auto; background-color: #ffffff; padding: 20px; border-radius: 10px; box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);">
      <h1 style="color: #333333; text-align: center; font-size: 16px;">🚨 New Login Detected</h1>
      <p style="color: #555555; font-size: 13px; text-align: center;">
        A new login to your account at <strong>Farah Studio</strong> was detected. If this was you, no action is needed. If not, please secure your account immediately.
      </p>
      
      <div style="margin: 20px 0;">
        <table style="width: 100%; font-size: 13px; color: #555555;">
          <tr>
            <td style="padding: 8px 0;"><strong>Location:</strong></td>
            <td style="padding: 8px 0;">${location}</td>
          </tr>
          <tr>
            <td style="padding: 8px 0;"><strong>Device:</strong></td>
            <td style="padding: 8px 0;">${userAgent}</td>
          </tr>
          <tr>
            <td style="padding: 8px 0;"><strong>Time:</strong></td>
            <td style="padding: 8px 0;">${new Date().toLocaleString()}</td>
          </tr>
         
        </table>
      </div>

      <p style="color: #555555; font-size: 13px; text-align: center;">If you don’t recognize this activity, please change your password immediately.</p>

      <div style="text-align: center; margin-top: 20px;">
        <a href="https://www.instagram.com/nest.dev/" target="_blank" style="display: inline-block; font-size: 13px; color: #999999; text-decoration: none; margin-top: 10px;">
          © ${new Date().getFullYear()} NEST. All rights reserved.
        </a>
      </div>
    </div>
  </div>
`,
    });

    return successResponse(`Welcome back ${user.username} 👋`);
  } catch (error) {
    return errResponse("Something went wrong");
  }
}
