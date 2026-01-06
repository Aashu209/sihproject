// src/Components/Games/SolarSystem.jsx
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

const planetsData = [
  {
    name: 'Mercury',
    description: 'The smallest planet and closest to the Sun.',
    svg: '<circle cx="25" cy="25" r="20" fill="#a49987" />',
  },
  {
    name: 'Venus',
    description: 'Known for its thick, toxic atmosphere and extreme heat.',
    svg: '<circle cx="25" cy="25" r="22" fill="#d2af7b" />',
  },
  {
    name: 'Earth',
    description: 'Our home planet, known for its oceans and life.',
    svg: '<path d="M25 5c-13.8 0-25 11.2-25 25s11.2 25 25 25 25-11.2 25-25-11.2-25-25-25zM25 48c-12.7 0-23-10.3-23-23s10.3-23 23-23 23 10.3 23 23-10.3 23-23 23z" fill="#4a90e2"/><path d="M15 30s-2-2-5-2c-3 0-5 2-5 2l-1 5c-1 3 0 5 0 5-2 0-3 2-3 2v4c2 2 4 1 4 1h18c-2-2-4-1-4-1s-3 1-5-1c-2-2 1-3 1-3l2-5z" fill="#69a341"/><circle cx="35" cy="18" r="3" fill="#69a341"/><circle cx="40" cy="28" r="4" fill="#69a341"/>',
  },
  {
    name: 'Mars',
    description: 'The "Red Planet," famous for its reddish appearance.',
    svg: '<circle cx="25" cy="25" r="24" fill="#c1440e" />',
  },
  {
    name: 'Jupiter',
    description: 'The largest planet, a massive gas giant with a Great Red Spot.',
    svg: '<circle cx="25" cy="25" r="28" fill="#e2c595" /><rect x="10" y="20" width="30" height="5" fill="#f7f7e7" rx="2" /><rect x="15" y="30" width="20" height="3" fill="#f7f7e7" rx="1" />',
  },
  {
    name: 'Saturn',
    description: 'Known for its prominent, beautiful system of rings.',
    svg: '<circle cx="25" cy="25" r="26" fill="#c3a86c" /><ellipse cx="25" cy="25" rx="35" ry="10" stroke="#f7f7e7" stroke-width="2" fill="none" transform="rotate(-15, 25, 25)" />',
  },
  {
    name: 'Uranus',
    description: 'An "ice giant" that rotates on its side.',
    svg: '<circle cx="25" cy="25" r="25" fill="#c0f0f5" />',
  },
  {
    name: 'Neptune',
    description: 'The farthest planet from the Sun, known for its strong winds.',
    svg: '<circle cx="25" cy="25" r="24" fill="#4a7698" />',
  },
];

function shuffle(array) {
  let newArray = [...array];
  for (let i = newArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
  }
  return newArray;
}

