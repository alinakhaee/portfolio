import React from 'react';
import './GradientBackground.css';

function GradientBackground({ colors, children }) {
  // Radial gradient centered at the header's vertical position (e.g., 48px from the top)
  const gradientStyle = {
    background: `radial-gradient(ellipse at 50% 48px, ${colors[0]}, ${colors[1]} 100%)`,
    minHeight: '100vh',
    width: '100%',
    transition: 'background 1s cubic-bezier(0.4,0,0.2,1)',
    position: 'absolute',
    top: 0,
    left: 0,
    zIndex: -1,
    pointerEvents: 'none',
  };
  return <div style={gradientStyle} className="gradient-bg">{children}</div>;
}

export default GradientBackground; 