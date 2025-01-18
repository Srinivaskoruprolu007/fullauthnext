"use client";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import axios, { AxiosError } from "axios";
import { useRouter } from "next/navigation";
import toast, { Toaster } from "react-hot-toast";

export default function LoginPage() {
  const router = useRouter();
  const [user, setUser] = useState<{ email: string; password: string }>({
    email: "",
    password: "",
  });
  const [buttonDisabled, setButtonDisabled] = useState<boolean>(true);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    setButtonDisabled(!(user.email.trim() && user.password.trim()));
  }, [user]);

  const onLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      setLoading(true);
      const response = await axios.post<{ message: string }>(
        "/api/users/login",
        user
      );
      console.log("Login success:", response.data);
      toast.success("Login successful");
      router.push("/profile");
    } catch (err) {
      const error = err as AxiosError<{ error: string }>;
      const errorMessage =
        error.response?.data?.error || "Failed to login. Please try again.";
      console.log("Login failed:", errorMessage);
      toast.error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen p-4 md:p-6 bg-black/40 rounded-lg shadow-lg">
      <div className="container mx-auto max-w-md p-4 md:p-6 bg-white/10 rounded-lg shadow-lg">
        <div className="text-center">
          <h1 className="text-3xl font-bold mb-4">
            {loading ? "Loading..." : "Login"}
          </h1>
        </div>
        <form className="space-y-4" onSubmit={onLogin}>
          <div className="flex flex-col space-y-1">
            <label htmlFor="email" className="text-sm font-medium">
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              placeholder="Email"
              value={user.email}
              onChange={(e) =>
                setUser((prev) => ({ ...prev, email: e.target.value }))
              }
              className="w-full p-2 border border-gray-300 rounded-lg outline-none text-black"
              required
            />
          </div>
          <div className="flex flex-col space-y-1">
            <label htmlFor="password" className="text-sm font-medium">
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              placeholder="Password"
              value={user.password}
              onChange={(e) =>
                setUser((prev) => ({ ...prev, password: e.target.value }))
              }
              className="w-full p-2 border border-gray-300 rounded-lg outline-none text-black"
              required
            />
          </div>
          <button
            type="submit"
            className={`w-full ${
              buttonDisabled
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-green-500 hover:bg-green-600"
            } text-white p-2 rounded-lg font-bold`}
            disabled={buttonDisabled}
          >
            {loading ? "Logging in..." : "Login"}
          </button>
          <Toaster
            position="top-right"
            reverseOrder={false}
            toastOptions={{
              success: {
                duration: 3000,
              },
              error: {
                duration: 3000,
              },
            }}
          />
        </form>
        <p className="mt-4">
          Don&apos;t have an account?{" "}
          <Link href="/signup" className="text-blue-500 hover:text-blue-700">
            Sign up
          </Link>
        </p>
        <p className="mt-4">
          Forgot password?{" "}
          <Link
            href="/forgotpassword"
            className="text-blue-500 hover:text-blue-700"
          >
            Forgot password
          </Link>
        </p>
      </div>
    </div>
  );
}
