import Projects from "../models/project.model.js";

export const createProject = async (req, res) => {
  const { title, description, deadline } = req.body;
  try {
    const result = await Projects.createProject({
      title,
      description,
      deadline,
      owner_id: req.user.id,
    });
    res
      .status(201)
      .json({ message: "Project created successfully", project: result });
  } catch (error) {
    console.log("Error in createProject at project.controller.js", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const getAllProjects = async (req, res) => {
  try {
    const result = await Projects.getAllProjects();
    res.status(200).json({ message: "All projects", projects: result });
  } catch (error) {
    console.log("Error in getAllProjects at project.controller.js", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const updateProject = async (req, res) => {
  const { id } = req.params;
  const updates = req.body;
  try {
    const result = await Projects.updateProject(id, {
      ...updates,
      owner_id: req.user.id,
    });
    if (!result) {
      return res
        .status(404)
        .json({ message: "Project not found or unauthorized" });
    }
    res
      .status(200)
      .json({ message: "Project updated successfully", project: result });
  } catch (error) {
    console.log("Error in updateProject at project.controller.js", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const deleteProject = async (req, res) => {
  const { id } = req.params;
  try {
    const result = await Projects.deleteProject(id);
    if (!result) {
      return res.status(404).json({ message: "Project not found" });
    }
    const updatedProjects = await Projects.getAllProjects();
    res
      .status(200)
      .json({
        message: "Project deleted successfully",
        projects: updatedProjects,
      });
  } catch (error) {
    console.log("Error in deleteProject at project.controller.js", error);
    res.status(500).json({ message: "Internal server error" });
  }
};
