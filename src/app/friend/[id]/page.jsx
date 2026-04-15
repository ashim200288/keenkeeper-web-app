"use client";

import { use, useEffect, useState } from "react";
import Image from "next/image";
import toast from "react-hot-toast";
import {
  FaPhone,
  FaComment,
  FaVideo,
  FaTrash,
  FaArchive,
  FaClock,
} from "react-icons/fa";

export default function FriendDetails({ params }) {
  const { id } = use(params);
  const [friend, setFriend] = useState(null);

  useEffect(() => {
    const loadData = async () => {
      const res = await fetch("/Data.json");
      const data = await res.json();

      const found = data.find((f) => f.id.toString() === id);
      setFriend(found || null);
    };

    loadData();
  }, [id]);

  // ADD TO TIMELINE FUNCTION
  const addToTimeline = (type) => {
    const newItem = {
      id: Date.now(),
      type,
      person: friend.name,
      date: new Date().toLocaleString(),
    };

    const old = JSON.parse(localStorage.getItem("timeline")) || [];

    localStorage.setItem(
      "timeline",
      JSON.stringify([newItem, ...old])
    );

    window.dispatchEvent(new Event("timeline-update"));
  };

  if (!friend) {
    return <div className="p-6 text-center"><span className="loading loading-spinner text-error"></span></div>;
  }

  return (
    <div className="max-w-5xl mx-auto p-8 bg-slate-50 min-h-screen">

      <div className="grid grid-cols-1 md:grid-cols-12 gap-6">

        {/* LEFT */}
        <div className="md:col-span-4 space-y-4">

          <div className="bg-white rounded-2xl p-6 text-center shadow-sm">

            <div className="w-24 h-24 mx-auto mb-4 relative">
              <Image
                src={friend.picture || "/default.png"}
                alt={friend.name}
                fill
                className="rounded-full object-cover"
              />
            </div>

            <h2 className="font-bold text-xl">{friend.name}</h2>

            <p className="text-gray-500 text-sm mt-2 italic">
              {friend.bio}
            </p>

            <span className="inline-block mt-3 text-xs bg-red-100 text-red-600 px-2 py-1 rounded-full">
              {friend.status}
            </span>
          </div>

          {/* BUTTONS */}
          <button
            onClick={() => {
              addToTimeline("Call");
              toast.success("Calling...");
            }}
            className="w-full bg-white py-3 rounded-xl border"
          >
            <FaClock className="inline mr-2" />
            Snooze 2 Weeks
          </button>

          <button
            onClick={() => {
              addToTimeline("Archive");
              toast.success("Archived successfully");
            }}
            className="w-full bg-white py-3 rounded-xl border"
          >
            <FaArchive className="inline mr-2" />
            Archive
          </button>

          <button
            onClick={() => {
              addToTimeline("Delete");
              toast.error("Friend deleted");
            }}
            className="w-full bg-white py-3 rounded-xl border text-red-500"
          >
            <FaTrash className="inline mr-2" />
            Delete
          </button>
        </div>

        {/* RIGHT */}
        <div className="md:col-span-8 space-y-6">

          <div className="grid grid-cols-3 gap-4">

            <div className="bg-white p-5 rounded-xl text-center shadow-sm">
              <h3 className="text-2xl font-bold">
                {friend.days_since_contact}
              </h3>
              <p className="text-xs text-gray-500">Days Since Contact</p>
            </div>

            <div className="bg-white p-5 rounded-xl text-center shadow-sm">
              <h3 className="text-2xl font-bold">{friend.goal}</h3>
              <p className="text-xs text-gray-500">Goal</p>
            </div>

            <div className="bg-white p-5 rounded-xl text-center shadow-sm">
              <h3 className="text-sm font-bold text-emerald-700">
                {friend.next_due_date || "N/A"}
              </h3>
              <p className="text-xs text-gray-500">Next Due</p>
            </div>

          </div>
          {/* RELATIONSHIP GOAL */}
<div className="bg-white p-6 rounded-2xl border shadow-sm relative">

  <button className="absolute right-6 top-6 text-xs bg-gray-50 border px-3 py-1 rounded text-gray-500">
    Edit
  </button>

  <h4 className="text-emerald-800 font-bold mb-4">
    Relationship Goal
  </h4>

  <p className="text-gray-500">
    Connect every{" "}
    <span className="font-bold text-gray-800">
      {friend.goal} days
    </span>
  </p>
</div>

          {/* QUICK CHECK-IN */}
          <div className="bg-white p-6 rounded-xl shadow-sm">

            <h3 className="font-bold mb-4 text-emerald-700">
              Quick Check-In
            </h3>

            <div className="grid grid-cols-3 gap-4">

              <button
                onClick={() => {
                  addToTimeline("Call");
                  toast.success("Calling...");
                }}
                className="p-5 border rounded-xl flex flex-col items-center hover:bg-gray-50"
              >
                <FaPhone />
                <span className="text-sm mt-2">Call</span>
              </button>

              <button
                onClick={() => {
                  addToTimeline("Text");
                  toast.success("Message sent");
                }}
                className="p-5 border rounded-xl flex flex-col items-center hover:bg-gray-50"
              >
                <FaComment />
                <span className="text-sm mt-2">Text</span>
              </button>

              <button
                onClick={() => {
                  addToTimeline("Video");
                  toast.success("Starting video call");
                }}
                className="p-5 border rounded-xl flex flex-col items-center hover:bg-gray-50"
              >
                <FaVideo />
                <span className="text-sm mt-2">Video</span>
              </button>

            </div>
          </div>

        </div>
      </div>
    </div>
  );
}