import React, { useState, useEffect } from "react";
import { useProjectStore } from "../store/useProjectStore";
import { LoaderIcon } from "react-hot-toast";
import { X } from "lucide-react";
import { useTaskStore } from "../store/useTaskStore";

const CreateTask = ({ projectId, onClose }) => {
  const { projects } = useProjectStore();
  const { addTask, isAddingTask } = useTaskStore();
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/users');
        const data = await response.json();
        setUsers(data.user);
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };
    fetchUsers();
  }, []);

  const [formdata, setFormdata] = useState({
    title: "",
    description: "",
    deadline: "",
    assigned_to: "",
    project_id: projectId,
  });

  const handleChange = (e) => {
    setFormdata({ ...formdata, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    addTask(formdata);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
      <div className="max-w-2xl w-full rounded-lg shadow-xl p-8 border border-gray-600 bg-black relative">
        <button
          onClick={onClose}
          className="absolute right-4 top-4 text-gray-400 hover:text-white"
        >
          <X size={24} />
        </button>

        <h2 className="text-2xl font-bold text-white mb-6">Add Task</h2>

        <h3 className="text-lg font-medium text-white mb-4">
          Project: {projects.find((project) => project.id === projectId)?.title}
        </h3>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-white mb-2">Title</label>
            <input
              type="text"
              name="title"
              value={formdata.title}
              onChange={handleChange}
              className="w-full bg-zinc-900 border border-zinc-800 rounded-lg p-3 text-white focus:ring-2 focus:ring-white focus:border-transparent"
              placeholder="Enter task title"
              required
            />
          </div>

          <div>
            <label className="block text-white mb-2">Description</label>
            <textarea
              name="description"
              value={formdata.description}
              onChange={handleChange}
              className="w-full bg-zinc-900 border border-zinc-800 rounded-lg p-3 text-white focus:ring-2 focus:ring-white focus:border-transparent h-32"
              placeholder="Enter task description"
              required
            />
          </div>

          <div>
            <label className="block text-white mb-2">Assign to</label>
            <select
              name="assigned_to"
              value={formdata.assigned_to}
              onChange={handleChange}
              className="w-full bg-zinc-900 border border-zinc-800 rounded-lg p-3 text-white focus:ring-2 focus:ring-white focus:border-transparent"
              required
            >
              <option value="">Select user</option>
              {users?.map((user) => (
                <option key={user.id} value={user.id}>
                  {user.username}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-white mb-2">Deadline</label>
            <input
              type="date"
              name="deadline"
              value={formdata.deadline}
              onChange={handleChange}
              className="w-full bg-zinc-900 border border-zinc-800 rounded-lg p-3 text-white focus:ring-2 focus:ring-white focus:border-transparent [color-scheme:dark]"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full flex justify-center items-center bg-white hover:bg-gray-100 text-black font-medium py-3 px-6 rounded-lg transition duration-200"
          >
            {isAddingTask ? <LoaderIcon className="text-center" /> : "Add Task"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default CreateTask;
