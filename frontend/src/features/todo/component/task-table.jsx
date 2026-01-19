import { useState } from "react";

export function TaskTable({ tasks, onAddTask, isCreating = false }) {
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");
  const [filterPriority, setFilterPriority] = useState("all");
  const [showStatusMenu, setShowStatusMenu] = useState(false);
  const [showPriorityMenu, setShowPriorityMenu] = useState(false);

  const filteredTasks = tasks.filter((task) => {
    const matchesSearch =
      task.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      task.taskId?.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus =
      filterStatus === "all" || task.status === filterStatus;
    const matchesPriority =
      filterPriority === "all" || task.priority === filterPriority;
    return matchesSearch && matchesStatus && matchesPriority;
  });

  const statusOptions = [
    "All",
    "In Progress",
    "Backlog",
    "Todo",
    "Done",
    "Canceled",
  ];
  const priorityOptions = ["All", "High", "Medium", "Low"];

  const getStatusColor = (status) => {
    const colors = {
      "In Progress": "text-blue-600",
      Backlog: "text-gray-600",
      Todo: "text-gray-400",
      Canceled: "text-red-400",
      Done: "text-green-600",
      active: "text-blue-600",
      completed: "text-green-600",
      pending: "text-gray-600",
    };
    return colors[status] || "text-gray-600";
  };

  const getStatusIcon = (status) => {
    const icons = {
      "In Progress": "⟳",
      Backlog: "⊘",
      Todo: "◯",
      Canceled: "✕",
      Done: "✓",
      active: "⟳",
      completed: "✓",
      pending: "◯",
    };
    return icons[status] || "◯";
  };

  const getPriorityIcon = (priority) => {
    const icons = {
      High: "↑",
      Medium: "→",
      Low: "↓",
    };
    return icons[priority] || "→";
  };

  const getCategoryBadgeColor = (category) => {
    const colors = {
      Documentation: "bg-purple-100 text-purple-800",
      Bug: "bg-red-100 text-red-800",
      Feature: "bg-blue-100 text-blue-800",
      Enhancement: "bg-green-100 text-green-800",
    };
    return colors[category] || "bg-gray-100 text-gray-800";
  };

  return (
    <div>
      <div className="flex flex-col gap-4 mb-6">
        <div className="flex items-center gap-2">
          <input
            type="text"
            placeholder="Filter tasks..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="px-3 py-2 border rounded-md bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-blue-500 w-64"
          />

          <div className="relative">
            <button
              onClick={() => setShowStatusMenu(!showStatusMenu)}
              className="flex items-center gap-2 px-3 py-2 border rounded-md hover:bg-accent transition-colors"
            >
              <span>●</span> Status
            </button>
            {showStatusMenu && (
              <div className="absolute top-full left-0 mt-1 bg-white border rounded-md shadow-lg z-10">
                {statusOptions.map((status) => (
                  <button
                    key={status}
                    onClick={() => {
                      setFilterStatus(status.toLowerCase());
                      setShowStatusMenu(false);
                    }}
                    className={`block w-full text-left px-4 py-2 hover:bg-gray-100 ${
                      status.toLowerCase() === filterStatus ||
                      (status === "All" && filterStatus === "all")
                        ? "bg-gray-100 font-semibold"
                        : ""
                    }`}
                  >
                    {status}
                  </button>
                ))}
              </div>
            )}
          </div>

          <div className="relative">
            <button
              onClick={() => setShowPriorityMenu(!showPriorityMenu)}
              className="flex items-center gap-2 px-3 py-2 border rounded-md hover:bg-accent transition-colors"
            >
              <span>●</span> Priority
            </button>
            {showPriorityMenu && (
              <div className="absolute top-full left-0 mt-1 bg-white border rounded-md shadow-lg z-10">
                {priorityOptions.map((priority) => (
                  <button
                    key={priority}
                    onClick={() => {
                      setFilterPriority(priority.toLowerCase());
                      setShowPriorityMenu(false);
                    }}
                    className={`block w-full text-left px-4 py-2 hover:bg-gray-100 ${
                      priority.toLowerCase() === filterPriority ||
                      (priority === "All" && filterPriority === "all")
                        ? "bg-gray-100 font-semibold"
                        : ""
                    }`}
                  >
                    {priority}
                  </button>
                ))}
              </div>
            )}
          </div>

          <div className="ml-auto flex items-center gap-2">
            <button className="flex items-center gap-2 px-3 py-2 border rounded-md hover:bg-accent transition-colors text-sm">
              ⊞ View
            </button>
          </div>
        </div>
      </div>

      <div className="overflow-x-auto border rounded-lg">
        <table className="w-full">
          <thead>
            <tr className="border-b bg-gray-50">
              <th className="px-4 py-3 text-left w-8">
                <input type="checkbox" className="rounded" />
              </th>
              <th className="px-4 py-3 text-left text-xs font-semibold text-gray-700">
                Task
              </th>
              <th className="px-4 py-3 text-left text-xs font-semibold text-gray-700">
                Title
              </th>
              <th className="px-4 py-3 text-left text-xs font-semibold text-gray-700">
                Status
              </th>
              <th className="px-4 py-3 text-left text-xs font-semibold text-gray-700">
                Priority
              </th>
              <th className="px-4 py-3 text-center w-10"></th>
            </tr>
          </thead>
          <tbody>
            {filteredTasks.map((task) => (
              <tr
                key={task._id}
                className="border-b hover:bg-gray-50 transition-colors"
              >
                <td className="px-4 py-3">
                  <input type="checkbox" className="rounded" />
                </td>
                <td className="px-4 py-3 text-sm font-semibold text-muted-foreground">
                  {task.taskId || task._id.slice(0, 8).toUpperCase()}
                </td>
                <td className="px-4 py-3">
                  <div className="flex items-center gap-2">
                    {task.category && (
                      <span
                        className={`px-2 py-1 rounded text-xs font-medium ${getCategoryBadgeColor(task.category)}`}
                      >
                        {task.category}
                      </span>
                    )}
                    <span className="text-sm font-medium">{task.title}</span>
                  </div>
                </td>
                <td className="px-4 py-3">
                  <div
                    className={`flex items-center gap-1 text-sm font-medium ${getStatusColor(task.status)}`}
                  >
                    <span>{getStatusIcon(task.status)}</span>
                    <span className="capitalize">{task.status}</span>
                  </div>
                </td>
                <td className="px-4 py-3">
                  <div className="flex items-center gap-1 text-sm font-medium">
                    <span>{getPriorityIcon(task.priority || "Medium")}</span>
                    <span>{task.priority || "Medium"}</span>
                  </div>
                </td>
                <td className="px-4 py-3 text-center">
                  <button className="text-gray-400 hover:text-gray-600 transition-colors">
                    ⋯
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {filteredTasks.length === 0 && (
        <div className="text-center py-8 text-muted-foreground">
          No tasks found matching your filters.
        </div>
      )}
    </div>
  );
}
