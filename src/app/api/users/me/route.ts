import { getDataFromToken } from "@/helpers/getDataFromToke";
import { NextRequest, NextResponse } from "next/server";
import { User } from "@/models/userModel";
import { connect } from "@/app/dbConfig/dbConfig";

connect();

export async function GET(req: NextRequest) {
  try {
    // Extract user ID from the token
    const userId = await getDataFromToken(req);

    // Ensure userId is valid
    if (!userId) {
      return NextResponse.json({ error: "User ID not found in token" }, { status: 400 });
    }

    // Retrieve user data from database, excluding sensitive fields
    const user = await User.findById(userId).select("-password -isAdmin -isVerified");

    // If user is not found
    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    return NextResponse.json({ message: "User found", data: user });
  } catch (error: unknown) {
    // Enhanced error handling with type checking
    if (error instanceof Error) {
      return NextResponse.json({ error: error.message }, { status: 400 });
    }
    return NextResponse.json({ error: "An unexpected error occurred" }, { status: 500 });
  }
}
