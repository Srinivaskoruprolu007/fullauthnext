"use client";
import axios from "axios";
import React  from "react";
import toast, { Toaster } from "react-hot-toast";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function ProfilePage() {
  const router = useRouter();
  const [user, setUser] = React.useState("nothing");
  const logout = async () => {
    try {
      await axios.get("/api/users/logout");
      toast.success("Logout successful");
      router.push("/login");
    } catch (err) {
      console.log("Failed to log out", err);
      toast.error("Failed to log out");
    }
  };
  const getUserDeatils = async () => {
    const res = await axios.get("/api/users/me");
    console.log(res.data);
    setUser(res.data.data._id);
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-black/40">
      <div className="container mx-auto max-w-md p-4 md:p-6 bg-white/10 rounded-lg shadow-lg">
        <div className="text-center">
          <h1 className="text-3xl font-bold mb-4">Profile</h1>
          <h1 className="text-lg bg-black/40">
            {user === "nothing" ? (
              "Nothing"
            ) : (
              <Link href={`/profile/${user}`}>Go to Profile</Link>
            )}
          </h1>
          <p className="text-lg">Welcome back, {""}!</p>
          <p className="text-sm text-gray-400">{""}</p>
        </div>
        <div className="text-center">
          <button
            className="mt-4 bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded"
            onClick={getUserDeatils}
          >
            Get User Details
          </button>
          <button
            onClick={logout}
            className="mt-4 bg-red-500 hover:bg-red-600 text-white font-semibold py-2 px-4 rounded"
          >
            Logout
          </button>
          <Toaster
            position="top-right"
            toastOptions={{
              success: {
                duration: 3000,
              },
              error: {
                duration: 3000,
              },
            }}
          />
        </div>
      </div>
    </div>
  );
}
