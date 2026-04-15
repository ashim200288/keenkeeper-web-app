import Banner from "@/components/Banner";
import FriendCard from "@/components/FriendCard";

async function getFriends() {
  try {
    const res = await fetch("http://localhost:3000/Data.json", {
      cache: "no-store",
    });

    if (!res.ok) return [];
    return await res.json();
  } catch (error) {
    console.error("Error loading friends:", error);
    return [];
  }
}

export default async function Home() {
  const friends = await getFriends();

  return (
    <div className="w-full px-6">
      <Banner />

      {friends.length === 0 ? (
        <p className="text-center text-gray-400 mt-10">
          No friends found
        </p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 mt-6">
          {friends.map((friend) => (
            <FriendCard key={friend.id} friend={friend} />
          ))}
        </div>
      )}
    </div>
  );
}