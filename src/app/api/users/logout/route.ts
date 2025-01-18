import { NextResponse } from "next/server";

export async function GET() {
  try {
    // Create the response
    const response = NextResponse.json({
      message: "Logout successful",
      success: true,
      status: 200,
    });

    // Clear the token by setting an expired cookie
    response.cookies.set("token", "", {
      httpOnly: true,
      expires: new Date(0), // Ensures the cookie is expired
      path: "/", // Set path to "/" to ensure it clears the correct cookie
    });

    return response;
  } catch (error: unknown) {
    // Proper error handling with type-checking
    if (error instanceof Error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }
    return NextResponse.json({ error: "An unexpected error occurred" }, { status: 500 });
  }
}
