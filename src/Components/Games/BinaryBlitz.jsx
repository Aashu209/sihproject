// src/Components/Games/BinaryBlitz.jsx
import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

function BinaryBlitz() {
  const [targetNumber, setTargetNumber] = useState(0);
  const [options, setOptions] = useState([]);
  const [score, setScore] = useState(0);
  const [level, setLevel] = useState(1);
  const [incorrectClicks, setIncorrectClicks] = useState(0);
  const [gameEnded, setGameEnded] = useState(false);
  const [message, setMessage] = useState('');
  const [gameStarted, setGameStarted] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    if (gameStarted && !gameEnded) {
      generateQuestion();
    }
  }, [level, gameStarted, gameEnded]);

  const toBinary = (num) => {
    return num.toString(2);
  };

  const generateQuestion = () => {
    const num = Math.floor(Math.random() * (10 * level)) + (10 * level);
    setTargetNumber(num);

    const binaryOptions = new Set();
    binaryOptions.add(toBinary(num));

    while (binaryOptions.size < 4) {
      const wrongNum = Math.floor(Math.random() * (10 * level)) + (10 * level);
      binaryOptions.add(toBinary(wrongNum));
    }

    setOptions(Array.from(binaryOptions).sort(() => Math.random() - 0.5));
  };

  const handleOptionClick = (binaryString) => {
    if (gameEnded) return;

    if (parseInt(binaryString, 2) === targetNumber) {
      setScore(score + 10);
      setMessage('✅ Correct!');
      if (score % 50 === 0 && score > 0) {
        setLevel(level + 1);
      }
      generateQuestion();
    } else {
      const newIncorrectClicks = incorrectClicks + 1;
      setIncorrectClicks(newIncorrectClicks);
      setMessage('❌ Incorrect!');
      if (newIncorrectClicks >= 3) {
        setGameEnded(true);
      }
    }
  };

  const startGame = () => {
    setGameStarted(true);
    setScore(0);
    setLevel(1);
    setIncorrectClicks(0);
    setGameEnded(false);
    setMessage('');
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-gray-900 to-black text-white p-6 relative">
      <div className="absolute inset-0 z-0 opacity-20">
        <div className="h-full w-full bg-[radial-gradient(#121a2d_1px,transparent_1px),radial-gradient(#1a243c_1px,transparent_1px)] bg-[size:30px_30px] bg-[position:0_0,15px_15px]"></div>
      </div>

      <div className="bg-gray-800/50 p-8 rounded-xl shadow-2xl w-full max-w-xl text-center z-10 backdrop-blur-sm">
        <h1 className="text-4xl font-bold mb-4 text-cyan-400">Binary Blitz</h1>
        
        {!gameStarted ? (
          <motion.div
            key="instructions"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-3xl font-bold mb-4">How to Play</h2>
            <p className="text-lg mb-2">Each correct answer gives you <span className="text-yellow-300">10 points</span>.</p>
            <p className="text-lg mb-4">You have <span className="text-red-400">3 lives</span>. After **3 wrong answers**, the game is over.</p>
            <button
              onClick={startGame}
              className="mt-6 p-4 bg-green-600 rounded-lg text-lg font-bold hover:bg-green-700 transition"
            >
              Play Game
            </button>
          </motion.div>
        ) : (
          <>
            <div className="flex justify-between items-center mb-4">
                <p className="text-lg">Score: <span className="font-bold text-yellow-300">{score}</span></p>
                <p className="text-lg">Lives: <span className="font-bold text-red-400">{3 - incorrectClicks}</span> ❤️</p>
            </div>
            
            <AnimatePresence>
              {!gameEnded ? (
                <motion.div
                  key="game"
                  initial={{ opacity: 0, y: 50 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -50 }}
                  transition={{ duration: 0.5 }}
                >
                  <div className="bg-gray-700 p-6 rounded-lg mb-6 border-2 border-cyan-400 shadow-lg shadow-cyan-400/20">
                    <p className="text-5xl font-mono">{targetNumber}</p>
                    <p className="text-sm mt-2">Choose the correct binary code:</p>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    {options.map((option, index) => (
                      <motion.button
                        key={index}
                        onClick={() => handleOptionClick(option)}
                        className="p-4 bg-indigo-600 rounded-lg text-lg font-mono hover:bg-indigo-700 transition border-2 border-transparent hover:border-white"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        {option}
                      </motion.button>
                    ))}
                  </div>
                </motion.div>
              ) : (
                <motion.div
                  key="gameover"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5 }}
                >
                  <h2 className="text-3xl font-bold text-red-500 mb-4">Game Over!</h2>
                  <p className="text-xl">Your Final Score: <span className="font-bold text-yellow-300">{score}</span></p>
                  <div className="flex flex-col gap-4 mt-6">
                    <button
                      onClick={startGame}
                      className="p-4 bg-green-600 rounded-lg text-lg font-bold hover:bg-green-700 transition"
                    >
                      Play Again
                    </button>
                    <button
                      onClick={() => navigate('/studentslearning')}
                      className="p-4 bg-blue-600 rounded-lg text-lg font-bold hover:bg-blue-700 transition"
                    >
                      Back to Learning
                    </button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
            
            <AnimatePresence>
              {message && (
                <motion.p
                  key="message"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 20 }}
                  transition={{ duration: 0.3 }}
                  className={`mt-4 text-xl font-bold ${message.includes('Correct') ? 'text-green-400' : 'text-red-400'}`}
                >
                  {message}
                </motion.p>
              )}
            </AnimatePresence>
          </>
        )}
      </div>
    </div>
  );
}

export default BinaryBlitz;