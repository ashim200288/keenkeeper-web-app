
"use client";

import Image from "next/image";
import Link from "next/link";

export default function FriendCard({ friend }) {
  if (!friend) return null;

  const {
    id,
    name,
    picture,
    days_since_contact,
    status,
    tags = [],
  } = friend;

  const getStatusStyle = (status) => {
    switch (status.toLowerCase()) {
      case "overdue":
        return "bg-red-500 text-white";
      case "almost due":
        return "bg-orange-400 text-white";
      case "on-track":
        return "bg-emerald-800 text-white";
      default:
        return "bg-gray-100 text-gray-600";
    }
  };

  return (
    <Link href={`/friend/${id}`}>
      <div className="bg-white rounded-2xl shadow-sm p-8 flex flex-col items-center border border-gray-50 w-full max-w-[280px] transition-all hover:shadow-md cursor-pointer">

        {/* Profile Image */}
        <div className="relative mb-4">
          <Image
            src={picture}
            alt={name}
            width={85}
            height={85}
            className="rounded-full object-cover aspect-square"
          />
        </div>

        {/* Name */}
        <h2 className="text-xl font-bold text-gray-800 mb-1">
          {name}
        </h2>

        {/* Days Ago */}
        <p className="text-gray-400 text-xs mb-3">
          {days_since_contact}d ago
        </p>

        {/* Tags */}
        <div className="flex flex-wrap justify-center gap-2 mb-4">
          {tags.map((tag, index) => (
            <span
              key={index}
              className="text-[10px] font-bold uppercase tracking-wider bg-emerald-50 text-emerald-500 px-3 py-1 rounded-full"
            >
              {tag}
            </span>
          ))}
        </div>

        {/* Status Badge */}
        <div
          className={`px-5 py-1.5 rounded-full text-[11px] font-bold ${getStatusStyle(
            status
          )}`}
        >
          {status.charAt(0).toUpperCase() + status.slice(1)}
        </div>

      </div>
    </Link>
  );
}