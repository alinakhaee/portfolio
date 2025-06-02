import React, { useState } from 'react';

const navItems = ['Hey', 'Work', 'Story', 'Chat'];

export default function Header({ onNavClick }) {
  const [selectedItem, setSelectedItem] = useState('Hey');

  const handleClick = (e, item) => {
    e.preventDefault();
    setSelectedItem(item);
    onNavClick(item);
  };

  return (
    <header className="w-full flex justify-center pt-8 z-10">
      <nav className="bg-black bg-opacity-80 rounded-full px-6 py-3 shadow-lg flex space-x-6">
        {navItems.map((item) => (
          <a
            href="#"
            key={item}
            className={`nav-item text-white text-lg font-medium hover:text-yellow-300 transition-colors duration-300 ${
              selectedItem === item ? 'bg-transparent' : ''
            }`}
            style={{
              backgroundColor: selectedItem === item ? 'rgba(100,100,100,0.2)' : 'rgba(0,0,0,0)',
              borderRadius: '9999px',
              padding: '8px 16px',
              transition: 'background-color 0.3s ease',
            }}
            onClick={e => handleClick(e, item)}
          >
            {item}
          </a>
        ))}
      </nav>
    </header>
  );
} 