import React, { useEffect, useState } from "react";

const DateTimeAndFillter = ({ onFilterChange } = {}) => {
  const [now, setNow] = useState(new Date());
  const [filter, setFilter] = useState("all");

  useEffect(() => {
    const t = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(t);
  }, []);

  const handleFilter = (newFilter) => {
    setFilter(newFilter);
    if (typeof onFilterChange === "function") onFilterChange(newFilter);
  };

  const formatted = now.toLocaleString(undefined, {
    weekday: "short",
    year: "numeric",
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
  });

  return (
    <div className="flex items-center gap-4">
      <div className="text-sm text-gray-300">{formatted}</div>

      <div className="flex items-center gap-2">
        <button
          type="button"
          onClick={() => handleFilter("all")}
          className={`px-3 py-1 rounded ${
            filter === "all"
              ? "bg-blue-600 text-white"
              : "bg-white/5 text-white"
          }`}
        >
          All
        </button>
        <button
          type="button"
          onClick={() => handleFilter("active")}
          className={`px-3 py-1 rounded ${
            filter === "active"
              ? "bg-blue-600 text-white"
              : "bg-white/5 text-white"
          }`}
        >
          Active
        </button>
        <button
          type="button"
          onClick={() => handleFilter("completed")}
          className={`px-3 py-1 rounded ${
            filter === "completed"
              ? "bg-blue-600 text-white"
              : "bg-white/5 text-white"
          }`}
        >
          Completed
        </button>
      </div>
    </div>
  );
};

export default DateTimeAndFillter;