function SolarSystem() {
  const [shuffledPlanets, setShuffledPlanets] = useState([]);
  const [shuffledDescriptions, setShuffledDescriptions] = useState([]);
  const [draggedPlanet, setDraggedPlanet] = useState(null);
  const [message, setMessage] = useState('');
  const [isGameSolved, setIsGameSolved] = useState(false);

  useEffect(() => {
    startGame();
  }, []);

  const startGame = () => {
    setShuffledPlanets(shuffle(planetsData));
    setShuffledDescriptions(shuffle(planetsData));
    setDraggedPlanet(null);
    setMessage('');
    setIsGameSolved(false);
  };

  const handleDragStart = (e, planet) => {
    setDraggedPlanet(planet);
    e.dataTransfer.setData('text/plain', planet.name);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const handleDrop = (e, descriptionCard) => {
    e.preventDefault();
    if (!draggedPlanet || isGameSolved) return;

    if (draggedPlanet.name === descriptionCard.name) {
      // Correct match
      const updatedDescriptions = shuffledDescriptions.map(desc =>
        desc.name === descriptionCard.name ? { ...desc, matched: true, matchedPlanet: draggedPlanet } : desc
      );
      setShuffledDescriptions(updatedDescriptions);

      const updatedPlanets = shuffledPlanets.map(planet =>
        planet.name === draggedPlanet.name ? { ...planet, matched: true } : planet
      );
      setShuffledPlanets(updatedPlanets);

      showMessage('Correct!', 'bg-green-500 shadow-green-400');
      if (updatedDescriptions.every(desc => desc.matched)) {
        setIsGameSolved(true);
        showMessage('You Solved the Solar System! Great Job!', 'text-white');
      }
    } else {
      // Incorrect match
      showMessage('Try Again!', 'bg-red-500 shadow-red-400');
    }
    setDraggedPlanet(null);
  };

  const showMessage = (text, colorClass) => {
    setMessage(text);
    const timeout = text.includes('Correct') ? 2000 : 500;
    setTimeout(() => {
      setMessage('');
    }, timeout);
  };

  const isCorrect = message.includes('Correct');

  return (
    <div className="bg-stars flex flex-col items-center justify-center min-h-screen text-white p-4">
      {/* Page Title & Subtitle */}
      <h1 className="text-4xl md:text-5xl font-bold text-yellow-300 drop-shadow-lg mb-2">Planet Puzzles</h1>
      <p className="text-lg text-gray-300">Drag each planet to its matching description!</p>

      {/* Main Game Container */}
      <div className="w-full max-w-5xl bg-gray-900/50 p-6 rounded-3xl shadow-2xl flex flex-col md:flex-row gap-8 items-center justify-center mt-6">

        {/* Planet Images (Drag Source) */}
        <div className="w-full md:w-1/3 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 justify-items-center">
          {shuffledPlanets.filter(planet => !planet.matched).map(planet => (
            <motion.div
              key={planet.name}
              draggable
              onDragStart={(e) => handleDragStart(e, planet)}
              className="p-2 bg-gray-800 rounded-full shadow-md cursor-grab transform transition hover:scale-105 active:scale-95 active:cursor-grabbing"
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <div
                className="w-12 h-12 flex items-center justify-center"
                dangerouslySetInnerHTML={{ __html: `<svg viewBox="0 0 50 50" class="w-full h-full">${planet.svg}</svg>` }}
              />
            </motion.div>
          ))}
        </div>

        {/* Planet Descriptions (Drop Zone) */}
        <div className="w-full md:w-2/3 grid grid-cols-1 md:grid-cols-2 gap-4">
          {shuffledDescriptions.map(desc => (
            <motion.div
              key={desc.name}
              onDragOver={handleDragOver}
              onDrop={(e) => handleDrop(e, desc)}
              className={`min-h-[150px] bg-gray-800 p-4 rounded-xl shadow-lg border-2 border-transparent transition duration-300 text-center flex items-center justify-center
                          ${desc.matched ? 'bg-green-700/80 shadow-lg shadow-green-400/50' : 'hover:border-indigo-400'}`}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.5 }}
            >
              <div className="text-center w-full">
                {desc.matched ? (
                  <>
                    <p className="text-xl font-bold">{desc.matchedPlanet.name}</p>
                    <p className="text-md mt-1">{desc.description}</p>
                  </>
                ) : (
                  <p className="text-md opacity-70">{desc.description}</p>
                )}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
      
      {message && (
        <p className={`mt-6 text-xl font-bold ${isCorrect ? 'text-green-400' : 'text-red-400'} ${isCorrect ? 'animate-pulse' : ''}`}>
          {message}
        </p>
      )}

      {isGameSolved && (
        <button
          onClick={startGame}
          className="mt-8 px-6 py-3 bg-indigo-600 hover:bg-indigo-700 text-white font-bold rounded-full shadow-lg transition duration-300 ease-in-out transform hover:scale-105"
        >
          Restart Game
        </button>
      )}

      {/* The `bg-stars` class uses a radial gradient that cannot be created with pure Tailwind, so it's defined here. */}
      <style>{`
        .bg-stars {
          background-color: #0d1117;
          background-image:
            radial-gradient(white, rgba(20, 3, 3, 0.2) 2px, transparent 40px),
            radial-gradient(white, rgba(255,255,255,.15) 1px, transparent 30px),
            radial-gradient(white, rgba(255,255,255,.1) 2px, transparent 40px);
          background-size: 550px 550px, 350px 350px, 250px 250px;
          background-position: 0 0, 40px 60px, 130px 270px;
        }
      `}</style>
    </div>
  );
}

export default SolarSystem;