export const getAllTasks = (req, res) => {
    res.status(200).json({ message: 'List of tasks' });
};

export const createTask = (req, res) => {
    res.status(201).json({ message: 'Task created' });
};

export const updateTask = (req, res) => {
    res.status(200).json({ message: `Task ${req.params.id} updated` });
};
export const deleteTask = (req, res) => {
    res.status(200).json({ message: `Task ${req.params.id} deleted` });
};
