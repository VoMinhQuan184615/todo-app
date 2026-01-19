import * as taskService from "./task.service.js";

export const getTasksByFilter = async (req, res) => {
  try {
    const { filter = "today", date } = req.query;
    console.log("Received filter:", filter, "and date:", date);
    const userId = req.user.id;

    const result = await taskService.getTasksByFilter(filter, date, userId);
    res.status(200).json(result);
  } catch (error) {
    console.error("Lỗi khi gọi getTasksByFilter", error);
    res.status(500).json({ message: "Lỗi hệ thống" });
  }
};

export const getTaskById = async (req, res) => {
  try {
    const { id } = req.params;
    const { date } = req.query;
    const userId = req.user.id;

    // Validate ID format
    if (!id || id === ":id") {
      return res.status(400).json({
        message:
          "ID không hợp lệ. Vui lòng thay thế :id bằng một ID task thực tế từ database",
      });
    }

    const task = await taskService.getTaskById(id, userId, date);

    res.status(200).json(task);
  } catch (error) {
    console.error("Lỗi khi gọi getTaskById", error);
    if (error.message === "Nhiệm vụ không tồn tại") {
      return res.status(404).json({ message: error.message });
    }
    if (error.kind === "ObjectId") {
      return res.status(400).json({
        message:
          "ID không hợp lệ. Vui lòng sử dụng một MongoDB ObjectId hợp lệ (24 ký tự hex)",
      });
    }
    res.status(500).json({ message: "Lỗi hệ thống" });
  }
};

export const getMyLatestTask = async (req, res) => {
  try {
    const userId = req.user.id;
    const task = await taskService.getLatestTaskByUserId(userId);

    res.status(200).json(task);
  } catch (error) {
    console.error("Lỗi khi gọi getMyLatestTask", error);
    if (error.message === "Không có task nào") {
      return res.status(404).json({ message: error.message });
    }
    res.status(500).json({ message: "Lỗi hệ thống" });
  }
};

export const createTask = async (req, res) => {
  try {
    const userId = req.user.id;
    const { title, description, priority = "medium" } = req.body;
    const newTask = await taskService.createTask(
      userId,
      title,
      description,
      priority,
    );
    res.status(201).json(newTask);
  } catch (error) {
    console.error("Lỗi khi gọi createTask", error);
    res.status(500).json({ message: "Lỗi hệ thống" });
  }
};

export const updateTask = async (req, res) => {
  try {
    const { title, description, status, priority, completedAt } = req.body;
    const updatedTask = await taskService.updateTask(req.params.id, {
      title,
      description,
      status,
      priority,
      completedAt,
    });
    res.status(200).json(updatedTask);
  } catch (error) {
    console.error("Lỗi khi gọi updateTask", error);
    if (error.message === "Nhiệm vụ không tồn tại") {
      return res.status(404).json({ message: error.message });
    }
    res.status(500).json({ message: "Lỗi hệ thống" });
  }
};

export const deleteTask = async (req, res) => {
  try {
    const deletedTask = await taskService.deleteTask(req.params.id);
    res.status(200).json(deletedTask);
  } catch (error) {
    console.error("Lỗi khi gọi deleteTask", error);
    if (error.message === "Nhiệm vụ không tồn tại") {
      return res.status(404).json({ message: error.message });
    }
    res.status(500).json({ message: "Lỗi hệ thống" });
  }
};
