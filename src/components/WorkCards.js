import React, { useState, useEffect, useMemo } from 'react';
import ReactMarkdown from 'react-markdown';

// Helper function to generate a random hex color
function getRandomHexColor() {
  let color = '#';
  for (let i = 0; i < 6; i++) {
    color += Math.floor(Math.random() * 16).toString(16);
  }
  return color;
}

// Helper function to determine contrasting text color (black or white)
function getContrastTextColor(hexBgColor) {
  if (!hexBgColor) return '#000000'; // Default to black if no color
  const hex = hexBgColor.replace('#', '');
  const r = parseInt(hex.substring(0, 2), 16);
  const g = parseInt(hex.substring(2, 4), 16);
  const b = parseInt(hex.substring(4, 6), 16);
  // Calculate perceived luminance (formula from WCAG)
  const luminance = (0.299 * r + 0.587 * g + 0.114 * b) / 255;
  return luminance > 0.5 ? '#000000' : '#FFFFFF';
}

const cards = [
  {
    type: 'work',
    title: 'Full Stack Developer at MealLens (Mitacs Project)',
    description: 'Before my Master\'s graduation, I had the chance to work on a Mitacs project for MealLens, where I was responsible for entire software development process (frontend+backend).',
    languages: ['Java', 'AWS', 'React', 'SpringBoot', 'PostgreSQL', 'React Native', 'Expo', 'Docker', 'Kubernetes'],
    details1: '- Full details about Project Alpha.\n- This could include screenshots, links, features, challenges, and more.\n- Lorem ipsum dolor sit amet, consectetur adipiscing elit.\n- Pellentesque euismod, nisi eu consectetur consectetur, nisl nisi consectetur nisi, euismod euismod nisi nisi euismod.',
    details2: '- Full details about Project Alpha.\n- This could include screenshots, links, features, challenges, and more.\n- Lorem ipsum dolor sit amet, consectetur adipiscing elit.\n- Pellentesque euismod, nisi eu consectetur consectetur, nisl nisi consectetur nisi, euismod euismod nisi nisi euismod.',
    duration: 'Jan 2025 - May 2025', // Placeholder duration
  },
  {
    type: 'work',
    title: 'Software Engineer at Neshan Maps & Navigator',
    description: 'Started as an apprentice, I\'ve had a long journey to become a skilled software engineer in terms of clean architecture and efficient big data handling using Java and SpringBoot.',
    languages: ['Java', 'SpringBoot', 'PostgreSQL', 'Docker', 'Kubernetes', 'Rust', 'PostGIS', 'Prometheus', 'Grafana', 'Elasticsearch', 'RabbitMQ'],
    details1: '- Full details about Project Alpha.\n- This could include screenshots, links, features, challenges, and more.\n- Lorem ipsum dolor sit amet, consectetur adipiscing elit.\n- Pellentesque euismod, nisi eu consectetur consectetur, nisl nisi consectetur nisi, euismod euismod nisi nisi euismod.',
    details2: '- Full details about Project Alpha.\n- This could include screenshots, links, features, challenges, and more.\n- Lorem ipsum dolor sit amet, consectetur adipiscing elit.\n- Pellentesque euismod, nisi eu consectetur consectetur, nisl nisi consectetur nisi, euismod euismod nisi nisi euismod.',
    duration: 'Aug 2021 - Feb 2025', // Placeholder duration
  },
  {
    type: 'work',
    title: 'Frontend Developer at Smart Construction',
    description: 'In Smart Construction, our project was to develop a system to improve communication between workers in a construction project.',
    languages: ['React', 'React Native', 'Expo'],
    details1: '- Full details about Project Beta.\n- This could include screenshots, links, features, challenges, and more.\n- Lorem ipsum dolor sit amet, consectetur adipiscing elit.\n- Pellentesque euismod, nisi eu consectetur consectetur, nisl nisi consectetur nisi, euismod euismod nisi nisi euismod.',
    details2: '- Full details about Project Beta.\n- This could include screenshots, links, features, challenges, and more.\n- Lorem ipsum dolor sit amet, consectetur adipiscing elit.\n- Pellentesque euismod, nisi eu consectetur consectetur, nisl nisi consectetur nisi, euismod euismod nisi nisi euismod.',
    duration: 'Oct 2020 - Sept 2021', // Placeholder duration
  },
  {
    type: 'work',
    title: 'Backend Developer at Part Software Group',
    description: 'In a selective internship program, I simulated an X (Twitter) REST API using Node.js, Express, and PostgreSQL.',
    languages: ['Nodejs', 'Express', 'PostgreSQL'],
    details1: '- In this internship, I worked with Node.js and PostgreSQL to build a social media REST API. My main focus was deploying the API so that it was accessible for users and developers to test and use. My biggest achievement in this role was successfully deploying the API, which involved handling requests, responses, and integrating the database with user data and posts.',
    details2: '- In this internship, I worked with Node.js and PostgreSQL to build a social media REST API.\n- My main focus was deploying the API so that it was accessible for users and developers to test and use.\n- My biggest achievement in this role was successfully deploying the API, which involved handling requests, responses, and integrating the database with user data and posts.',
    duration: 'Apr 2020 - Aug 2020', // Placeholder duration
  },
  {
    type: 'education',
    title: 'Master of Computer Science',
    description: 'University of Windsor, Windsor, ON, Canada. \n Specialized in Algorithm Design and Computational Geometry.',
    languages: ['Algorithm Design', 'Computational Geometry', 'Data Structures',], 
    details1: 'A master\'s degree in computer science with a focus on algorithm design and computational geometry, including data structures, algorithm design, and computational geometry.',
    details2: '- Submitted a paper to **CCCG 2025**: "Guarding Polygons with Mutually Visible π-Guards."\n- Conducted research on computational geometry under the supervision of Dr. Ahmad Biniaz.\n- GA for Algorithm Design (2x), Data Structures, Advanced Programming, and Mobile Development.',
    duration: 'Sept 2023 - May 2025',
  },
  {
    type: 'education',
    title: 'Bachelor of Computer Engineering',
    description: 'Ferdowsi University of Mashhad, Mashhad, KR, Iran. \n Specialized in Software Engineering and Artificial Intelligence.',
    languages: ['Data Structures', 'OOP', 'Web Dev', 'Databases', 'OS', 'AI'],
    details1: 'A comprehensive study of software engineering and artificial intelligence, including data structures, object-oriented programming, web development, databases, operating systems, and artificial intelligence.',
    details2: '- **Final project:** "Routing Engine for Optimizing Fuel Consumption"\n- TA for Operating Systems, Programming Fundamentals, and Advanced Programming.\n- Activities and societies: Participated in two ICPC contests, ranking third in the university.',
    duration: 'Sept 2018 - March 2023',
  },
];

