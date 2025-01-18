"use client"
import React, { useEffect, useState } from "react";
import axios from "axios";

interface UserProfileParams {
  params: {
    id: string;
  };
}

interface User {
  username: string;
  email: string;
  // Add other user properties as necessary
}

export default function UserProfile({ params }: UserProfileParams) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string>("");

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axios.get(`/api/users/${params.id}`);
        setUser(response.data);
      } catch (error) {
        if (error instanceof Error) {
          setError(error.message);
        }
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, [params.id]);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-black/40">
        <div className="text-white">Loading...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-black/40">
        <div className="text-red-500">{`Error: ${error}`}</div>
      </div>
    );
  }

  return (
    <div className="flex justify-center items-center min-h-screen bg-black/40">
      <div className="container mx-auto max-w-md p-4 md:p-6 bg-white/10 rounded-lg shadow-lg">
        <div className="text-center">
          <h1 className="text-3xl font-bold mb-4">Profile</h1>
          <p className="text-lg">Welcome back, {user?.username}!</p>
          <p className="text-sm text-gray-400">Email: {user?.email}</p>
          {/* Add more details as necessary */}
        </div>
      </div>
    </div>
  );
}
