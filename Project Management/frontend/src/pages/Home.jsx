import React, { useEffect } from "react";
import { useProjectStore } from "../store/useProjectStore";
import ProjectCard from "../component/ProjectCard";
import { LoaderIcon } from "react-hot-toast";

const Home = () => {
  const { isFetchingProjects, fetchProjects, projects } = useProjectStore();

  useEffect(() => {
    fetchProjects();
  }, [fetchProjects]);

  return (
    <div className="bg-black text-white h-screen w-screen p-0 pt-2 pr-2 sm:p-14 overflow-x-hidden">
      <div className="space-y-4">
        {isFetchingProjects && (
          <div className="flex justify-center h-screen items-center">
            <LoaderIcon className="animate-spin size-12" />
          </div>
        )}
        {Array.isArray(projects) &&
          projects.map((project) => (
            <ProjectCard
              key={project.id}
              id={project.id}
              title={project.title}
              username={project.username}
              description={project.description}
              createdAt={project.created_at}
              status={project.status}
              deadline={project.deadline}
              tasks={project.tasks}
            />
          ))}
      </div>
    </div>
  );
};

export default Home;
