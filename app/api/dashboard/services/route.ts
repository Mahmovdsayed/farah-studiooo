import { authenticateUser } from "@/Helpers/helpers";
import { connectToDatabase } from "@/lib/connectToDatabase";
import Service from "@/models/services.model";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    await connectToDatabase();
    const user = await authenticateUser();
    if (!user)
      return NextResponse.json({ success: false, message: "Unauthorized" });

    const services = await Service.find({ userID: user.id });
    const servicesCount = await Service.countDocuments({ userID: user.id });

    if (!services || servicesCount === 0)
      return NextResponse.json({
        success: false,
        data: {
          message:
            "No services found for this user , please add some services to your account",
          servicesCount: 0,
        },
      });

    return NextResponse.json({
      success: true,
      data: { services },
    });
  } catch (error) {
    return NextResponse.json({
      success: false,
      message: "Failed to fetch services",
    });
  }
}
