import { authenticateUser } from "@/Helpers/helpers";
import { connectToDatabase } from "@/lib/connectToDatabase";
import Client from "@/models/clients.model";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    await connectToDatabase();
    const user = await authenticateUser();
    if (!user)
      return NextResponse.json({ success: false, message: "Unauthorized" });

    const clients = await Client.find({ userID: user.id });
    const clientCount = await Client.countDocuments({ userID: user.id });
    if (!clients || clientCount === 0) {
      return NextResponse.json({
        success: false,
        data: {
          message:
            "No clients found for this user, please add some clients to your account",
          clients: [],
          clientCount: 0,
        },
      });
    }
    return NextResponse.json({
      success: true,
      data: { clients },
    });
  } catch (error) {
    return NextResponse.json({
      success: false,
      message: "Something went wrong",
    });
  }
}
