import React from 'react';

export default function ProjectModal({ project, isOpen, onClose }) {
  if (!isOpen || !project) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black bg-opacity-50 backdrop-blur-sm"
        onClick={onClose}
      />
      
      {/* Modal Content */}
      <div className="flex flex-col bg-white bg-opacity-10 backdrop-blur-lg rounded-2xl p-8 max-w-2xl w-full mx-4 max-h-[90vh] overflow-y-auto">
        <div className="flex flex-row justify-between mb-4">
        {/* Project Links */}
        <div className="flex space-x-4">
          {project.liveLink && (
            <a
              href={project.liveLink}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg transition-colors duration-200"
            >
              View Live
            </a>
          )}
          {project.githubLink && (
            <a
              href={project.githubLink}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-gray-700 hover:bg-gray-800 text-white px-6 py-2 rounded-lg transition-colors duration-200"
            >
              View Code
            </a>
          )}
        </div>

        {/* Close Button */}
        <button
          onClick={onClose}
          className="w-10 h-10 flex items-center justify-center bg-white bg-opacity-10 hover:bg-opacity-20 rounded-full text-white text-2xl font-bold transition-all"
        >
          ×
        </button>
      </div>
        
        {/* Project Image */}
        {project.image && (
          <img 
            src={project.image} 
            alt={project.name}
            className="w-full h-full object-contain rounded-lg mb-6"
          />
        )}
        
        {/* Project Title */}
        <h2 className="text-3xl font-bold text-white mb-4">{project.name}</h2>
        
        {/* Project Description */}
        <p className="text-gray-200 text-lg mb-6 leading-relaxed">
          {project.description}
        </p>
        
        {/* Technologies Used */}
        {project.technologies && (
          <div className="mb-6">
            <h3 className="text-xl font-semibold text-white mb-3">Technologies Used</h3>
            <div className="flex flex-wrap gap-2">
              {project.technologies.map((tech, index) => (
                <span 
                  key={index}
                  className="bg-yellow-400 bg-opacity-20 text-yellow-200 px-3 py-1 rounded-full text-sm"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
} 