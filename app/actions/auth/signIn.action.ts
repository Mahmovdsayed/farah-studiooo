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

export async function signInAction(
  _state: ActionState,
  formData: FormData
): Promise<ActionState> {
  try {
    await connectToDatabase();

    const email = formData.get("email");
    const password = formData.get("password");

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

    return successResponse(`Welcome back ${user.username} 👋`);
  } catch (error) {
    return errResponse("Something went wrong");
  }
}
