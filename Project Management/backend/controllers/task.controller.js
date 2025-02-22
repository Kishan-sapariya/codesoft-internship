import Tasks from "../models/task.model.js";

export const createTask = async (req, res) => {
  const { title, description, deadline, project_id, assigned_to } = req.body;
  try {
    const result = await Tasks.createTask({
      title,
      description,
      deadline,
      project_id,
      assigned_to,
    });

    res.status(201).json({
      message: "Task created successfully",
      task: result
    });

  } catch (error) {
    console.log("Error creating task at task.controller.js:", error);
    if (error.message === "Project does not exist") {
      return res.status(404).json({
        message: "Project does not exist",
      });
    }

    if (error.message === "Assigned user does not exist") {
      return res.status(404).json({
        message: "Assigned user does not exist",
      });
    }
    res.status(500).json({ message: "Internal server error" });
  }
};


export const getAllTasks = async (req, res) => {
  const { id } = req.params;
  try {
    const tasks = await Tasks.getAllTasks(id);
    res.status(200).json({ tasks });
  } catch (error) {
    console.log("Error in getAllTasks at task.controller.js", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const updateTaskStatus = async (req, res) => {
  const { id } = req.params;
  const { status } = req.body;
  try {
    const task = await Tasks.updateTaskStatus(id, status);
    res.status(200).json({
      message: "Task status updated successfully",
      task: task,
    });
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
};
