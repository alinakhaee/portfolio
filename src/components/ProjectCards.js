import React, { useState } from 'react';
import ProjectModal from './ProjectModal';

const toyProjects = [
  {
    id: 1,
    name: "Mini Mario Game",
    description: "A retro-style platformer game inspired by classic Mario. Features include multiple levels, enemies, collectibles, health system, and enhanced visuals with parallax scrolling and audio effects. Fully playable on both desktop and mobile with touch controls.",
    technologies: ["JavaScript", "HTML5 Canvas", "Web Audio API", "CSS3"],
    image: "/mini-mario.png",
    liveLink: "http://ali-nakhaeisharif-mini-mario-game.s3-website.us-east-2.amazonaws.com",
    githubLink: "https://github.com/alinakhaee/toy-websites/blob/main/mario.html"
  },
  {
    id: 2,
    name: "Robot Factory Idle Game",
    description: "An incremental idle game where players manage a robot factory by assembling parts, upgrading production lines, and automating workflows. Includes a visual rendering engine, animated factory workers, theming system, and persistent game state.",
    technologies: ["JavaScript", "HTML5 Canvas", "CSS3", "LocalStorage"],
    image: "/robot-factory.png",
    liveLink: "http://ali-nakhaeisharif-robot-factory-idle-game.s3-website.us-east-2.amazonaws.com",
    githubLink: "https://github.com/alinakhaee/toy-websites/blob/main/factory.html"
  },
  {
    id: 3,
    name: "Task Manager",
    description: "A mobile-friendly voice-supported daily task planner with time-blocking features. Users can create, update, and delete tasks using a draggable vertical timeline, swipe gestures, and collapsible task details. Includes localStorage support and a circular progress indicator.",
    technologies: ["JavaScript", "HTML5", "CSS3", "SpeechRecognition API", "LocalStorage"],
    image: "/task-manager.png",
    liveLink: "http://ali-nakhaeisharif-task-manager.s3-website.us-east-2.amazonaws.com",
    githubLink: "https://github.com/alinakhaee/toy-websites/blob/main/task_manager.html"
  },
  {
    id: 4,
    name: "Time Block Planner",
    description: "A responsive day planner that uses a vertical timeline layout for organizing tasks in 30-minute intervals. Features include draggable task blocks, visual progress tracking, localStorage persistence, and swipe gestures for task deletion, optimized for mobile use.",
    technologies: ["JavaScript", "HTML5", "CSS3", "LocalStorage"],
    image: "/time-block-planner.png",
    liveLink: "http://ali-nakhaeisharif-time-block-planner.s3-website.us-east-2.amazonaws.com",
    githubLink: "https://github.com/alinakhaee/toy-websites/blob/main/time-block-planner.html"
  },
  {
    id: 5,
    name: "News Dashboard",
    description: "A desktop-focused news aggregator displaying trending articles in a 3-column grid. Includes real-time update indicators, chip-style category filters, breaking news banner, and expandable article previews with smooth transitions. Fully responsive down to 1280px width.",
    technologies: ["JavaScript", "HTML5", "CSS3"],
    image: "/news-dashboard.png",
    liveLink: "http://ali-nakhaeisharif-news-dashboard.s3-website.us-east-2.amazonaws.com",
    githubLink: "https://github.com/alinakhaee/toy-websites/blob/main/news-dashboard.html"
  },
  {
    id: 6,
    name: "Gesture Game",
    description: "A mobile-optimized game that challenges players to quickly replicate random swipe gestures (up, down, circle) within one second. Features canvas-based gesture drawing, touch event tracking, difficulty levels, and vibration feedback for incorrect moves.",
    technologies: ["JavaScript", "HTML5 Canvas", "CSS3", "Vibration API"],
    image: "/gesture-game.png",
    liveLink: "http://ali-nakhaeisharif-gesture-game.s3-website.us-east-2.amazonaws.com",
    githubLink: "https://github.com/alinakhaee/toy-websites/blob/main/gesture-game.html"
  },
  {
    id: 7,
    name: "Burger Order",
    description: "A mobile-first food ordering interface with a bottom navigation bar and drag-and-drop burger customization. Users can build their own meal, view order status, and track estimated wait time. Interface adapts to portrait and landscape modes with smooth animations.",
    technologies: ["JavaScript", "HTML5", "CSS3", "Drag and Drop API"],
    image: "/burger.png",
    liveLink: "http://ali-nakhaeisharif-burger-order.s3-website.us-east-2.amazonaws.com",
    githubLink: "https://github.com/alinakhaee/toy-websites/blob/main/food-order.html"
  },
  {
    id: 8,
    name: "Daily Planner",
    description: "A responsive and minimal planner app designed to manage tasks for each day. Offers time-blocking functionality, real-time updates, and localStorage support. Ideal for productivity on both desktop and mobile with intuitive user interaction.",
    technologies: ["JavaScript", "HTML5", "CSS3", "LocalStorage"],
    image: "/daily-planner.png",
    liveLink: "http://ali-nakhaeisharif-daily-planner.s3-website.us-east-2.amazonaws.com",
    githubLink: "https://github.com/alinakhaee/toy-websites/blob/main/daily-planner.html"
  },
  {
    id: 9,
    name: "Screen Recorder",
    description: "A mobile-first screen recording interface with circular controls and intuitive swipe gestures. Users can start, pause, or stop recordings via vertical swipes, view real-time duration, and preview saved clips. Recordings are auto-saved locally in MP4 format.",
    technologies: ["JavaScript", "HTML5", "CSS3", "MediaRecorder API"],
    image: "/screen-recorder.png",
    liveLink: "http://ali-nakhaeisharif-screen-recorder.s3-website.us-east-2.amazonaws.com",
    githubLink: "https://github.com/alinakhaee/toy-websites/blob/main/screen-recorder.html"
  },
  {
    id: 10,
    name: "SkipTheDishes Clone",
    description: "A responsive UI clone inspired by SkipTheDishes, featuring a location-based restaurant discovery layout. Built to replicate the sleek, intuitive design of modern food delivery apps with map view placeholders and adaptive grid-based navigation.",
    technologies: ["JavaScript", "HTML5", "CSS3", "Responsive Design"],
    image: "/skip-template.png",
    liveLink: "http://ali-nakhaeisharif-skip-template.s3-website.us-east-2.amazonaws.com",
    githubLink: "https://github.com/alinakhaee/toy-websites/blob/main/Skip%20Implementation/skip.html"
  },
  {
    id: 11,
    name: "Empire Strategic Game",
    description: "A turn-based kingdom-building game where players expand territory, place structures via drag-and-drop, and manage resources across a dynamic grid. Features fog-of-war mechanics, animated day-night cycles, and a responsive UI tailored for both desktop and mobile.",
    technologies: ["React", "TypeScript", "CSS Modules", "HTML5"],
    image: "/empire-game.png",
    liveLink: "http://ali-nakhaeisharif-empire-game.s3-website.us-east-2.amazonaws.com",
    githubLink: "https://github.com/alinakhaee/toy-websites/blob/main/empire-game/src/App.tsx"
  },
  {
    id: 12,
    name: "Image Gallery",
    description: "A responsive and clean image gallery built with React. Supports horizontal scrolling, image previews, and a minimalist layout for an elegant browsing experience. Designed to work fluidly across desktop and mobile devices.",
    technologies: ["React", "TypeScript", "CSS Modules"],
    image: "/image-gallery.png",
    liveLink: "http://ali-nakhaeisharif-image-gallery.s3-website.us-east-2.amazonaws.com",
    githubLink: "https://github.com/alinakhaee/toy-websites/blob/main/image-gal/src/App.tsx"
  } 
];

