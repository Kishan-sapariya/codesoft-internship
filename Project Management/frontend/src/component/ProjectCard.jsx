import React, { useEffect, useState } from "react";
import { InitialLetter, formatDate } from "../utils/InitialLetter";
import { ChevronDown, ChevronUp, Edit2, Plus, Trash } from "lucide-react";
import { LoaderIcon } from "react-hot-toast";
import UpdateProjectForm from "./UpdateProjectForm";
import CreateTask from "./createTask";
import { useProjectStore } from "../store/useProjectStore";
import { useTaskStore } from "../store/useTaskStore";
import { useAuthStore } from "../store/useAuthStore";

const ProjectCard = ({
  id,
  username,
  title,
  description,
  createdAt,
  status,
  deadline,
}) => {
  const [showTasks, setShowTasks] = useState(false);
  const [expandedTaskId, setExpandedTaskId] = useState(null);
  const [showUpdateForm, setShowUpdateForm] = useState(false);
  const [showTaskForm, setShowTaskForm] = useState(false);
  const { isDeletingProject, deleteProject, projects,updateProject } = useProjectStore();
  const { tasks, fetchTasks, updateTaskStatus } = useTaskStore();
  const { authUser, getUsernameById, usernameById } = useAuthStore();

  const statusOptions = ["pending", "in_progress", "completed"];

  useEffect(() => {
    if (showTasks) {
      fetchTasks(id);
    }
  }, [id, showTasks, fetchTasks]);

  useEffect(() => {
    if (expandedTaskId) {
      const task = tasks.find((t) => t.id === expandedTaskId);
      if (task) {
        getUsernameById(task.assigned_to);
      }
    }
  }, [expandedTaskId, tasks, getUsernameById]);

  const handleDeleteProject = () => {
    deleteProject(id);
  };

  const toggleTaskDetails = (taskId) => {
    setExpandedTaskId(expandedTaskId === taskId ? null : taskId);
  };

  const handleStatusChange = (taskId, newStatus) => {
    updateTaskStatus(taskId, newStatus);
  };

  const projectOwner = projects.find((project) => project.id === id);

  const getStatusColor = (status) => {
    switch (status?.toLowerCase()) {
      case "completed":
        return "text-green-400";
      case "in_progress":
        return "text-yellow-400";
      case "pending":
        return "text-red-400";
      default:
        return "text-gray-400";
    }
  };

  return (
    <div className="flex flex-col gap-3 p-6 bg-black rounded-lg border border-gray-600 hover:border-gray-500 transition-all duration-300 shadow-xl ml-16 sm:ml-20">
      {/* Project header section */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div className="h-12 w-12 flex justify-center items-center rounded-full bg-zinc-900 border border-zinc-800 text-white font-semibold text-lg hover:bg-zinc-800 transition-colors">
            {InitialLetter(username)}
          </div>
          <h1 className="text-white text-xl font-semibold">
            {username} <span className="text-gray-400">owner</span>
          </h1>
        </div>
        <div className="flex items-center gap-4 sm:gap-6">
          {projectOwner?.owner_id === authUser?.id && (
            <>
              <Edit2
                className="text-gray-400 w-6 h-6 hover:text-gray-200 cursor-pointer"
                onClick={() => setShowUpdateForm(true)}
              />
              {isDeletingProject ? (
                <LoaderIcon />
              ) : (
                <Trash
                  className="text-gray-300 w-6 h-6 hover:text-red-500 cursor-pointer"
                  onClick={handleDeleteProject}
                />
              )}
            </>
          )}
          <button
            onClick={() => setShowTasks(!showTasks)}
            className="p-2 hover:bg-zinc-800 rounded-full transition-colors cursor-pointer"
          >
            {showTasks ? (
              <ChevronUp className="text-gray-300 w-6 h-6" />
            ) : (
              <ChevronDown className="text-gray-300 w-6 h-6" />
            )}
          </button>
        </div>
      </div>

      {showUpdateForm && (
        <UpdateProjectForm
          projectId={id}
          currentTitle={title}
          currentDescription={description}
          currentDeadline={deadline}
          onClose={() => setShowUpdateForm(false)}
        />
      )}

      <div className="flex flex-col gap-3 p-3 bg-zinc-900 rounded-md border border-zinc-800">
        <div className="flex items-center">
          <h1 className="text-white text-2xl font-bold">{title}</h1>
        </div>

        <p className="text-gray-300 font-medium">{description}</p>

        <div className="flex flex-col gap-2 mt-2 text-sm">
          <div className="flex items-center gap-2">
            <span className="text-gray-400">Start Date:</span>
            <span className="text-gray-200">{formatDate(createdAt)}</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-gray-400">Deadline:</span>
            <span className="text-gray-200">{formatDate(deadline)}</span>
          </div>
        </div>

        {showTasks && (
          <div className="mt-4 border-t border-zinc-600 pt-4">
            <div className="flex justify-between items-center mb-3">
              <h3 className="text-white font-medium">Project Tasks</h3>
              {projectOwner?.owner_id === authUser?.id && !showTaskForm && (
                <Plus
                  className="text-gray-300 w-6 h-6 cursor-pointer hover:text-white transition-colors"
                  onClick={() => setShowTaskForm(true)}
                />
              )}
              {showTaskForm && (
                <CreateTask
                  projectId={id}
                  onClose={() => setShowTaskForm(false)}
                />
              )}
            </div>
            <div className="space-y-2">
              {tasks &&
                tasks.length > 0 &&
                tasks.map((task) => (
                  <div
                    key={task.id}
                    className="bg-zinc-800 rounded-md overflow-hidden"
                  >
                    <div
                      className="flex justify-between items-center p-3 cursor-pointer hover:bg-zinc-700"
                      onClick={() => toggleTaskDetails(task.id)}
                    >
                      <div className="flex items-center gap-2">
                        <span className="text-gray-200">{task.title}</span>
                        {task.assigned_to === authUser?.id ? (
                          <select
                            value={task.status}
                            onChange={(e) =>
                              handleStatusChange(task.id, e.target.value)
                            }
                            className="bg-zinc-800 text-white rounded p-1 ml-2"
                            onClick={(e) => e.stopPropagation()}
                          >
                            {statusOptions.map((option) => (
                              <option key={option} value={option}>
                                {option.replace("_", " ")}
                              </option>
                            ))}
                          </select>
                        ) : null}
                        <span
                          className={`text-sm ${getStatusColor(task.status)}`}
                        >
                          {task.status?.replace("_", " ")}
                        </span>
                      </div>

                      {expandedTaskId === task.id ? (
                        <ChevronUp className="text-gray-300 w-5 h-5" />
                      ) : (
                        <ChevronDown className="text-gray-300 w-5 h-5" />
                      )}
                    </div>

                    {expandedTaskId === task.id && (
                      <div className="p-3 bg-zinc-900 border-t border-zinc-700">
                        <p className="text-gray-300 mb-2">{task.description}</p>
                        <div className="space-y-1 text-sm">
                          <div className="flex items-center gap-2">
                            <span className="text-gray-400">Assigned to:</span>
                            <span className="text-gray-200">
                              {usernameById}
                            </span>
                          </div>
                          <div className="flex items-center gap-2">
                            <span className="text-gray-400">Deadline:</span>
                            <span className="text-gray-200">
                              {formatDate(task.deadline)}
                            </span>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProjectCard;
