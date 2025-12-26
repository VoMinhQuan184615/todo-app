import { useState } from "react";
import { fetchTasksApi, createTaskApi } from "@/api/task.api";

type taskPayload = {
  title: string;
};

export const useTask = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const getTasks = async () => {
    try {
      setLoading(true);
      setError(null);
      const tasks = await fetchTasksApi();
      return tasks;
    } catch (error) {
      setError("Failed to fetch tasks");
    } finally {
      setLoading(false);
    }
  };

  const createTask = async (data: taskPayload) => {
    try {
      setLoading(true);
      setError(null);
      console.log(data.title);
      const newTask = await createTaskApi(data.title);
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
