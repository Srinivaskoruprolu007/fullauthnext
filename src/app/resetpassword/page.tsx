"use client";
import { useState, useEffect } from "react";
import axios, { AxiosError } from "axios";
import toast, { Toaster } from "react-hot-toast";
import Link from "next/link";

export default function ResetPasswordPage() {
  const [password, setPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");
  const [token, setToken] = useState<string>("");
  const [error, setError] = useState<string>("");
  const [success, setSuccess] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    const urlToken = new URLSearchParams(window.location.search).get("token");
    if (!urlToken) {
      setError("Invalid or missing token");
      return;
    }
    setToken(urlToken);
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (loading) return;

    try {
      if (!password || password.length < 8) {
        setError("Password must be at least 8 characters long");
        return;
      }
      if (password !== confirmPassword) {
        setError("Passwords do not match");
        return;
      }
      setLoading(true);
      setError("");

      const response = await axios.post<{ message: string }>(
        "/api/users/resetpassword",
        { password, token }
      );

      setSuccess(true);
      toast.success(response.data.message);
    } catch (err) {
      const errorMessage =
        (err as AxiosError<{ error: string }>)?.response?.data?.error ||
        "An unexpected error occurred";
      setError(errorMessage);
      toast.error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen p-4 md:p-6 bg-black/40">
      <div className="container mx-auto max-w-md p-4 md:p-6 bg-white/10 rounded-lg shadow-lg">
        <div className="text-center">
          <h1 className="text-3xl font-bold mb-4">Reset Password</h1>
        </div>
        {error && <p className="text-lg text-red-500">{error}</p>}
        {success ? (
          <div className="text-center">
            <p className="text-lg text-green-500">Password reset successfully!</p>
            <Link
              href="/login"
              className="text-blue-500 hover:text-blue-700 underline mt-4 block"
            >
              Go to Login
            </Link>
          </div>
        ) : (
          <form onSubmit={handleSubmit}>
            <div className="flex flex-col space-y-4">
              <label htmlFor="password" className="text-sm font-medium">
                New Password
              </label>
              <input
                type="password"
                id="password"
                name="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="p-2 bg-white/10 outline-none border-none rounded-lg"
                placeholder="Enter your new password"
              />
              <label htmlFor="confirmPassword" className="text-sm font-medium">
                Confirm Password
              </label>
              <input
                type="password"
                id="confirmPassword"
                name="confirmPassword"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="p-2 bg-white/10 outline-none border-none rounded-lg"
                placeholder="Re-enter your new password"
              />
            </div>
            <button
              type="submit"
              disabled={loading}
              className={`bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-lg mt-4 ${
                loading ? "opacity-50 cursor-not-allowed" : ""
              }`}
            >
              {loading ? "Resetting..." : "Reset Password"}
            </button>
          </form>
        )}
        <Toaster />
      </div>
    </div>
  );
}
