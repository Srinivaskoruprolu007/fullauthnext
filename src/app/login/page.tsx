"use client";
import Link from "next/link";
import React, { useEffect } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import toast, { Toaster } from "react-hot-toast";
export default function LoginPage() {
  const router = useRouter();
  const [user, setUser] = React.useState({
    email: "",
    password: "",
  });
  const [buttonDisabled, setButtonDisabled] = React.useState(false);
  const [loading, setLoading] = React.useState(false);

  useEffect(() => {
    if (user.email.length > 0 && user.password.length > 0) {
      setButtonDisabled(false);
    } else {
      setButtonDisabled(true);
    }
  }, [user]);
  const onLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      setLoading(true);
      const response = await axios.post("/api/users/login", user);
      console.log("Login success ", response.data);
      toast.success("Login success");
      router.push("/profile");
    } catch (error: any) {
      console.log("Login failed ", error.message);
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className=" flex justify-center items-center min-h-screen p-4 md:p-6 bg-black/40 rounded-lg shadow-lg">
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
              placeholder="email"
              onChange={(e) => setUser({ ...user, email: e.target.value })}
              className="w-full p-2 border border-gray-300 rounded-lg outline-none text-black"
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
              placeholder="password"
              onChange={(e) => setUser({ ...user, password: e.target.value })}
              className="w-full p-2 border border-gray-300 rounded-lg outline-none text-black"
            />
          </div>
          <button
            type="submit"
            className="w-full bg-green-500 text-white p-2 rounded-lg font-bold hover:bg-green-600"
          >
            {buttonDisabled ? "disabled" : "Login"}
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
