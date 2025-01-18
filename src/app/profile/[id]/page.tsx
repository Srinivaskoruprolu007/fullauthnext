"use client"
// src/app/profile/[id]/page.tsx
import React, { useEffect, useState } from "react";
import axios from "axios";

interface User {
  username: string;
  email: string;
  // Add other user properties as needed
}

const UserProfile = ({ params }: { params: { id: string } }) => {
  const [user, setUser] = useState<User | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axios.get(`/api/users/${params.id}`);
        setUser(response.data);
      } catch (error) {
        setError("Failed to fetch user data");
        console.error(error);
      }
    };

    if (params.id) {
      fetchUserData();
    }
  }, [params.id]);

  if (error) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-black/40">
        <div className="text-red-500">{error}</div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-black/40">
        <div className="text-white">Loading user data...</div>
      </div>
    );
  }

  return (
    <div className="flex justify-center items-center min-h-screen bg-black/40">
      <div className="container mx-auto max-w-md p-4 md:p-6 bg-white/10 rounded-lg shadow-lg">
        <div className="text-center">
          <h1 className="text-3xl font-bold mb-4">Profile</h1>
          <p className="text-lg">Welcome back, {user.username}!</p>
          <p className="text-sm text-gray-400">Email: {user.email}</p>
          {/* Add more user details as necessary */}
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
