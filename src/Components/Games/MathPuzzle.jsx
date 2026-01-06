// src/Components/Games/MathPuzzle.jsx
import React, { useState, useEffect } from "react";
import { useNavigate} from "react-router-dom";

function MathPuzzle() {
  const navigate = useNavigate();
  const [question, setQuestion] = useState("");
  const [correctAnswer, setCorrectAnswer] = useState(0);
  const [playerAnswer, setPlayerAnswer] = useState("");
  const [result, setResult] = useState("");
  const [score, setScore] = useState(0);
  const [lives, setLives] = useState(3); // Start with 3 lives
  const [gameStarted, setGameStarted] = useState(false); // New state to control game start

  useEffect(() => {
    // Only generate a question if the game has started and lives are > 0
    if (gameStarted && lives > 0) {
      generateQuestion();
    }
  }, [gameStarted, lives]); // Dependency array ensures this runs when game starts or lives change

  const generateQuestion = () => {
    // Operations for Class 6: basic arithmetic, exponents, percentages, and combined operations
    const types = ['basic', 'exponent', 'percentage', 'combined'];
    const randomType = types[Math.floor(Math.random() * types.length)];
    let newQuestion = "";
    let newAnswer = 0;

    if (randomType === 'basic') {
      const operators = ['+', '-', '*', '/'];
      const op = operators[Math.floor(Math.random() * operators.length)];
      let num1, num2;

      if (op === '+' || op === '-') {
        num1 = Math.floor(Math.random() * 90) + 10;
        num2 = Math.floor(Math.random() * 90) + 10;
        newAnswer = (op === '+') ? num1 + num2 : num1 - num2;
      } else if (op === '*') {
        num1 = Math.floor(Math.random() * 20) + 5;
        num2 = Math.floor(Math.random() * 10) + 2;
        newAnswer = num1 * num2;
      } else if (op === '/') {
        num2 = Math.floor(Math.random() * 10) + 2;
        num1 = num2 * (Math.floor(Math.random() * 20) + 2);
        newAnswer = num1 / num2;
      }
      newQuestion = `${num1} ${op} ${num2} = ?`;

    } else if (randomType === 'exponent') {
      const base = Math.floor(Math.random() * 5) + 2;
      const exponent = Math.floor(Math.random() * 3) + 2;
      newAnswer = Math.pow(base, exponent);
      newQuestion = `${base}^${exponent} = ?`;

    } else if (randomType === 'percentage') {
      const base = Math.floor(Math.random() * 50) + 50;
      const percentage = (Math.floor(Math.random() * 4) + 1) * 5;
      newAnswer = (base * percentage) / 100;
      newQuestion = `What is ${percentage}% of ${base} = ?`;

    } else if (randomType === 'combined') {
      const num1 = Math.floor(Math.random() * 10) + 1;
      const num2 = Math.floor(Math.random() * 10) + 1;
      const num3 = Math.floor(Math.random() * 10) + 1;
      const operators = ['+', '-', '*'];
      const op1 = operators[Math.floor(Math.random() * operators.length)];
      const op2 = operators[Math.floor(Math.random() * operators.length)];

      newAnswer = eval(`(${num1} ${op1} ${num2}) ${op2} ${num3}`);
      newQuestion = `(${num1} ${op1} ${num2}) ${op2} ${num3} = ?`;
    }

    setQuestion(newQuestion);
    setCorrectAnswer(newAnswer);
    setPlayerAnswer("");
    setResult("");
  };

  const checkAnswer = () => {
    if (!gameStarted) return; // Prevent checks before game starts

    if (parseInt(playerAnswer) === correctAnswer) {
      setResult("✅ Correct!");
      setScore(score + 10);
      setTimeout(() => {
        generateQuestion();
      }, 500);
    } else {
      setResult("❌ Incorrect! Try again.");
      setLives(lives - 1); // Decrease lives on wrong answer
    }
  };

  const startGame = () => {
    setGameStarted(true);
    setScore(0);
    setLives(3);
    setResult("");
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-indigo-950 via-purple-900 to-indigo-950 text-white">
      <h1 className="text-3xl font-bold mb-6">🧠 Math Master</h1>

      {!gameStarted ? (
        // Start screen with instructions
        <div className="bg-white/10 rounded-xl p-8 shadow-lg text-center w-80">
          <h2 className="text-2xl font-semibold mb-4">Instructions</h2>
          <p className="mb-2">Each correct answer gives you **10 points**.</p>
          <p className="mb-4">You have **3 lives**. After **3 consecutive wrong answers**, the game is over.</p>
          <button
            onClick={startGame}
            className="px-6 py-2 bg-green-500 rounded-lg hover:bg-green-600 transition w-full"
          >
            Start Game
          </button>
        </div>
      ) : (
        // Game screen
        <>
          <p className="text-xl font-bold mb-2">Score: {score}</p>
          <p className="text-xl font-bold mb-4">Lives: {lives} ❤️</p>
          
          {lives > 0 ? (
            <div className="bg-white/10 rounded-xl p-8 shadow-lg text-center w-80">
              <p className="text-3xl mb-4">
                {question}
              </p>
              <input
                type="number"
                value={playerAnswer}
                onChange={(e) => setPlayerAnswer(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    checkAnswer();
                  }
                }}
                className="px-4 py-2 w-full rounded-lg text-black text-center text-lg mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Your Answer"
              />
              <button
                onClick={checkAnswer}
                className="px-6 py-2 bg-green-500 rounded-lg hover:bg-green-600 transition w-full mb-2"
              >
                Submit
              </button>
              <button
                onClick={generateQuestion}
                className="px-6 py-2 bg-blue-500 rounded-lg hover:bg-blue-600 transition w-full"
              >
                Next Question
              </button>
            </div>
          ) : (
            // Game over screen
            <div className="bg-white/10 rounded-xl p-8 shadow-lg text-center w-80">
              <h2 className="text-2xl font-semibold mb-4">Game Over!</h2>
              <p className="text-xl mb-4">Your final score is: **{score}**</p>
              <button
                onClick={startGame}
                className="px-6 py-2 bg-green-500 rounded-lg hover:bg-green-600 transition w-full"
              >
                Play Again
              </button>
              <button
                    onClick={() => navigate('/studentslearning')}
                    className="px-6 py-2 pt-4 bg-blue-600 rounded-lg hover:bg-green-600 transition w-full"
                    >
                      Back to Learning
                    </button>
            </div>
          )}
          <p className={`mt-4 text-xl font-semibold ${result.includes('✅') ? 'text-green-400' : 'text-red-400'}`}>{result}</p>
        </>
      )}
    </div>
  );
}

export default MathPuzzle;