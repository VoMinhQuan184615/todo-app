import { useState } from "react";

export function AddTaskForm({ onAddTask, isLoading = false }) {
  const [newTaskTitle, setNewTaskTitle] = useState("");
  const [newTaskDescription, setNewTaskDescription] = useState("");
  const [newTaskPriority, setNewTaskPriority] = useState("Medium");
  const [isCreating, setIsCreating] = useState(false);

  const handleAddTask = async () => {
    if (!newTaskTitle.trim()) return;
    console.log({
      title: newTaskTitle,
      description: newTaskDescription,
      priority: newTaskPriority,
    });
    try {
      setIsCreating(true);
      await onAddTask({
        title: newTaskTitle,
        description: newTaskDescription,
        priority: newTaskPriority,
      });
      setNewTaskTitle("");
      setNewTaskDescription("");
      setNewTaskPriority("Medium");
    } catch (error) {
      console.error("Error creating task:", error);
    } finally {
      setIsCreating(false);
    }
  };

  return (
    <div className="flex gap-2">
      <input
        type="text"
        value={newTaskTitle}
        onChange={(e) => setNewTaskTitle(e.target.value)}
        onKeyPress={(e) => e.key === "Enter" && handleAddTask()}
        placeholder="Enter task title..."
        className="px-3 py-2 border rounded-md bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      <input
        type="text"
        value={newTaskDescription}
        onChange={(e) => setNewTaskDescription(e.target.value)}
        onKeyPress={(e) => e.key === "Enter" && handleAddTask()}
        placeholder="Enter task description..."
        className="px-3 py-2 border rounded-md bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-blue-500"
      />

      <select
        value={newTaskPriority}
        onChange={(e) => setNewTaskPriority(e.target.value)}
        className="px-3 py-2 border rounded-md bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-blue-500"
      >
        <option value="Low">Low</option>
        <option value="Medium">Medium</option>
        <option value="High">High</option>
      </select>

      <button
        onClick={handleAddTask}
        disabled={isCreating || isLoading || !newTaskTitle.trim()}
        className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
      >
        {isCreating ? "Adding..." : "Add Task"}
      </button>
    </div>
  );
}
