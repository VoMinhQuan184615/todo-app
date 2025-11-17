import React, { useState } from "react";

const AddTask = () => {
  const [title, setTitle] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title.trim()) return;
    console.log("Add task:", title);
    setTitle("");
  };

  return (
    <form onSubmit={handleSubmit} className="flex gap-2 items-center">
      <input
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="New task..."
        className="flex-1 px-3 py-2 rounded bg-white/5 text-white"
        aria-label="Add task"
      />
      <button
        type="submit"
        className="px-4 py-2 rounded bg-blue-600 hover:bg-blue-700 text-white"
      >
        Add
      </button>
    </form>
  );
};

export default AddTask;
