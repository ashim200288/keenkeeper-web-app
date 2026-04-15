const newItem = {
  id: Date.now(),
  type: "Call",
  person: friend.name,
  date: new Date().toLocaleString(),
};

const old = JSON.parse(localStorage.getItem("timeline")) || [];
const updated = [newItem, ...old];

localStorage.setItem("timeline", JSON.stringify(updated));


window.dispatchEvent(new Event("timeline-update"));