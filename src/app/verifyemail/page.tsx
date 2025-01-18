"use client";
import axios from "axios";
import Link from "next/link";
import React, { useState, useEffect } from "react";

// Define types for error response
interface ErrorResponse {
  message: string;
}

export default function VerifyEmailPage() {
  const [token, setToken] = useState<string>("");
  const [verified, setVerified] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const verifyUserEmail = async () => {
    try {
      await axios.post("/api/users/verifyemail", { token });
      setVerified(true);
    } catch (error) {
      const err = error as { response: { data: ErrorResponse } }; // Type assertion
      setError(err.response?.data?.message || "An unexpected error occurred");
      console.log(err.response?.data);
    }
  };

  useEffect(() => {
    const urlToken = window.location.search.split("=")[1];
    setToken(urlToken || "");
  }, []);

  useEffect(() => {
    if (token.length > 0) {
      verifyUserEmail();
    }
  }, [token]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <h1 className="text-4xl">Verify Email</h1>
      <h2 className="p-2 bg-orange-500 text-white">
        {token ? `${token}` : "No token"}
      </h2>
      {verified && (
        <div>
          <h2 className="text-2xl">Email verified successfully</h2>
          <Link
            className="text-blue-500 underline hover:no-underline"
            href="/login"
          >
            Login
          </Link>
        </div>
      )}
      {error && (
        <div>
          <h2 className="text-2xl text-red-500">{error}</h2>
        </div>
      )}
    </div>
  );
}
