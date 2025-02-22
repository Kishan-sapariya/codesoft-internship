import React, { useState } from "react";
import { useProjectStore } from "../store/useProjectStore";
import { LoaderIcon } from "react-hot-toast";
import { X } from "lucide-react";

const UpdateProjectForm = ({ projectId, currentTitle, currentDescription, currentDeadline, onClose }) => {
  const { updateProject, isUpdatingProject } = useProjectStore();

  const [formdata, setFormdata] = useState({
    title: currentTitle,
    description: currentDescription,
    deadline: currentDeadline?.split('T')[0],
  });

  const handleChange = (e) => {
    setFormdata({ ...formdata, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    updateProject(projectId, formdata);
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

        <h2 className="text-2xl font-bold text-white mb-6">Update Project</h2>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-white mb-2">Project Title</label>
            <input
              type="text"
              name="title"
              value={formdata.title}
              onChange={handleChange}
              className="w-full bg-zinc-900 border border-zinc-800 rounded-lg p-3 text-white focus:ring-2 focus:ring-white focus:border-transparent"
              placeholder="Enter project title"
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
              placeholder="Enter project description"
              required
            />
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
            {isUpdatingProject ? (
              <LoaderIcon className="text-center" />
            ) : (
              "Update Project"
            )}
          </button>
        </form>
      </div>
    </div>
  );
};

export default UpdateProjectForm;
