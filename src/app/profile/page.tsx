export default function ProfilePage() {
  return (
    <div className="flex justify-center items-center min-h-screen bg-black/40">
      <div className="container mx-auto max-w-md p-4 md:p-6 bg-white/10 rounded-lg shadow-lg">
        <div className="text-center">
          <h1 className="text-3xl font-bold mb-4">Profile</h1>
          <p className="text-lg">Welcome back, {""}!</p>
          <p className="text-sm text-gray-400">{""}</p>
        </div>
      </div>
    </div>
  );
}
