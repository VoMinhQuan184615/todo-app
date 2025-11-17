import React from "react";

const StartAndFiltter = ({
  filter = "all",
  onFilterChange,
  pageSize = 5,
  onPageSizeChange,
} = {}) => {
  const sizes = [3, 5, 10];

  const handleFilter = (f) => {
    if (typeof onFilterChange === "function") onFilterChange(f);
  };

  const handleSize = (e) => {
    const v = Number(e.target.value) || 5;
    if (typeof onPageSizeChange === "function") onPageSizeChange(v);
  };

  return (
    <div className="flex items-center justify-between gap-4 bg-white/5 p-3 rounded text-white">
      <div className="flex items-center gap-2">
        <button
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

      <div className="flex items-center gap-2">
        <label className="text-sm text-gray-300">Per page</label>
        <select
          value={pageSize}
          onChange={handleSize}
          className="bg-white/5 text-white px-2 py-1 rounded"
        >
          {sizes.map((s) => (
            <option key={s} value={s}>
              {s}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
};

export default StartAndFiltter;
