import pool from "../config/db.js";

const Tasks = {
  createTask: async (data) => {
    try {
      const projectCheck = await pool.query(
        "SELECT * FROM projects WHERE id = $1",
        [data.project_id]
      );

      if (projectCheck.rows.length === 0) {
        throw new Error("Project does not exist");
      }

      const userCheck = await pool.query("SELECT * FROM users WHERE id = $1", [
        data.assigned_to,
      ]);

      if (userCheck.rows.length === 0) {
        throw new Error("Assigned user does not exist");
      }

      const result = await pool.query(
        `INSERT INTO tasks 
                (title, description, deadline, project_id, assigned_to, status) 
                VALUES ($1, $2, $3, $4, $5, 'pending') 
                RETURNING *`,
        [
          data.title,
          data.description,
          data.deadline,
          data.project_id,
          data.assigned_to,
        ]
      );
      return result.rows[0];
    } catch (error) {
      console.log("Error creating task at task.model.js:", error);
    }
  },

  getAllTasks: async (project_id) => {
    try {
      const result = await pool.query(
        "SELECT * FROM tasks  WHERE project_id=$1",
        [project_id]
      );
      return result.rows;
    } catch (error) {
      console.log("Error in getAllTasks at task.model.js", error);
    }
  },
  updateTaskStatus: async (id, status) => {
    try {
      const result = await pool.query(
        "UPDATE tasks SET status = $1 WHERE id = $2 RETURNING *",
        [status, id]
      );
      return result.rows[0];
    } catch (error) {
      throw new Error("Error updating task status");
    }
  },
  
};

export default Tasks;
