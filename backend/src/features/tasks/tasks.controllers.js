import * as taskService from "./task.service.js";

export const getAllTasks = async (req, res) => {
  try {
    const { filter = "today" } = req.query;
    const result = await taskService.getAllTasks(filter);
    res.status(200).json(result);
  } catch (error) {
    console.error("Lỗi khi gọi getAllTasks", error);
    res.status(500).json({ message: "Lỗi hệ thống" });
  }
};

export const createTask = async (req, res) => {
  try {
    const { title } = req.body;
    const newTask = await taskService.createTask(title);
    res.status(201).json(newTask);
  } catch (error) {
    console.error("Lỗi khi gọi createTask", error);
    res.status(500).json({ message: "Lỗi hệ thống" });
  }
};

export const updateTask = async (req, res) => {
  try {
    const { title, status, completedAt } = req.body;
    const updatedTask = await taskService.updateTask(req.params.id, {
      title,
      status,
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
