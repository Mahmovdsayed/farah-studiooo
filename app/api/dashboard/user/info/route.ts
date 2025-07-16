import { authenticateUser } from "@/Helpers/helpers";
import { connectToDatabase } from "@/lib/connectToDatabase";
import User from "@/models/User.model";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
  try {
    await connectToDatabase();
    const user = await authenticateUser();
    if (!user)
      return NextResponse.json({ success: false, message: "Unauthorized" });

    const getUser = await User.findOne({ _id: user.id }).select(
      "email name username avatar.url"
    );

    if (!getUser)
      return NextResponse.json({ success: false, message: "user not found" });

    return NextResponse.json({ success: true, data: getUser });
  } catch (error) {
    return NextResponse.json({
      success: false,
      message: "Failed to fetch user info",
    });
  }
}
