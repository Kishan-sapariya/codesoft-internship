import toast from "react-hot-toast";
import { create } from "zustand";

export const useTaskStore = create((set, get) => ({
  tasks: [],
  isAddingTask: false,

  addTask: async (data) => {
    set({ isAddingTask: true });
    try {
      const res = await fetch("http://localhost:5000/api/tasks/create", {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
      const parsedRes = await res.json();
      set({ tasks: [...get().tasks, parsedRes] });
      console.log(parsedRes);
    } catch (error) {
      toast.error("Failed to add task");
      throw error(error.message);
    } finally {
      set({ isAddingTask: false });
    }
  },

  fetchTasks: async (id) => {
    try {
      const res = await fetch(`http://localhost:5000/api/tasks/${id}`, {
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const parsedRes = await res.json();
      set({ tasks:parsedRes.tasks });
    } catch (error) {
      console.log(error.message);
    }
  },

  updateTaskStatus: async (taskId, status) => {
    try {
      const res = await fetch(`http://localhost:5000/api/tasks/status/${taskId}`, {
        method: 'PATCH',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ status })
      });
      const data = await res.json();
      set(state => ({
        tasks: state.tasks.map(task => 
          task.id === taskId ? { ...task, status: status } : task
        )
      }));
      toast.success('Status updated successfully');
    } catch (error) {
      toast.error('Failed to update status');
    }
  }
  
}));
