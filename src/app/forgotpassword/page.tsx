"use client";
import axios, { AxiosError } from "axios";
import React, { useState } from "react";
import toast, { Toaster } from "react-hot-toast";

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState<string>("");
  const [message, setMessage] = useState<string>("");
  const [error, setError] = useState<string>("");

  const handleForgotPassword = async () => {
    if (!email.trim()) {
      setError("Email is required");
      toast.error("Email is required");
      return;
    }

    try {
      const response = await axios.post<{ message: string }>(
        "/api/users/forgotpassword",
        { email }
      );
      setMessage(response.data.message);
      setError("");
      toast.success("Email sent successfully");
    } catch (err) {
      const axiosError = err as AxiosError<{ error: string }>;
      const errorMessage =
        axiosError.response?.data?.error || "Unable to send reset password email";
      setError(errorMessage);
      setMessage("");
      toast.error(errorMessage);
    }
  };

  return (
    <div className="flex items-center flex-col gap-4 justify-center min-h-screen bg-black/40 p-4 md:p-6 rounded-lg shadow-lg">
      <h1 className="text-3xl font-bold mb-4">Forgot Password</h1>
      <input
        type="email"
        placeholder="Enter your email address"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className="p-2 bg-white/10 outline-none border-none rounded-lg"
      />
      <button
        className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-lg"
        onClick={handleForgotPassword}
      >
        Reset Password
      </button>
      <Toaster
        toastOptions={{
          success: {
            duration: 3000,
          },
          error: {
            duration: 3000,
          },
        }}
      />
      {message && <p className="text-lg text-green-500">{message}</p>}
      {error && <p className="text-lg text-red-500">{error}</p>}
    </div>
  );
}
