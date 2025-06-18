import React from 'react';
import { RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar, ResponsiveContainer } from 'recharts';

const skillsData = [
  { skill: 'Java', skillMobile: 'Java', level: 100 },
  { skill: 'Spring Boot', skillMobile: 'SpringBoot', level: 100 },
  { skill: 'React.js', skillMobile: 'React', level: 90 },
  { skill: 'React Native', skillMobile: 'RN', level: 90 },
  { skill: 'HTML/CSS/JS/TS', skillMobile: 'Web', level: 90 },
  { skill: 'Python', skillMobile: 'Python', level: 80 },
  { skill: 'Node.js', skillMobile: 'Node', level: 80 },
  { skill: 'SQL', skillMobile: 'SQL', level: 95 },
  { skill: 'Docker', skillMobile: 'Docker', level: 90 },
  { skill: 'Kubernetes', skillMobile: 'K8s', level: 75 },
  { skill: 'CI/CD', skillMobile: 'CI/CD', level: 75 },
  { skill: 'AWS', skillMobile: 'AWS', level: 85 },
  { skill: 'C++', skillMobile: 'C++', level: 75 },
];

export default function SkillsRadarChart() {
  // Hook to detect mobile screen size
  const [isMobile, setIsMobile] = React.useState(false);
  
  React.useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Prepare data with responsive skill names
  const responsiveSkillsData = skillsData.map(item => ({
    ...item,
    skill: isMobile ? item.skillMobile : item.skill
  }));

  return (
    <div className="w-full max-w-4xl mx-auto">
      <h2 className="text-3xl font-bold text-white mb-8 text-center">Technical Skills</h2>
      
      {/* Glassmorphism container */}
      <div className="bg-white bg-opacity-10 backdrop-blur-lg rounded-2xl p-4 md:p-8 border border-white border-opacity-20 shadow-2xl">
        {/* Glowing background effect */}
        <div className="relative">
          {/* Glow effect background */}
          <div 
            className="absolute inset-0 rounded-2xl opacity-30"
            style={{
              background: 'radial-gradient(circle at center, rgba(207, 37, 250, 0.3) 0%, rgba(48, 7, 105, 0.1) 70%, transparent 100%)',
              filter: 'blur(20px)',
            }}
          />
          
          {/* Chart container with enhanced styling */}
          <ResponsiveContainer width="100%" height={isMobile ? 400 : 500}>
            <RadarChart 
              data={responsiveSkillsData} 
              margin={isMobile ? 
                { top: 20, right: 30, bottom: 20, left: 30 } : 
                { top: 40, right: 60, bottom: 40, left: 60 }
              }
              style={{
                filter: 'drop-shadow(0 0 20px rgba(250, 207, 37, 0.3))',
              }}
            >
              {/* Enhanced grid with subtle glow */}
              <PolarGrid 
                gridType="polygon" 
                stroke="rgba(255, 255, 255, 0.1)"
                strokeWidth={1}
                style={{
                  filter: 'drop-shadow(0 0 5px rgba(255, 255, 255, 0.2))',
                }}
              />
              
              {/* Skill labels with better styling */}
              <PolarAngleAxis 
                dataKey="skill" 
                tick={{ 
                  fill: '#ffffff', 
                  fontSize: isMobile ? 10 : 13,
                  fontWeight: 'bold',
                  textShadow: '0 0 10px rgba(250, 207, 37, 0.8)',
                }}
                className="text-white font-semibold"
              />
              
              {/* Radial axis with enhanced styling */}
              <PolarRadiusAxis 
                angle={0} 
                domain={[0, 100]} 
                tick={{ 
                  fill: 'rgba(255, 255, 255, 0.2)', 
                  fontSize: isMobile ? 8 : 10,
                  fontWeight: 'bold',
                }}
                tickLine={false}
                tickCount={6}
                stroke="rgba(255, 255, 255, 0.1)"
              />
              
              {/* Main radar with glowing effect */}
              <Radar
                name="Skill Level"
                dataKey="level"
                stroke="#ffbeff"
                fill="url(#skillGradient)"
                fillOpacity={0.4}
                strokeWidth={3}
                dot={{ 
                  fill: '#9104b5', 
                  strokeWidth: 2, 
                  stroke: '#ff8bff',
                  r: isMobile ? 3 : 5,
                  style: {
                    filter: 'drop-shadow(0 0 8px rgba(250, 207, 37, 0.8))',
                  }
                }}
                style={{
                  filter: 'drop-shadow(0 0 15px rgba(250, 207, 37, 0.6))',
                }}
              />
              
              {/* Define gradient for the fill */}
              <defs>
                <radialGradient id="skillGradient" cx="50%" cy="50%" r="50%">
                  <stop offset="0%" stopColor="#ffbcff" stopOpacity={0.8} />
                  <stop offset="50%" stopColor="#e589fc" stopOpacity={0.6} />
                  <stop offset="100%" stopColor="#9104b5" stopOpacity={0.4} />
                </radialGradient>
              </defs>
            </RadarChart>
          </ResponsiveContainer>
          
          {/* Additional glow effect overlay */}
          <div 
            className="absolute inset-0 pointer-events-none rounded-2xl"
            style={{
              background: 'radial-gradient(circle at 50% 50%, rgba(250, 207, 37, 0.1) 0%, transparent 60%)',
              mixBlendMode: 'screen',
            }}
          />
        </div>
        
        {/* Skill level legend */}
        <div className="mt-4 md:mt-6 flex justify-center">
          <div className={`flex items-center ${isMobile ? 'flex-col space-y-2' : 'space-x-6'} text-xs md:text-sm text-white opacity-80`}>
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 rounded-full bg-yellow-400 shadow-lg shadow-yellow-400/50"></div>
              <span>Expert (90-100%)</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 rounded-full bg-orange-400 shadow-lg shadow-orange-400/50"></div>
              <span>Advanced (75-89%)</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 rounded-full bg-purple-400 shadow-lg shadow-purple-400/50"></div>
              <span>Intermediate (60-74%)</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 