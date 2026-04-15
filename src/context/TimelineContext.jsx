"use client";

import { createContext, useState } from "react";

export const TimelineContext = createContext();

export const TimelineProvider = ({ children }) => {
  const [timeline, setTimeline] = useState([]);
  const [friends, setFriends] = useState([]);

  // ✅ Add Friend Function
  const addFriend = (friend) => {
    setFriends((prev) => [friend, ...prev]);
  };

  // Timeline add (already used)
  const addEntry = (type, name) => {
    const newEntry = {
      id: Date.now(),
      type,
      name,
      date: new Date().toLocaleDateString(),
    };

    setTimeline((prev) => [newEntry, ...prev]);
  };

  return (
    <TimelineContext.Provider
      value={{ timeline, addEntry, friends, addFriend }}
    >
      {children}
    </TimelineContext.Provider>
  );
};