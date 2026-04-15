"use client";

import { useEffect, useState } from "react";
import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Legend,
} from "recharts";

const COLORS = {
  Text: "#8b5cf6",
  Call: "#2d4a3e",
  Video: "#34a853",
};

export default function Page() {
  const [chartData, setChartData] = useState([]);
  const [loading, setLoading] = useState(true);

  // 👉 convert timeline → chart data
  const generateData = (timeline = []) => {
    const count = {
      Text: 0,
      Call: 0,
      Video: 0,
    };

    timeline.forEach((item) => {
      if (item?.type && count[item.type] !== undefined) {
        count[item.type]++;
      }
    });

    const formatted = Object.keys(count).map((key) => ({
      name: key,
      value: count[key],
      color: COLORS[key],
    }));

    setChartData(formatted);
    setLoading(false);
  };

  useEffect(() => {
    const load = () => {
      const local = JSON.parse(localStorage.getItem("timeline")) || [];
      generateData(local);
    };

    load();

    window.addEventListener("timeline-update", load);

    return () => {
      window.removeEventListener("timeline-update", load);
    };
  }, []);

  return (
    <div className="max-w-5xl mx-auto p-6">

      <h1 className="text-3xl font-bold mb-6">
        Friendship Analytics
      </h1>

      <div className="bg-white border rounded-xl p-6 shadow-sm">

        <h3 className="text-lg font-semibold mb-4">
          Interaction Breakdown
        </h3>

        <div className="w-full h-72 flex items-center justify-center">

          {/* 🔥 LOADER */}
          {loading ? (
            <span className="loading loading-infinity loading-xl"></span>
          ) : chartData.every((d) => d.value === 0) ? (
            <p className="text-center text-gray-400">
              No Call, Text or Video data yet
            </p>
          ) : (
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={chartData}
                  dataKey="value"
                  innerRadius={60}
                  outerRadius={90}
                >
                  {chartData.map((entry, index) => (
                    <Cell key={index} fill={entry.color} />
                  ))}
                </Pie>

                <Legend />
              </PieChart>
            </ResponsiveContainer>
          )}

        </div>
      </div>
    </div>
  );
}