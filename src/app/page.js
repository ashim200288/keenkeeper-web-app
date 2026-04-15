
// import Banner from "@/components/Banner";
// import FriendCard from "@/components/FriendCard";

// async function getFriends() {
//   try {
   
//     const filePath = path.join(process.cwd(), 'public', 'friends.json');
//     const fileContents = await fs.readFile(filePath, 'utf8');
//     return JSON.parse(fileContents);
//   } catch (error) {
//     console.error("File read error, trying fetch...");
    
//     const baseUrl = process.env.VERCEL_URL ? https://${process.env.VERCEL_URL} : "http://localhost:3000";
//     try {
//       const res = await fetch(${baseUrl}/friends.json, { cache: 'no-store' });
//       if (!res.ok) return [];
//       return res.json();
//     } catch (fetchErr) {
//       return []; 
//     }
//   }
// }
// export default async function Home() {
//   const friends = await getFriends();
//   // const res = await fetch("http://localhost:3000/data.json", {
//   //   cache: "no-store",
//   // });

//   const friends = await res.json();

//   return (
//     <div className="w-full px-6">
//       <Banner />

//       <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
//         {friends.map((friend) => (
//           <FriendCard key={friend.id} friend={friend} />
//         ))}
//       </div>
//     </div>
//   );
// }
import Banner from "@/components/Banner";
import FriendCard from "@/components/FriendCard";

async function getFriends() {
  try {
    const res = await fetch("http://localhost:3000/Data.json", {
      cache: "no-store",
    });

    if (!res.ok) {
      console.log("Failed to load friends.json");
      return [];
    }

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