// SVG Icon for Education (Graduation Cap)
const EducationIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6 text-indigo-600 mr-2 flex-shrink-0">
    <path d="M12 3L1 9l11 6 9-4.91V17h2V9L12 3zm0 8.24L5.31 8.11 12 4.69l6.69 3.42L12 11.24z"/>
    <path d="M3.31 10.75L2 11.49v4.02l1.99.74.01-4.5zm15.38 0l-.01 4.5 1.99-.74v-4.02l-1.31-.74z"/>
    <path d="M5 13.18V17.5h14v-4.32L12 16.16 5 13.18zm2 2.32h10v1H7v-1z"/>
  </svg>
);

export default function WorkCards() {
  const [selectedCard, setSelectedCard] = useState(null);

  // Memoize colors per card to avoid re-randomizing on every render of WorkCards
  // This is a compromise: colors are random per card load, but stable during its view.
  const cardLanguageStyles = useMemo(() => {
    return cards.map(card => {
      const styles = {};
      card.languages.forEach(lang => {
        const bgColor = getRandomHexColor();
        styles[lang] = {
          backgroundColor: bgColor,
          color: getContrastTextColor(bgColor),
          opacity: 0.8,
        };
      });
      return styles;
    });
  }, []);

  return (
    <>
      {/* Main container for cards, now takes full height of its parent and has adjusted padding */}
      <div
        className="flex flex-col items-center h-full w-full overflow-y-auto pt-8 pb-24 px-2 custom-scrollbar"
      >
        <div className="flex flex-col w-full items-center">
          {cards.map((card, idx) => (
            <div
              key={idx}
              className={`${card.type === 'education' ? 'bg-indigo-200' : 'bg-white'} shadow-lg rounded-xl p-8 w-full max-w-2xl mb-8 text-left transform transition-transform duration-300 hover:scale-105 cursor-pointer`}
              onClick={() => setSelectedCard(card)}
            >
              <div className="flex flex-col sm:flex-row sm:items-start justify-between mb-4">
                <div className="flex items-start sm:mr-4 mb-2 sm:mb-0 flex-grow">
                  {card.type === 'education' && <EducationIcon />}
                  <h2 className="text-2xl font-bold" title={card.title}>{card.title}</h2>
                </div>
                <div className="flex items-center space-x-2 flex-shrink-0 mt-2 sm:mt-0">
                  {/* Show first 3 languages or all if less than 3 */}
                  {(card.languages && card.languages.length > 0) && card.languages.slice(0, 3).map((lang, i) => {
                    const style = cardLanguageStyles[idx]?.[lang] || { backgroundColor: '#cccccc', color: '#000000' };
                    return (
                      <span
                        key={i}
                        className="inline-block w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold"
                        style={style}
                        title={lang}
                      >
                        {lang.length > 4 ? lang.substring(0,3)+'.' : lang}
                      </span>
                    );
                  })}
                  {/* Show +N if more than 3 languages */}
                  {(card.languages && card.languages.length > 3) && (
                    <span className="text-sm text-gray-500 ml-1">
                      +{card.languages.length - 3}
                    </span>
                  )}
                </div>
              </div>
              <p className="text-gray-600 text-sm line-clamp-3 mb-3 whitespace-pre-line">{card.description}</p>
              {/* Container for Duration and "See more" link */}
              <div className="flex justify-between items-center mt-1">
                {/* Duration on card */}
                {card.duration && (
                  <p className="text-xs text-gray-500">{card.duration}</p>
                )}
                {/* "See more" indicator */}
                <span className="text-sm text-blue-600 hover:text-blue-800 font-medium transition-colors duration-150">
                  See more...
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
      {/* Modal */}
      {selectedCard && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-75 px-4 py-8"
          onClick={() => setSelectedCard(null)}
        >
          <div
            className="bg-white rounded-xl shadow-2xl max-w-2xl w-full max-h-[90vh] p-6 sm:p-8 relative flex flex-col"
            onClick={e => e.stopPropagation()}
          >
            <div className="flex-shrink-0">
              <button
                className="absolute top-3 right-3 sm:top-4 sm:right-4 text-2xl text-gray-500 hover:text-gray-800 z-10"
                onClick={() => setSelectedCard(null)}
                aria-label="Close"
              >
                &times;
              </button>
              {/* Modal Title */}
              <h2 className="text-2xl sm:text-3xl font-bold mb-1 text-gray-800 text-center pr-8">{selectedCard.title}</h2>
              {/* Duration */}
              {selectedCard.duration && (
                <p className="text-xs text-gray-500 mb-4 text-center">{selectedCard.duration}</p>
              )}
            </div>

            {/* Scrollable content area for description, skills, details */}
            <div className="flex-grow overflow-y-auto custom-scrollbar-modal pr-2"> 
              {/* Description (Markdown) */}
              {selectedCard.details1 && (
                <div className="mb-5 prose prose-sm max-w-none">
                  <h3 className="text-lg sm:text-xl font-semibold text-gray-700 mb-2">Description</h3>
                  <ReactMarkdown>{selectedCard.details1}</ReactMarkdown>
                </div>
              )}

              {/* Details (Markdown) */}
              {selectedCard.details2 && (
                <div className="prose prose-sm max-w-none mb-5">
                  <h3 className="text-lg sm:text-xl font-semibold text-gray-700 mb-2">Key Details & Achievements</h3>
                  <ReactMarkdown>{selectedCard.details2}</ReactMarkdown>
                </div>
              )}

              {/* Languages/Skills Grid */}
              {(selectedCard.languages && selectedCard.languages.length > 0) && (
                <div>
                  <h3 className="text-lg sm:text-xl font-semibold text-gray-700 mb-2">Technologies & Skills</h3>
                  <div className="flex flex-wrap gap-2">
                    {selectedCard.languages.map((lang, i) => {
                      const originalCardIndex = cards.findIndex(c => c.title === selectedCard.title);
                      const style = cardLanguageStyles[originalCardIndex]?.[lang] || { backgroundColor: '#cccccc', color: '#000000' };
                      return (
                        <span
                          key={i}
                          className="flex items-center justify-center p-2 h-10 min-w-[80px] rounded-md text-sm font-semibold shadow-sm"
                          style={style}
                          title={lang}
                        >
                          {lang}
                        </span>
                      );
                    })}
                  </div>
                </div>
              )}

            </div>
            
            {/* Custom scrollbar style for modal grid */}
            <style>
              {`
                .custom-scrollbar-modal::-webkit-scrollbar {
                  height: 8px;
                }
                .custom-scrollbar-modal::-webkit-scrollbar-thumb {
                  background: #e0e0e0; /* Lighter scrollbar for modal context */
                  border-radius: 4px;
                }
                .custom-scrollbar-modal::-webkit-scrollbar-thumb:hover {
                  background: #c0c0c0;
                }
                .custom-scrollbar-modal::-webkit-scrollbar-track {
                  background: #f7f7f7; 
                  border-radius: 4px;
                }
                .custom-scrollbar-modal {
                  scrollbar-width: thin;
                  scrollbar-color: #e0e0e0 #f7f7f7;
                }
                /* Ensure bullets are shown for lists within prose */
                .prose ul,
                [class*="prose"] ul {
                  list-style-type: disc; /* Or square, or circle */
                  padding-left: 1.5em; /* Adjust as needed for indentation */
                }
                .prose ul li::before,
                [class*="prose"] ul li::before {
                    content: ""; /* Reset any custom ::before pseudo-elements from prose */
                    display: none;
                }
            `}
            </style>
          </div>
        </div>
      )}
    </>
  );
} 