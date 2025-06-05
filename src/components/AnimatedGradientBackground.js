import React, { useEffect, useRef, useMemo } from 'react';

const AnimatedGradientBackground = ({ selectedSection, sectionGradientColors }) => {
  const backgroundRef = useRef(null);
  // Define default colors stably
  const defaultColors = useMemo(() => ({ start: '#2a2a2a', end: '#5a5a5a' }), []);

  // useEffect to update CSS custom properties when section or colors change
  useEffect(() => {
    const currentColors = sectionGradientColors?.[selectedSection] || defaultColors;
    if (backgroundRef.current) {
      backgroundRef.current.style.setProperty('--start-color', currentColors.start);
      backgroundRef.current.style.setProperty('--end-color', currentColors.end);
    }
  }, [selectedSection, sectionGradientColors, defaultColors]);

  // Memoize the style object for the div to prevent re-creation on every render
  const divStyle = useMemo(() => ({
    // Initial values for CSS vars are provided via fallbacks in the var() function
    background: `radial-gradient(circle at 50% 50%, var(--start-color, ${defaultColors.start}) 0%, var(--end-color, ${defaultColors.end}) 70%, var(--start-color, ${defaultColors.start}) 100%)`,
    backgroundSize: '180% 180%',
    height: '100vh',
    width: '100vw',
    position: 'fixed',
    top: 0,
    left: 0,
    zIndex: -1,
    animation: 'animateRadialGradient 10s ease-in-out infinite',
    // Attempt to transition colors smoothly. This is browser-dependent for gradients.
    // The transition is on the CSS custom properties themselves.
    // Note: Direct transition on custom properties used in gradients might not be universally smooth.
    // An alternative is to transition 'background' but that might still fight with the animation.
    // For now, this primarily aims to allow the spatial animation to continue.
    // A more complex setup with layered elements would be needed for guaranteed smooth color fades AND spatial animation.
  }), [defaultColors]); // Depends only on stable defaultColors

  return (
    <>
      <style>
        {`
          /* Apply transitions to the custom properties if the browser supports it well for gradients */
          /* This is an experimental part for smooth color change, the spatial animation is the main part */
          .animated-gradient-background-div {
            transition: --start-color 0.5s ease-in-out, --end-color 0.5s ease-in-out;
          }

          @keyframes animateRadialGradient {
            0% {
              background-position: 30% 30%;
            }
            25% {
              background-position: 70% 30%;
            }
            50% {
              background-position: 70% 70%;
            }
            75% {
              background-position: 30% 70%;
            }
            100% {
              background-position: 30% 30%;
            }
          }
        `}
      </style>
      <div
        ref={backgroundRef}
        className="animated-gradient-background-div" // Class for potential transitions on CSS vars
        style={divStyle}
      />
    </>
  );
};

export default AnimatedGradientBackground; 