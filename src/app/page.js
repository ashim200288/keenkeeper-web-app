
import Banner from "@/components/Banner";
import FriendCard from "@/components/FriendCard";

export default async function Home() {
  const res = await fetch("http://localhost:3000/data.json", {
    cache: "no-store",
  });

  const friends = await res.json();

  return (
    <div className="w-full px-6">
      <Banner />

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {friends.map((friend) => (
          <FriendCard key={friend.id} friend={friend} />
        ))}
      </div>
    </div>
  );
}