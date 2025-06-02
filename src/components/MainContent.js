import React, { useState, useEffect } from 'react';
import heroImage1 from '../hero (1).png'; 
import heroImage2 from '../hero (2).png'; 
import heroImage3 from '../hero (3).png'; 
import heroImage4 from '../hero (4).png'; 

export default function MainContent() {
  const [startAnimation, setStartAnimation] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setStartAnimation(true);
    }, 100); // Small delay to ensure initial styles are applied before transition
    return () => clearTimeout(timer);
  }, []);

  return (
    <main className="relative flex flex-col justify-start md:justify-center flex-grow px-4 py-8 w-full min-h-screen overflow-hidden">
      {/* Text Content - ensure it has a higher z-index if it might overlap */}
      <div className="z-10 w-full max-w-4xl self-center md:self-start mb-10 md:mb-0 md:pb-[5vmin]"> {/* Added padding-bottom to avoid overlap */}
        <p className={`text-xl md:text-2xl lg:text-3xl mx-auto md:mx-12 font-medium text-gray-700 mb-4 md:mb-6 leading-relaxed text-center md:text-left transition-all duration-1000 ease-in-out ${startAnimation ? 'opacity-100 translate-y-0 scale-100' : 'opacity-0 translate-y-6 scale-95'}`}>
          Hello, There! <br /> Meet your trusted fullstack software engineer, <br />crafting ideas into apps, websites, and servers.
        </p>
        <h1
          className={`font-bold text-black leading-tight whitespace-nowrap mb-8 md:mb-16 mx-auto md:mx-12 text-center md:text-left transition-all duration-1000 ease-in-out delay-200 ${startAnimation ? 'opacity-100 translate-y-0 scale-100' : 'opacity-0 translate-y-6 scale-95'}`}
          style={{
            fontSize: 'clamp(2.5rem, 10vw, 6rem)',
          }}
        >
          Ali Nakhaeisharif
        </h1>
        {/* Download CV Button */}
        <div className={`mx-auto md:mx-12 text-center md:text-left transition-all duration-1000 ease-in-out delay-400 ${startAnimation ? 'opacity-100 translate-y-0 scale-100' : 'opacity-0 translate-y-6 scale-95'}`}>
          <a
            href="/CV.pdf" // Points to CV.pdf in the public folder
            download="Ali_Nakhaeisharif_CV.pdf"
            className="inline-block bg-yellow-500 hover:bg-yellow-600 text-white font-bold py-3 px-6 rounded-lg shadow-md hover:shadow-lg transition-all duration-300 ease-in-out transform hover:-translate-y-1"
          >
            Download My CV
          </a>
        </div>
      </div>

      {/* Flower Image Grid Container - Larger and Repositioned */}
      <div 
        className={`relative grid grid-cols-2 z-0 
                   w-full aspect-square p-1
                   md:absolute md:w-[60vmin] md:h-[60vmin] md:aspect-auto 
                   md:top-1/2 md:right-[5vmin] md:transform md:-translate-y-1/2 
                   transition-all duration-1000 ease-in-out delay-500 
                   ${startAnimation ? 'opacity-100 md:opacity-90 scale-100' : 'opacity-0 scale-90'}`}
      >
        {/* Top-left rectangle */}
        <div className={`relative aspect-square rounded-full rounded-br-none overflow-hidden m-1 transform transition-all duration-300 hover:scale-105 hover:z-20 bg-gradient-to-br from-yellow-100 via-yellow-400 to-yellow-500`}>
          <img src={heroImage1} alt="Hero section 1" className="absolute inset-0 w-full h-full object-cover opacity-80 mix-blend-multiply" />
        </div>
        {/* Top-right rectangle */}
        <div className={`relative aspect-square rounded-full rounded-bl-none overflow-hidden m-1 transform transition-all duration-300 hover:scale-105 hover:z-20 bg-gradient-to-bl from-yellow-300 via-yellow-400 to-yellow-500`}>
          <img src={heroImage2} alt="Hero section 2" className="absolute inset-0 w-full h-full object-cover opacity-80 mix-blend-multiply" />
        </div>
        {/* Bottom-left rectangle */}
        <div className={`relative aspect-square rounded-full rounded-tr-none overflow-hidden m-1 transform transition-all duration-300 hover:scale-105 hover:z-20 bg-gradient-to-tr from-yellow-300 via-yellow-400 to-yellow-500`}>
          <img src={heroImage3} alt="Hero section 3" className="absolute inset-0 w-full h-full object-cover opacity-80 mix-blend-multiply" />
        </div>
        {/* Bottom-right rectangle */}
        <div className={`relative aspect-square rounded-full rounded-tl-none overflow-hidden m-1 transform transition-all duration-300 hover:scale-105 hover:z-20 bg-gradient-to-tl from-yellow-300 via-yellow-400 to-yellow-500`}>
          <img src={heroImage4} alt="Hero section 4" className="absolute inset-0 w-full h-full object-cover opacity-80 mix-blend-multiply" />
        </div>
      </div>
    </main>
  );
} 