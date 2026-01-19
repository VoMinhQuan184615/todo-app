import { useState } from "react";
import { fetchTasksApi, createTaskApi } from "@/api/task.api";

type taskPayload = {
  title: string;
  description?: string;
  priority?: string;
};

export const useTask = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const getTasks = async (selectedDate) => {
    try {
      setLoading(true);
      setError(null);
      // Normalize date to avoid timezone issues
      const normalized =
        selectedDate instanceof Date
          ? new Date(
              selectedDate.getFullYear(),
              selectedDate.getMonth(),
              selectedDate.getDate(),
            )
          : selectedDate;
      console.log("Normalized date:", normalized);
      const response = await fetchTasksApi(normalized);
      console.log("Tasks response:", response);
      // Extract tasks from response.tasks array
      return response?.tasks || [];
    } catch (error: any) {
      const errorMsg =
        error?.response?.data?.message || "Failed to fetch tasks";
      setError(errorMsg);
      console.error("Error fetching tasks:", error);
      return [];
    } finally {
      setLoading(false);
    }
  };

  const createTask = async (data: taskPayload) => {
    try {
      setLoading(true);
      setError(null);
      console.log(data);
      const newTask = await createTaskApi(data);
      return newTask;
    } catch (error) {
      setError("Failed to create task");
      throw error;
    } finally {
      setLoading(false);
    }
  };

  return { getTasks, createTask, loading, error };
};
