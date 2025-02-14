import React from "react";
import { FaGithub, FaCode, FaLink } from "react-icons/fa";

// Project Card Component
const ProjectCard = ({ project }) => {
  return (
    <div className="w-full bg-white/5 backdrop-blur-lg rounded-2xl shadow-2xl overflow-hidden hover:shadow-3xl transition-shadow duration-300 border border-white/10 relative">
      {/* Glassmorphism Overlay */}
      <div className="absolute inset-0 bg-white/5 backdrop-blur-sm rounded-2xl"></div>

      <div className="p-8 relative z-10">
        {/* Project Title */}
        <h2 className="text-3xl font-bold text-white mb-4 flex items-center">
          <FaCode className="mr-3 text-blue-400" />
          <span className="truncate">{project.title}</span>
        </h2>

        {/* Divider */}
        <div className="border-t border-white/20 my-4"></div>

        {/* Project Description */}
        <p className="text-white/80 mb-6 line-clamp-4">{project.description}</p>

        {/* GitHub Repo Link */}
        <div className="mb-6">
          <h3 className="text-lg font-semibold text-white mb-4 flex items-center">
            <FaGithub className="mr-2 text-purple-400" />
            GitHub Repository
          </h3>
          <a
            href={project.githubRepoLink}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-400 hover:text-blue-300 transition-colors duration-300 truncate block"
          >
            {project.githubRepoLink}
          </a>
        </div>

        {/* Divider */}
        <div className="border-t border-white/20 my-4"></div>

        {/* Action Buttons */}
        <div className="flex items-center justify-between mt-6">
          {/* Visit Project Button */}
          <a
            href={project.githubRepoLink}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold py-3 px-6 rounded-lg hover:from-blue-700 hover:to-purple-700 transition-all duration-300 transform hover:scale-105"
          >
            <FaLink className="mr-2" />
            Visit Project
          </a>

          {/* GitHub Button */}
          <a
            href={project.githubRepoLink}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center bg-gray-800 text-white font-semibold py-3 px-6 rounded-lg hover:bg-gray-900 transition-all duration-300 transform hover:scale-105"
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