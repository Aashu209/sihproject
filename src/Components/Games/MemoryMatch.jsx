// src/Components/Games/MemoryMatch.jsx
import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";

function MemoryMatch() {
  const initialWords = ["ODISHA", "GRAMMAR", "PHASER", "CODE", "QUIZ", "LEARN"];

  const [cards, setCards] = useState([]);
  const [flippedCards, setFlippedCards] = useState([]);
  const [matchedPairs, setMatchedPairs] = useState([]);
  const [message, setMessage] = useState("");
  const [moves, setMoves] = useState(0);
  const [gameStarted, setGameStarted] = useState(false);

  useEffect(() => {
    if (matchedPairs.length === initialWords.length) {
      const finalScore = 100 - Math.floor(moves / 2);
      setMessage(`🎉 You won! Your score is: ${finalScore} points!`);
    }
  }, [matchedPairs, initialWords.length, moves]);

  useEffect(() => {
    if (flippedCards.length === 2) {
      const [firstCard, secondCard] = flippedCards;

      if (cards[firstCard].word === cards[secondCard].word) {
        setMatchedPairs(prev => [...prev, cards[firstCard].word]);
        setTimeout(() => setFlippedCards([]), 500);
      } else {
        setTimeout(() => setFlippedCards([]), 1000);
      }
    }
  }, [flippedCards, cards]);

  const startGame = () => {
    setGameStarted(true);
    setMoves(0);
    setMatchedPairs([]);
    setMessage("");

    const gameCards = [...initialWords, ...initialWords]
      .sort(() => 0.5 - Math.random())
      .map((word, index) => ({
        id: index,
        word: word,
        isFlipped: false,
        isMatched: false,
      }));
    setCards(gameCards);
  };

  const handleCardClick = (id) => {
    if (!gameStarted || flippedCards.length === 2 || matchedPairs.includes(cards[id].word)) {
      return;
    }

    setMoves(prev => prev + 1);
    setFlippedCards(prev => [...prev, id]);
  };

  const finalScore = 100 - Math.floor(moves / 2);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-indigo-950 via-purple-900 to-indigo-950 text-white p-6">
      <h1 className="text-3xl font-bold mb-6">🧠 Memory Match</h1>

      {!gameStarted && (
        <div className="bg-white/10 rounded-xl p-8 shadow-lg text-center w-80">
          <h2 className="text-2xl font-semibold mb-4">How to Play</h2>
          <p className="mb-4">Match all pairs of words by flipping two cards at a time. Good luck!</p>
          <button
            onClick={startGame}
            className="px-6 py-2 bg-green-500 rounded-lg hover:bg-green-600 transition w-full"
          >
            Start Game
          </button>
        </div>
      )}

      {gameStarted && (
        <>
          <p className="text-xl font-bold mb-4">Moves: {Math.floor(moves / 2)}</p>

          <div className="grid grid-cols-4 gap-4">
            {cards.map((card) => (
              <motion.div
                key={card.id}
                onClick={() => handleCardClick(card.id)}
                whileHover={{ scale: 1.05 }}
                className={`w-24 h-24 rounded-lg shadow-lg flex items-center justify-center transition-transform duration-300
                            ${flippedCards.includes(card.id) || matchedPairs.includes(card.word) 
                                ? 'bg-white/90 text-indigo-900' 
                                : 'bg-indigo-600 text-white hover:bg-indigo-700'
                            }
                            `}
              >
                {flippedCards.includes(card.id) || matchedPairs.includes(card.word)
                  ? <span className="text-base font-bold text-center p-2">{card.word}</span>
                  : <span className="text-2xl font-bold">?</span>
                }
              </motion.div>
            ))}
          </div>

          <div className="mt-6 text-lg">
            {message && <p className="text-yellow-400 font-bold">{message}</p>}
          </div>

          {matchedPairs.length === initialWords.length && (
            <button
              onClick={startGame}
              className="mt-6 px-6 py-2 bg-purple-500 rounded-lg hover:bg-purple-600 transition"
            >
              Play Again
            </button>
          )}
        </>
      )}
    </div>
  );
}

export default MemoryMatch;