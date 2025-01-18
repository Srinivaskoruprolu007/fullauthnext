"use client";
import axios from "axios";
import React, { useState } from "react";
import toast, { Toaster } from "react-hot-toast";

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const handleForgotPassword = async () => {
    try {
      const response = await axios.post("api/users/forgotpassword", { email });
      setMessage(response.data.message);
      toast.success("email sent successfully");
      setError("");
    } catch (error: any) {
      setError(error.message);
      console.log(error.message);
      toast.error("unable to send reset password email");
      setMessage("");
    }
  };
  return (
    <div className="flex items-center flex-col gap-4 justify-center min-h-screen bg-black/40 p-4 md:p-6 rounded-lg shadow-lg">
      <h1 className="text-3xl font-bold mb-4">Forgot password</h1>
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
      {message && <p className="text-lg">{message}</p>}
      {error && <p className="text-lg text-red-500">{error}</p>}
    </div>
  );
}
