import React from "react";

const TaskListPegination = ({
  currentPage = 1,
  totalPages = 1,
  onPageChange,
} = {}) => {
  const prev = () => {
    if (currentPage > 1 && typeof onPageChange === "function")
      onPageChange(currentPage - 1);
  };
  const next = () => {
    if (currentPage < totalPages && typeof onPageChange === "function")
      onPageChange(currentPage + 1);
  };

  return (
    <div className="flex items-center gap-2">
      <button
        type="button"
        onClick={prev}
        disabled={currentPage <= 1}
        className="px-3 py-1 rounded bg-white/5 text-white disabled:opacity-40"
      >
        Prev
      </button>

      <div className="px-3 py-1 rounded bg-white/5 text-white">
        Page {currentPage} / {totalPages}
      </div>

      <button
        type="button"
        onClick={next}
        disabled={currentPage >= totalPages}
        className="px-3 py-1 rounded bg-white/5 text-white disabled:opacity-40"
      >
        Next
      </button>
    </div>
  );
};

export default TaskListPegination;
