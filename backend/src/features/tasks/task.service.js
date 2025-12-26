import Task from "./task.model.js";

export const getAllTasks = async (filter = "today") => {
  const now = new Date();
  let startDate;

  switch (filter) {
    case "today": {
      startDate = new Date(now.getFullYear(), now.getMonth(), now.getDate());
      break;
    }
    case "week": {
      const mondayDate =
        now.getDate() - (now.getDay() - 1) - (now.getDay() === 0 ? 7 : 0);
      startDate = new Date(now.getFullYear(), now.getMonth(), mondayDate);
      break;
    }
    case "month": {
      startDate = new Date(now.getFullYear(), now.getMonth(), 1);
      break;
    }
    case "all":
    default: {
      startDate = null;
    }
  }

  const query = startDate ? { createdAt: { $gte: startDate } } : {};

  const result = await Task.aggregate([
    { $match: query },
    {
      $facet: {
        tasks: [{ $sort: { createdAt: -1 } }],
        activeCount: [{ $match: { status: "active" } }, { $count: "count" }],
        completeCount: [
          { $match: { status: "complete" } },
          { $count: "count" },
        ],
      },
    },
  ]);

  const tasks = result[0].tasks;
  const activeCount = result[0].activeCount[0]?.count || 0;
  const completeCount = result[0].completeCount[0]?.count || 0;

  return { tasks, activeCount, completeCount };
};

export const createTask = async (title) => {
  const task = new Task({ title });
  const newTask = await task.save();
  return newTask;
};

export const updateTask = async (id, { title, status, completedAt }) => {
  const updatedTask = await Task.findByIdAndUpdate(
    id,
    {
      title,
      status,
      completedAt,
    },
    { new: true }
  );

  if (!updatedTask) {
    throw new Error("Nhiệm vụ không tồn tại");
  }

  return updatedTask;
};

export const deleteTask = async (id) => {
  const deletedTask = await Task.findByIdAndDelete(id);

  if (!deletedTask) {
    throw new Error("Nhiệm vụ không tồn tại");
  }

  return deletedTask;
};
