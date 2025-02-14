import React from "react";
import { FaGithub, FaCode, FaLink } from "react-icons/fa";

// Project Card Component
const ProjectCard = ({ project }) => {
  return (
    <div className="w-full bg-white rounded-2xl shadow-2xl overflow-hidden hover:shadow-3xl transition-shadow duration-300 border border-gray-200 relative">
      <div className="p-6">
        {/* Project Title */}
        <h2 className="text-2xl font-bold text-gray-800 mb-3 flex items-center">
          <FaCode className="mr-2 text-blue-500" />
          <span className="truncate">{project.title}</span>
        </h2>

        {/* Divider */}
        <div className="border-t border-gray-200 my-3"></div>

        {/* Project Description */}
        <p className="text-gray-600 mb-4 line-clamp-3 text-sm">{project.description}</p>

        {/* GitHub Repo Link */}
        <div className="mb-4">
          <h3 className="text-base font-semibold text-gray-800 mb-3 flex items-center">
            <FaGithub className="mr-2 text-purple-500" />
            GitHub Repository
          </h3>
          <a
            href={project.githubRepoLink}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-500 hover:text-blue-600 transition-colors duration-300 truncate block text-sm"
          >
            {project.githubRepoLink}
          </a>
        </div>

        {/* Divider */}
        <div className="border-t border-gray-200 my-3"></div>

        {/* Action Buttons */}
        <div className="flex items-center justify-between mt-4">
          {/* Visit Project Button */}
          <a
            href={project.githubRepoLink}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center bg-gradient-to-r from-green-800 to-green-300 text-white font-semibold py-2 px-4 rounded-lg hover:from-blue-700 hover:to-purple-700 transition-all duration-300 transform hover:scale-105 text-sm"
          >
            <FaLink className="mr-2" />
            Visit Project
          </a>

          {/* GitHub Button */}
          <a
            href={project.githubRepoLink}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center bg-gray-800 text-white font-semibold py-2 px-4 rounded-lg hover:bg-gray-900 transition-all duration-300 transform hover:scale-105 text-sm ml-5"
          >
            <FaGithub className="mr-2" />
            View on GitHub
          </a>
        </div>
      </div>
    </div>
  );
};

export default ProjectCard;