import { AppSidebar } from "@/features/todo/component/app-sidebar";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbList,
  BreadcrumbPage,
} from "@/features/todo/shared/ui/breadcrumb";
import { Separator } from "@/features/todo/shared/ui/separator";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/features/todo/shared/ui/sidebar";
import { useTask } from "@/features/todo/hook/useTask";
import { useEffect, useState } from "react";

export default function DashboardPage() {
  const { getTasks, createTask } = useTask();
  const [tasks, setTasks] = useState([]);
  const [newTaskTitle, setNewTaskTitle] = useState("");
  const [isCreating, setIsCreating] = useState(false);

  useEffect(() => {
    const loadTasks = async () => {
      try {
        const response = await getTasks();
        setTasks(Array.isArray(response) ? response : response.tasks || []);
      } catch (error) {
        console.error("Error fetching tasks:", error);
        setTasks([]);
      }
    };
    loadTasks();
  }, []);

  const handleAddTask = async () => {
    if (!newTaskTitle.trim()) return;

    try {
      setIsCreating(true);
      await createTask({ title: newTaskTitle });
      setNewTaskTitle("");
      // Reload tasks
      const response = await getTasks();
      setTasks(Array.isArray(response) ? response : response.tasks || []);
    } catch (error) {
      console.error("Error creating task:", error);
    } finally {
      setIsCreating(false);
    }
  };

  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <header className="bg-background sticky top-0 flex h-16 shrink-0 items-center gap-2 border-b px-4">
          <SidebarTrigger className="-ml-1" />
          <Separator
            orientation="vertical"
            className="mr-2 data-[orientation=vertical]:h-4"
          />
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbPage>October 2024</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </header>
        <div className="p-4">
          <h1 className="text-2xl font-bold">My Tasks</h1>
          <div className="flex items-center justify-between gap-3 mb-6">
            <p className="text-muted-foreground">Manage your todo tasks.</p>
            <div className="flex gap-2">
              <input
                type="text"
                value={newTaskTitle}
                onChange={(e) => setNewTaskTitle(e.target.value)}
                onKeyPress={(e) => e.key === "Enter" && handleAddTask()}
                placeholder="Enter task title..."
                className="px-3 py-2 border rounded-md bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <button
                onClick={handleAddTask}
                disabled={isCreating || !newTaskTitle.trim()}
                className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                {isCreating ? "Adding..." : "Add Task"}
              </button>
            </div>
          </div>

          {tasks.length === 0 ? (
            <p className="text-muted-foreground">
              No tasks yet. Create one to get started!
            </p>
          ) : (
            <div className="grid gap-4">
              {tasks.map((task) => (
                <div
                  key={task._id}
                  className="border rounded-lg p-4 bg-card hover:bg-accent transition-colors"
                >
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <h3 className="font-semibold text-lg">{task.title}</h3>
                      <p className="text-sm text-muted-foreground mt-1">
                        Status:{" "}
                        <span className="capitalize font-medium">
                          {task.status}
                        </span>
                      </p>
                      <p className="text-xs text-muted-foreground mt-2">
                        Created: {new Date(task.createdAt).toLocaleDateString()}
                      </p>
                    </div>
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-medium ${
                        task.status === "active"
                          ? "bg-blue-100 text-blue-800"
                          : "bg-gray-100 text-gray-800"
                      }`}
                    >
                      {task.status}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}
