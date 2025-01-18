type paramsType = Promise<{ id: string }>;

type props = {
  params: paramsType;
};

export default async function UserProfile({ params }: props) {
  const { id } = await params;

  return (
    <div className="h-screen flex flex-col items-center justify-center bg-gray-700">
      <h1 className="text-5xl font-bold tracking-wide">Profile</h1>
      <hr className="w-1/2 my-6 border-gray-300" />
      <p className="text-4xl font-semibold tracking-wide">
        Profile page
        <span className="bg-orange-500 text-black rounded-full px-4 py-2 ml-4">
          {id}
        </span>
      </p>
    </div>
  );
}
