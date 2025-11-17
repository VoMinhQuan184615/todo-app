import React, { useEffect, useState } from "react";

const TaskList = ({
  filter = "all",
  currentPage = 1,
  pageSize = 5,
  onTotalPagesChange,
} = {}) => {
  const initialTasks = [
    { id: 1, title: "Buy groceries", completed: false },
    { id: 2, title: "Walk the dog", completed: true },
    { id: 3, title: "Read a book", completed: false },
    { id: 4, title: "Write notes", completed: false },
    { id: 5, title: "Pay bills", completed: true },
    { id: 6, title: "Clean desk", completed: false },
    { id: 7, title: "Call mom", completed: false },
    { id: 8, title: "Prepare dinner", completed: true },
    { id: 9, title: "Exercise", completed: false },
    { id: 10, title: "Plan trip", completed: false },
    { id: 11, title: "Fix bug", completed: false },
    { id: 12, title: "Deploy app", completed: true },
  ];

  const [tasks, setTasks] = useState(initialTasks);

  const toggleComplete = (id) => {
    setTasks((t) =>
      t.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    );
  };

  const removeTask = (id) => {
    setTasks((t) => t.filter((task) => task.id !== id));
  };

  const filteredTasks = tasks.filter((t) => {
    if (filter === "active") return !t.completed;
    if (filter === "completed") return t.completed;
    return true;
  });

  const totalPages = Math.max(1, Math.ceil(filteredTasks.length / pageSize));

  useEffect(() => {
    if (typeof onTotalPagesChange === "function")
      onTotalPagesChange(totalPages);
  }, [totalPages, onTotalPagesChange]);

  const start = (Math.max(1, currentPage) - 1) * pageSize;
  const pageTasks = filteredTasks.slice(start, start + pageSize);

  return (
    <div className="bg-white/5 rounded p-4 text-white">
      {pageTasks.length === 0 ? (
        <div className="text-center text-sm text-gray-300 py-6">
          No tasks to show.
        </div>
      ) : (
        <ul className="space-y-3">
          {pageTasks.map((task) => (
            <li
              key={task.id}
              className="flex items-center justify-between gap-4"
            >
              <label className="flex items-center gap-3">
                <input
                  type="checkbox"
                  checked={task.completed}
                  onChange={() => toggleComplete(task.id)}
                  className="w-4 h-4"
                />
                <span
                  className={`select-none ${
                    task.completed ? "line-through text-gray-400" : ""
                  }`}
                >
                  {task.title}
                </span>
              </label>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => removeTask(task.id)}
                  className="text-sm px-2 py-1 rounded bg-red-600 hover:bg-red-700"
                  aria-label={`Delete ${task.title}`}
                >
                  Delete
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}

      <div className="mt-3 text-xs text-gray-400">
        Showing {start + 1}-{Math.min(start + pageSize, filteredTasks.length)}{" "}
        of {filteredTasks.length} tasks
      </div>
    </div>
  );
};

export default TaskList;
