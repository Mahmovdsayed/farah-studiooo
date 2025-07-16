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
    // Connect to the database
    await connectToDatabase();

    // Get email and password from the form data
    const email = formData.get("email");
    const password = formData.get("password");

    // Check if email and password exist and are strings
    if (
      !email ||
      !password ||
      typeof email !== "string" ||
      typeof password !== "string"
    ) {
      return errResponse("Email and password are required.");
    }

    // Validate the inputs using Zod
    const result = await signinValidation.safeParseAsync({ email, password });
    if (!result.success) {
      // Return the first validation error message if any
      return errResponse(result.error.issues[0]?.message || "Invalid input");
    }

    // Search for the user in the database by email
    const user = await User.findOne({ email }).select(
      "password username email _id"
    );
    if (!user) return errResponse("Invalid login credentials");

    // Compare the given password with the hashed one in DB
    const isValid = await verifyPassword(password, user.password);
    if (!isValid) return errResponse("Invalid login credentials");

    // Create JWT token with user data
    const token = jwt.sign(
      {
        id: user._id,
        userEmail: user.email,
        userName: user.username,
      },
      process.env.LOGIN_SIG!, // secret key for signing
      { expiresIn: "30d" } // token valid for 30 days
    );

    // Set the token in a cookie
    (await cookies()).set("userToken", token, {
      secure: process.env.NODE_ENV === "production", // use HTTPS in production
      sameSite: "lax", // protect against CSRF
      httpOnly: true, // prevent JavaScript access to cookie
      path: "/", // cookie is valid for all routes
      maxAge: 30 * 24 * 60 * 60, // 30 days
    });

    // Return a success message with the username
    return successResponse(`Welcome back ${user.username} 👋`);
  } catch (error) {
    console.error("SignIn Action Error:", error);
    // If something goes wrong, return a generic error
    return errResponse("Something went wrong");
  }
}
