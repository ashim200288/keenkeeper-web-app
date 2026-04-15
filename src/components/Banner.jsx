"use client";

import friends from "../../public/Data.json";

export default function Banner() {
  const totalFriends = friends.length;

  const onTrack = friends.filter((f) => f.status === "on-track").length;
  const almostDue = friends.filter((f) => f.status === "almost due").length;
  const overdue = friends.filter((f) => f.status === "overdue").length;

  return (
    <section className="bg-gray-50 py-16 px-6">
      <div className="max-w-6xl mx-auto text-center">

        {/* Title */}
        <h1 className="text-4xl md:text-5xl font-bold text-gray-800">
          Friends to keep close in your life
        </h1>

        {/* Subtitle */}
        <p className="mt-4 text-gray-500 max-w-2xl mx-auto">
          Your personal shelf of meaningful connections. Stay updated and never lose touch again.
        </p>

        {/* Button */}
        <button className="mt-6 px-6 py-3 bg-green-800 text-white rounded-lg hover:bg-green-900 transition">
          + Add a Friend
        </button>

        {/* Stats */}
        <div className="mt-12 grid grid-cols-1 md:grid-cols-4 gap-6">

          <div className="bg-white shadow-sm rounded-xl p-6">
            <h2 className="text-2xl font-bold text-green-900">{totalFriends}</h2>
            <p className="text-gray-500 mt-1">Total Friends</p>
          </div>

          <div className="bg-white shadow-sm rounded-xl p-6">
            <h2 className="text-2xl font-bold text-green-900">{onTrack}</h2>
            <p className="text-gray-500 mt-1">On Track</p>
          </div>

          <div className="bg-white shadow-sm rounded-xl p-6">
            <h2 className="text-2xl font-bold text-yellow-600">{almostDue}</h2>
            <p className="text-gray-500 mt-1">Almost Due</p>
          </div>

          <div className="bg-white shadow-sm rounded-xl p-6">
            <h2 className="text-2xl font-bold text-red-600">{overdue}</h2>
            <p className="text-gray-500 mt-1">Overdue</p>
          </div>

        </div>
      </div>
    </section>
  );
}