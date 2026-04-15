"use client";

import { useEffect, useState } from "react";
import {
  FaComment,
  FaVideo,
  FaPhone,
  FaChevronDown,
} from "react-icons/fa";

export default function Timeline() {
  const [filter, setFilter] = useState("All");
  const [timelineData, setTimelineData] = useState([]);
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(true);

  const options = ["All", "Text", "Video", "Call"];

  // ICON
  const getIcon = (type) => {
    switch (type) {
      case "Text":
        return <FaComment className="text-gray-500" />;
      case "Video":
        return <FaVideo className="text-blue-500" />;
      case "Call":
        return <FaPhone className="text-green-600" />;
      default:
        return null;
    }
  };

  // GET DATA (single source)
  const getTimeline = () => {
    const local = JSON.parse(localStorage.getItem("timeline")) || [];

    return local.filter(
      (item) => item?.person && item?.type && item?.date
    );
  };

  // UPDATE + SEND TO CHART
  const updateTimeline = () => {
    const data = getTimeline();

    setTimelineData(data);

    // 👉 chart ke data pathano
    window.dispatchEvent(
      new CustomEvent("timeline-data", {
        detail: data,
      })
    );
  };

  useEffect(() => {
    updateTimeline();
    setLoading(false);

    window.addEventListener("timeline-update", updateTimeline);

    return () => {
      window.removeEventListener("timeline-update", updateTimeline);
    };
  }, []);

  // FILTER
  const filtered = timelineData.filter(
    (t) => filter === "All" || t.type === filter
  );

  return (
    <div className="max-w-4xl mx-auto w-full p-4 md:p-8">

      {/* TITLE */}
      <h1 className="text-2xl md:text-3xl font-bold mb-6">
        Timeline
      </h1>

      {/* FILTER */}
      <div className="relative mb-6 w-[200px]">

        <button
          onClick={() => setOpen(!open)}
          className="w-full flex items-center justify-between px-4 py-2 border rounded-lg bg-gray-50"
        >
          {filter}
          <FaChevronDown />
        </button>

        {open && (
          <ul className="absolute z-10 w-full mt-2 bg-white border rounded-lg shadow">
            {options.map((item) => (
              <li key={item}>
                <button
                  onClick={() => {
                    setFilter(item);
                    setOpen(false);
                  }}
                  className="w-full text-left px-4 py-2 hover:bg-gray-100"
                >
                  {item}
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>

      {/* LIST */}
      <div className="space-y-4">

        {loading ? (
          <p className="text-center text-gray-400"><span className="loading loading-infinity loading-xl"></span></p>
        ) : filtered.length === 0 ? (
          <div className="text-center text-gray-400 py-10">
            No Call, Text or Video history found
          </div>
        ) : (
          filtered.map((item) => (
            <div
              key={item.id}
              className="flex items-center gap-4 p-4 border rounded-lg bg-white"
            >
              {/* ICON */}
              <div className="w-10 h-10 flex items-center justify-center bg-gray-100 rounded-full">
                {getIcon(item.type)}
              </div>

              {/* CONTENT */}
              <div>
                <p className="font-semibold">{item.person}</p>

                <span className="text-xs px-2 py-1 bg-gray-100 rounded inline-block mt-1">
                  {item.type}
                </span>

                <p className="text-xs text-gray-400 mt-1">
                  {item.date}
                </p>
              </div>
            </div>
          ))
        )}

      </div>
    </div>
  );
}