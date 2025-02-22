import { create } from "zustand";
import { toast } from "react-hot-toast";

export const useProjectStore = create((set) => ({
  projects: [],
  isCreatingProject: false,
  isFetchingProjects: false,
  isDeletingProject: false,
  isUpdatingProject: false,

  createProject: async (data) => {
    set({ isCreatingProject: true });
    try {
      const res = await fetch("http://localhost:5000/api/projects/create", {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
      const parsedRes = await res.json();
      set({
        projects: Array.isArray(parsedRes.project)
          ? parsedRes.project
          : [parsedRes.project],
      });
      toast.success("Project created successfully");
    } catch (error) {
      toast.error(error.message || "Error creating project");
    } finally {
      set({ isCreatingProject: false });
    }
  },

  fetchProjects: async () => {
    set({ isFetchingProjects: true });
    try {
      const res = await fetch("http://localhost:5000/api/projects", {
        credentials: "include",
      });
      const parsedRes = await res.json();
      set({ projects: parsedRes.projects });
    } catch (error) {
      toast.error(error.message || "Error fetching projects");
      console.log("Error fetching projects", error);
    } finally {
      set({ isFetchingProjects: false });
    }
  },

  deleteProject: async (id) => {
    set({ isDeletingProject: true });
    try {
      const res = await fetch(
        `http://localhost:5000/api/projects/delete/${id}`,
        {
          method: "DELETE",
          credentials: "include",
        }
      );

      const parsedRes = await res.json();
      if (res.ok) {
        set((state) => ({
          projects: state.projects.filter((project) => project.id !== id),
        }));
      }
      toast.success("Project deleted successfully");
    } catch (error) {
      toast.error(error.message || "Error deleting project");
      console.log("Error deleting project", error);
    } finally {
      set({ isDeletingProject: false });
    }
  },

  updateProject: async (id, data) => {
    set({ isUpdatingProject: true });
    try {
      const res = await fetch(
        `http://localhost:5000/api/projects/update/${id}`,
        {
          method: "PATCH",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        }
      );
      const parsedRes = await res.json();

      if (res.ok) {
        set((state) => ({
          projects: state.projects.map((project) =>
            project.id === id
              ? { ...project, ...data, username: project.username }
              : project
          ),
        }));
        toast.success("Project updated successfully");
      }
    } catch (error) {
      toast.error(error.message || "Error updating project");
    } finally {
      set({ isUpdatingProject: false });
    }
  },
}));
