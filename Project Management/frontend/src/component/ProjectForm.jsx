import React, { useState } from "react";
import { useProjectStore } from "../store/useProjectStore";
import { LoaderIcon } from "react-hot-toast";

const CreateProject = () => {
  const { createProject, isCreatingProject } = useProjectStore();
  const [formdata, setFormdata] = useState({
    title: "",
    description: "",
    deadline: "",
  });

  const handleChange = (e) => {
    setFormdata({ ...formdata, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    createProject(formdata);
    setFormdata({
      title: "",
      description: "",
      deadline: "",
    });
  };

  return (
    <div className="min-h-screen bg-black p-8 flex items-center sm:justify-center">
      <div className="max-w-2xl w-full rounded-lg shadow-xl p-8 border border-gray-600 ml-8">
        <h2 className="text-2xl font-bold text-white mb-6">
          Create New Project
        </h2>

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
            {isCreatingProject ? (
              <LoaderIcon className="text-center" />
            ) : (
              "Create Project"
            )}
          </button>
        </form>
      </div>
    </div>
  );
};

export default CreateProject;
