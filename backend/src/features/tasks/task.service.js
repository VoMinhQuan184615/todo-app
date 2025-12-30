import Task from "./task.model.js";

export const getAllTasks = async (filter = "today", date) => {
  const now = new Date();
  let startDate, endDate;

  switch (filter) {
    case "dates": {
      if (!date) throw new Error("Missing date");

      const d = new Date(date);
      console.log(d);
      startDate = new Date(
        d.getFullYear(),
        d.getMonth(),
        d.getDate(),
        0,
        0,
        0,
        0
      );

      endDate = new Date(
        d.getFullYear(),
        d.getMonth(),
        d.getDate(),
        23,
        59,
        59,
        999
      );
      break;
    }

    case "today": {
      startDate = new Date(
        now.getFullYear(),
        now.getMonth(),
        now.getDate(),
        0,
        0,
        0,
        0
      );

      endDate = new Date(
        now.getFullYear(),
        now.getMonth(),
        now.getDate(),
        23,
        59,
        59,
        999
      );
      break;
    }

    case "week": {
      const day = now.getDay() || 7; // CN = 7

      startDate = new Date(now);
      startDate.setDate(now.getDate() - day + 1);
      startDate.setHours(0, 0, 0, 0);

      endDate = new Date(startDate);
      endDate.setDate(startDate.getDate() + 6);
      endDate.setHours(23, 59, 59, 999);
      break;
    }

    case "month": {
      startDate = new Date(now.getFullYear(), now.getMonth(), 1, 0, 0, 0, 0);
      endDate = new Date(
        now.getFullYear(),
        now.getMonth() + 1,
        0,
        23,
        59,
        59,
        999
      );
      break;
    }

    case "all":
    default: {
      startDate = null;
      endDate = null;
    }
  }

  const matchStage =
    startDate && endDate
      ? { createdAt: { $gte: startDate, $lte: endDate } }
      : {};

  const result = await Task.aggregate([
    { $match: matchStage },
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

  return {
    tasks: result[0].tasks,
    activeCount: result[0].activeCount[0]?.count || 0,
    completeCount: result[0].completeCount[0]?.count || 0,
  };
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
