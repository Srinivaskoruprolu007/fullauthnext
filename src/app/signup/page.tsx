"use client";
import Link from "next/link";
import React, { useEffect } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";
export default function SignUpPage() {
  const router = useRouter();
  const [user, setUser] = React.useState({
    username: "",
    email: "",
    password: "",
  });
  const [buttonDisabled, setButtonDisabled] = React.useState(false);
  const [loading, setLoading] = React.useState(false);

  useEffect(() => {
    if (
      user.email.length > 0 &&
      user.password.length > 0 &&
      user.username.length > 0
    ) {
      setButtonDisabled(false);
    } else {
      setButtonDisabled(true);
    }
  }, [user]);
  const onSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      setLoading(true);
      const response = await axios.post("/api/users/signup", user);
      console.log("Signup success ", response.data);
      toast.success("Signup success");
      router.push("/login");
    } catch (error: any) {
      console.log("Signup failed ", error.message);
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className="flex justify-center items-center min-h-screen bg-black/40">
      <div className="container mx-auto max-w-md p-4 md:p-6 bg-white/10 rounded-lg shadow-lg">
        <div className="text-center">
          <h1 className="text-3xl font-bold mb-4">
            {loading ? "Processing" : "Sign Up"}
          </h1>
        </div>
        <form className="space-y-4" onSubmit={onSignUp}>
          <div className="flex flex-col space-y-1">
            <label htmlFor="username" className="text-sm font-medium">
              Username
            </label>
            <input
              type="text"
              id="username"
              name="username"
              placeholder="username"
              onChange={(e) => setUser({ ...user, username: e.target.value })}
              className="w-full p-2 border border-gray-300 rounded-lg outline-none text-black"
            />
          </div>
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
            className="w-full p-2 bg-blue-500 hover:bg-blue-700 text-white font-bold rounded-lg"
          >
            {buttonDisabled ? "No Signup" : "Signup"}
          </button>
          <Toaster
            position={"top-right"}
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
          <div className="text-center">
            <Link
              href="/login"
              className="text-blue-500 hover:text-blue-700 underline"
            >
              Login here
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}
