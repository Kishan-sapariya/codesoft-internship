import pool from "../config/db.js";

const Projects = {
  createProject: async (data) => {
    try {
      const result = await pool.query(
        "INSERT INTO projects (title, description, deadline, status, owner_id) VALUES ($1, $2, $3, 'pending', $4) RETURNING *",
        [data.title, data.description, data.deadline, data.owner_id]
      );
      return result.rows[0];
    } catch (error) {
      console.log("Error in creating project at project.model.js", error);
    }
  },
  getAllProjects: async () => {
    try {
      const result = await pool.query(
        "SELECT projects.*, users.username FROM projects INNER JOIN users ON projects.owner_id = users.id ORDER BY projects.id;"
      );
      return result.rows;
    } catch (error) {
      console.log("Error in getting projects at project.model.js", error);
    }
  },
  updateProject: async (id, data) => {
    try {
      const existingProject = await pool.query(
        "SELECT * FROM projects WHERE id = $1 AND owner_id = $2",
        [id, data.owner_id]
      );

      if (existingProject.rows.length === 0) {
        throw new Error(
          "Project does not exist or you don't have permission to update it"
        );
      }

      const updatedData = {
        title: data.title || existingProject.rows[0].title,
        description: data.description || existingProject.rows[0].description,
        deadline: data.deadline || existingProject.rows[0].deadline,
      };
      const result = await pool.query(
        "UPDATE projects SET title = $1, description = $2, deadline = $3 WHERE id = $4 and owner_id= $5 RETURNING *",
        [
          updatedData.title,
          updatedData.description,
          updatedData.deadline,
          id,
          data.owner_id,
        ]
      );
      return result.rows[0];
    } catch (error) {
      console.log("Error in updating project at project.model.js", error);
    }
  },

  deleteProject: async (id) => {
    try {
      await pool.query("DELETE FROM tasks WHERE project_id = $1", [id]);

      const result = await pool.query(
        "DELETE FROM projects WHERE id = $1 RETURNING *",
        [id]
      );
      return result.rows[0];
    } catch (error) {
      console.log("Error in deleting project at project.model.js", error);
      throw error;
    }
  },
};

export default Projects;