export default function ProjectCards() {
  const [selectedProject, setSelectedProject] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleCardClick = (project) => {
    setSelectedProject(project);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedProject(null);
  };

  return (
    <div className="w-full max-w-6xl mx-auto px-4">
      <h2 className="text-3xl font-bold text-white mb-8 text-center">Toy Projects</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {toyProjects.map((project) => (
          <div
            key={project.id}
            className="bg-white bg-opacity-10 backdrop-blur-sm rounded-lg p-6 cursor-pointer transform transition-all duration-300 hover:scale-105 hover:bg-opacity-20"
            onClick={() => handleCardClick(project)}
          >
            {/* Project Image */}
            <div className="w-full h-40 bg-gray-300 bg-opacity-20 rounded-lg mb-4">
              <img src={project.image} alt={project.name} className="w-full h-full object-contain rounded-lg" />
            </div>
            
            {/* Project Title */}
            <h3 className="text-xl font-semibold text-white mb-2">{project.name}</h3>
            
            {/* Project Description Preview */}
            <p className="text-gray-300 text-sm mb-4 line-clamp-3">
              {project.description.substring(0, 100)}...
            </p>
            
            {/* Technologies */}
            <div className="flex flex-wrap gap-1 mb-4">
              {project.technologies.slice(0, 3).map((tech, index) => (
                <span
                  key={index}
                  className="bg-yellow-400 bg-opacity-20 text-yellow-200 px-2 py-1 rounded text-xs"
                >
                  {tech}
                </span>
              ))}
              {project.technologies.length > 3 && (
                <span className="text-gray-400 text-xs px-2 py-1">
                  +{project.technologies.length - 3} more
                </span>
              )}
            </div>
            
            {/* Click to view indicator */}
            <div className="text-center">
              <span className="text-blue-300 text-sm hover:text-blue-200">
                Click to view details →
              </span>
            </div>
          </div>
        ))}
      </div>
      
      {/* Project Modal */}
      <ProjectModal
        project={selectedProject}
        isOpen={isModalOpen}
        onClose={handleCloseModal}
      />
    </div>
  );
} 