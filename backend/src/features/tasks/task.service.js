import Task from "./task.model.js";
import mongoose from "mongoose";
import {
  buildVNDateRange,
  getTodayVNRange,
  getWeekVNRange,
  getMonthVNRange,
} from "../../utils/dateRange.js";

export const getTasksByFilter = async (filter = "today", date, userId) => {
  const now = new Date();
  let startDate;
  let endDate;

  // Convert userId to ObjectId if it's a string
  const userIdObject = new mongoose.Types.ObjectId(userId);

  // 1️⃣ Nếu có date cụ thể → ưu tiên cao nhất
  if (date) {
    const range = buildVNDateRange(date);
    startDate = range.startDate;
    endDate = range.endDate;
  } else {
    // 2️⃣ Xử lý theo filter
    switch (filter) {
      case "today": {
        const range = getTodayVNRange();
        startDate = range.startDate;
        endDate = range.endDate;
        break;
      }

      case "week": {
        const range = getWeekVNRange();
        startDate = range.startDate;
        endDate = range.endDate;
        break;
      }

      case "month": {
        const range = getMonthVNRange();
        startDate = range.startDate;
        endDate = range.endDate;
        break;
      }

      case "all":
      default:
        startDate = null;
        endDate = null;
    }
  }

  // 3️⃣ Match stage
  const matchStage = {
    userId: userIdObject,
    ...(startDate &&
      endDate && {
        createdAt: { $gte: startDate, $lte: endDate },
      }),
  };

  // 4️⃣ Aggregate
  const result = await Task.aggregate([
    { $match: matchStage },
    {
      $addFields: {
        createdAtDate: { $toDate: "$createdAt" }, // Ensure createdAt is Date
      },
    },
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
    tasks: result[0]?.tasks || [],
    activeCount: result[0]?.activeCount[0]?.count || 0,
    completeCount: result[0]?.completeCount[0]?.count || 0,
  };
};

export const getTaskById = async (id, userId, date) => {
  const userIdObject = new mongoose.Types.ObjectId(userId);
  const query = { _id: id, userId: userIdObject };

  // If date is provided, filter by date
  if (date) {
    const range = buildVNDateRange(date);
    query.createdAt = { $gte: range.startDate, $lte: range.endDate };
  }

  const task = await Task.findOne(query);

  if (!task) {
    throw new Error("Nhiệm vụ không tồn tại");
  }

  return task;
};

export const getAllTasks = async (filter = "today", date, userId) => {
  return getTasksByFilter(filter, date, userId);
};

export const getLatestTaskByUserId = async (userId) => {
  const task = await Task.findOne({ userId }).sort({ createdAt: -1 });

  if (!task) {
    throw new Error("Không có task nào");
  }

  return task;
};

export const createTask = async (
  userId,
  title,
  description,
  priority = "medium",
) => {
  const task = new Task({ userId, title, description, priority });
  const newTask = await task.save();
  return newTask;
};

export const updateTask = async (
  id,
  { title, description, status, priority, completedAt },
) => {
  const updatedTask = await Task.findByIdAndUpdate(
    id,
    {
      title,
      description,
      status,
      priority,
      completedAt,
    },
    { new: true },
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
