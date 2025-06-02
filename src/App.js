import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import MainContent from './components/MainContent';
import WorkCards from './components/WorkCards';
import chatImg from './chat.svg';
import StoryTimeline from './components/StoryTimeLine';
import ContactForm from './components/ContactForm';

const sectionGradientColors = {
  Hey: { start: '#facf25', end: '#fffbe6' },
  Work: { start: '#080e5c', end: '#bbbcf0' },
  Story: { start: '#300769', end: '#a69cb5' },
  Chat: { start: '#267de0', end: '#d0d9f5' },
};

// const sectionColors = {
//   Hey: ['#facf25', '#fffbe6'],
//   Work: ['#6a3480', '#fffbe6'],
//   Story: ['#f7680f', '#fffbe6'],
//   Chat: ['#267de0', '#fffbe6'],
// };

// Helper function to convert hex to RGBA and adjust alpha
function hexToRgba(hex, alpha = 1) {
  if (!hex) return `rgba(0,0,0,${alpha})`; // Fallback for undefined hex
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);
  return `rgba(${r}, ${g}, ${b}, ${alpha})`;
}

export default function App() {
  const [selectedSection, setSelectedSection] = useState('Hey');
  const [prevSection, setPrevSection] = useState('Hey');
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [contentFade, setContentFade] = useState(true);
  const [pendingSection, setPendingSection] = useState(null);

  // Effect to update scrollbar colors based on selectedSection
  useEffect(() => {
    const currentStartColor = sectionGradientColors[selectedSection]?.start;
    if (currentStartColor) {
      // For dark themes, track is usually darker/more transparent than thumb
      // For light themes, track might be lighter. Adjust alpha values as needed.
      const thumbColor = hexToRgba(currentStartColor, 0.6); // More opaque
      const thumbHoverColor = hexToRgba(currentStartColor, 0.8); // Even more opaque for hover
      const trackColor = hexToRgba(currentStartColor, 0.2); // More transparent

      document.documentElement.style.setProperty('--scrollbar-thumb-color', thumbColor);
      document.documentElement.style.setProperty('--scrollbar-thumb-hover-color', thumbHoverColor);
      document.documentElement.style.setProperty('--scrollbar-track-color', trackColor);
    } else {
      // Fallback or clear if color not found (optional)
      document.documentElement.style.removeProperty('--scrollbar-thumb-color');
      document.documentElement.style.removeProperty('--scrollbar-thumb-hover-color');
      document.documentElement.style.removeProperty('--scrollbar-track-color');
    }
  }, [selectedSection]);

  const handleGradientChange = (section) => {
    if (section === selectedSection) return;
    setPrevSection(selectedSection);
    setIsTransitioning(true);
    setContentFade(false);
    setPendingSection(section);
    setTimeout(() => {
      setSelectedSection(section);
      setIsTransitioning(false);
      setContentFade(true);
    }, 900); // match fade out duration
  };

  const prevGradient = sectionGradientColors[prevSection];
  const nextGradient = sectionGradientColors[selectedSection];

  let content = null;
  if (selectedSection === 'Hey') {
    content = <MainContent />;
  } else if (selectedSection === 'Work') {
    content = (
      <div className="flex flex-col items-center justify-start mt-10 min-h-screen w-full px-4">
        <h1 className="text-4xl font-bold text-gray-100 mb-10 text-center">
          Related Experience
        </h1>
        <div className="flex-grow w-full flex flex-col">
          <WorkCards />
        </div>
      </div>
    );
  } else if (selectedSection === 'Story') {
    content = (
      <div className="flex flex-col items-center justify-start mt-5 min-h-screen overflow-y-auto">
        <StoryTimeline />
      </div>
    );
  } else if (selectedSection === 'Chat') {
    content = (
      <div className="flex flex-col items-center justify-start mt-5 min-h-screen p-4 md:p-8 text-white">
        <div className="container mx-auto">
          <div className="flex flex-col md:flex-row gap-8 items-stretch">
            {/* Left Column: Text content and contact details */}
            <div className="md:w-1/2 flex flex-col justify-between">
              <div>
                <h1 className="text-5xl font-bold mb-6">Contact Me</h1>
                <p className="mb-6 text-lg">
                  If you have a bright idea, or just want to say hi, use the form or <a href="mailto:alinakhaeisharif@gmail.com" className="underline hover:text-gray-300">Send me an email</a>
                </p>
              </div>
              <div className="mt-8 text-center md:text-left">
                <img src={chatImg} alt="Chat Illustration" className="w-64 h-64 md:w-80 md:h-80 mx-auto" />
                <a
                  href="https://storyset.com/people"
                  className="mt-2 text-sm text-white-400 hover:text-purple-300 underline block text-center"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  People illustrations by Storyset
                </a>
              </div>
              <div className="mt-auto">
                <hr className="border-gray-600 my-6" />
                {/* <div className="mb-4">
                  <p className="text-sm text-gray-400 uppercase tracking-wider">Phone</p>
                  <p className="text-lg">+61 (8) 94717645</p>
                </div> */}
                <div className="mb-4">
                  <p className="text-sm text-blue-800 uppercase tracking-wider font-bold">Email</p>
                  <p className="text-lg">alinakhaeisharif@gmail.com</p>
                </div>
                <div>
                  <p className="text-sm text-blue-800 uppercase tracking-wider font-bold">Address</p>
                  <p className="text-lg">Toronto, ON, Canada</p>
                </div>
              </div>
            </div>

            {/* Right Column: Contact Form */}
            <div className="md:w-1/2 flex flex-col items-center justify-center">
              <ContactForm />
              {/* Social Links Buttons */}
              <div className="mt-8 flex space-x-4">
                <a 
                  href="https://www.linkedin.com/in/ali-nakhaeisharif/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors duration-150"
                  aria-label="LinkedIn Profile"
                >
                  {/* Replace with LinkedIn SVG logo if available */}
                  <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path fillRule="evenodd" d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" clipRule="evenodd" /></svg>
                  LinkedIn
                </a>
                <a 
                  href="https://github.com/alinakhaee"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-gray-700 hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-600 transition-colors duration-150"
                  aria-label="GitHub Profile"
                >
                  {/* Replace with GitHub SVG logo if available */}
                  <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path fillRule="evenodd" d="M12 2C6.477 2 2 6.477 2 12c0 4.419 2.865 8.166 6.839 9.489.5.09.682-.217.682-.482 0-.237-.009-.866-.014-1.702-2.782.602-3.369-1.34-3.369-1.34-.455-1.156-1.11-1.465-1.11-1.465-.909-.62.069-.608.069-.608 1.004.074 1.532 1.03 1.532 1.03.891 1.529 2.341 1.089 2.91.833.091-.647.349-1.086.635-1.335-2.22-.252-4.555-1.11-4.555-4.942 0-1.091.39-1.984 1.029-2.682-.103-.253-.446-1.27.098-2.642 0 0 .84-.269 2.75 1.025A9.548 9.548 0 0112 6.836c.85.004 1.705.114 2.505.336 1.909-1.294 2.748-1.025 2.748-1.025.546 1.372.203 2.389.1 2.642.64.698 1.028 1.591 1.028 2.682 0 3.841-2.337 4.686-4.565 4.935.358.307.679.917.679 1.849 0 1.335-.012 2.412-.012 2.739 0 .267.18.577.687.48C19.138 20.162 22 16.418 22 12c0-5.523-4.477-10-10-10z" clipRule="evenodd" /></svg>
                  GitHub
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col relative" style={{
      fontFamily: 'Inter, sans-serif',
      // overflowX: 'auto',
    }}>
      {/* Previous gradient layer */}
      <div style={{
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        background: `radial-gradient(circle at top center, ${prevGradient.start} 40%, ${prevGradient.end} 100%)`,
        opacity: isTransitioning ? 1 : 0,
        transition: 'opacity 0.2s ease-in-out',
        zIndex: 0,
      }} />
      {/* Next gradient layer */}
      <div style={{
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        background: `radial-gradient(circle at top center, ${nextGradient.start} 10%, ${nextGradient.end} 100%)`,
        opacity: isTransitioning ? 0 : 1,
        transition: 'opacity 0.8s ease-in-out',
        zIndex: 1,
      }} />
      <div className="relative z-10">
        <Header onNavClick={handleGradientChange} />
        <div style={{
          opacity: contentFade ? 1 : 0,
          transition: 'opacity 0.8s ease-in-out',
          width: '100%',
          overflowX: 'hidden',
        }}>
          {content}
        </div>
      </div>
    </div>
  );
}
