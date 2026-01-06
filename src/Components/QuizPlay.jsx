// src/Components/QuizPlay.jsx
import React, { useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import quizData from "../data/quizData";
import { motion } from "framer-motion";

function QuizPlay() {
  const { subject } = useParams();
  const navigate = useNavigate();
  const questions = quizData[subject.toLowerCase()] || [];

  const [showConfirm, setShowConfirm] = useState(false);
  const handleLogout = () => {
    setShowConfirm(false);
    navigate("/");
  };

  const [currentQ, setCurrentQ] = useState(0);
  const [score, setScore] = useState(0);
  const [finished, setFinished] = useState(false);

  const handleAnswer = (option) => {
    if (option === questions[currentQ].answer) {
      setScore(score + 1);
    }
    if (currentQ + 1 < questions.length) {
      setCurrentQ(currentQ + 1);
    } else {
      setFinished(true);
    }
  };

  // Stars background
  const stars = [...Array(80)].map((_, i) => {
    const randomX = Math.random() * 100;
    const randomY = Math.random() * 100;
    const size = Math.random() * 2 + 1.5;
    const duration = Math.random() * 3 + 2;
    return (
      <motion.div
        key={i}
        className="absolute rounded-full bg-white"
        style={{
          top: `${randomY}%`,
          left: `${randomX}%`,
          width: `${size}px`,
          height: `${size}px`,
          boxShadow: "0 0 6px 2px rgba(255,255,255,0.8)",
        }}
        animate={{ opacity: [0, 1, 0], y: [0, -6, 0] }}
        transition={{ duration, repeat: Infinity, ease: "easeInOut" }}
      />
    );
  });

  if (!questions.length) {
    return (
      <div className="relative flex min-h-screen items-center justify-center overflow-hidden bg-gradient-to-br from-gray-950 via-gray-900 to-black">
        {stars}
        <div className="relative z-20 rounded-xl bg-red-600/30 px-6 py-4 text-xl font-bold text-white shadow-2xl backdrop-blur-lg">
          🚫 No quiz found for this subject
        </div>
      </div>
    );
  }

  return (
    <div className="relative flex min-h-screen flex-col overflow-hidden bg-gradient-to-br from-gray-950 via-gray-900 to-black text-white">
      {/* Stars */}
      <div className="absolute inset-0 z-0">{stars}</div>

      {/* Navbar */}
      <nav className="relative z-20 flex items-center justify-between border-b border-white/10 bg-gray-800/60 px-6 py-4 backdrop-blur-xl shadow-md">
        <h1 className="text-2xl font-extrabold text-white tracking-wide hover:text-sky-400 transition duration-300">
          EduPlay
        </h1>

        <ul className="flex space-x-8 font-medium">
          {[
            { name: "Home", path: "/studenthome" },
            { name: "My Learning", path: "/studentslearning" },
            { name: "Quiz", path: "/quiz" },
            { name: "My Dashboard", path: "/dashboard" },
          ].map((item, i) => (
            <li key={i}>
              <Link to={item.path} className="relative px-2 py-1 group">
                <span className="relative z-10 transition duration-300 group-hover:text-sky-400">
                  {item.name}
                </span>
                <span className="absolute left-0 bottom-0 w-0 h-0.5 bg-gradient-to-r from-sky-400 to-blue-500 transition-all duration-500 group-hover:w-full"></span>
              </Link>
            </li>
          ))}

          {/* Logout Item */}
          <li>
            
          </li>
        </ul>
      </nav>

      {/* Logout Confirmation */}
      {showConfirm && (
        <div className="absolute top-16 right-6 z-50 w-64 rounded-2xl border border-white/20 bg-gray-800/80 p-5 shadow-2xl backdrop-blur-xl">
          <p className="mb-4 text-base font-semibold tracking-wide text-white">
            Do you want to logout?
          </p>
          <div className="flex justify-between space-x-3">
            <button
              onClick={handleLogout}
              className="flex-1 rounded-xl bg-gradient-to-r from-red-500 to-red-700 py-2 font-semibold text-white shadow-lg transition duration-300 hover:scale-105 hover:shadow-red-500/50"
            >
              Yes
            </button>
            <button
              onClick={() => setShowConfirm(false)}
              className="flex-1 rounded-xl bg-gradient-to-r from-gray-600 to-gray-800 py-2 font-semibold text-white shadow-lg transition duration-300 hover:scale-105 hover:shadow-gray-400/50"
            >
              No
            </button>
          </div>
        </div>
      )}

      {/* Quiz Content */}
      <div className="relative z-20 flex flex-1 items-center justify-center px-6">
        {!finished ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6 }}
            className="w-full max-w-2xl rounded-2xl border border-white/10 bg-gray-800/60 p-10 text-center shadow-2xl backdrop-blur-xl"
          >
            {/* Progress Bar */}
            <div className="mb-6 h-3 w-full overflow-hidden rounded-full bg-white/20">
              <motion.div
                className="h-3 rounded-full bg-gradient-to-r from-pink-500 to-yellow-400"
                initial={{ width: 0 }}
                animate={{
                  width: `${((currentQ + 1) / questions.length) * 100}%`,
                }}
                transition={{ duration: 0.5 }}
              ></motion.div>
            </div>

            {/* Question */}
            <h2 className="mb-8 text-2xl font-extrabold tracking-wide">
              🎯 {questions[currentQ].question}
            </h2>

          {/* Options */}
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            {questions[currentQ].options.map((opt, i) => {
              const labels = ["A", "B", "C", "D"]; // Option labels
              return (
                <motion.button
                  key={i}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={() => handleAnswer(opt)}
                  className="rounded-xl bg-gradient-to-r from-indigo-600 to-purple-600 px-6 py-4 text-lg font-semibold shadow-lg transition hover:from-pink-500 hover:to-yellow-500 hover:shadow-pink-500/50 flex items-center justify-start space-x-3"
                >
                  {/* Label */}
                  <span className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-white/20 font-bold text-white">
                    {labels[i]}
                  </span>
                  {/* Option text */}
                  <span>{opt}</span>
                </motion.button>
              );
            })}
          </div>


            {/* Question Counter */}
            <p className="mt-6 text-sm opacity-80">
              Question {currentQ + 1} of {questions.length}
            </p>
          </motion.div>
        ) : (
          <motion.div
            initial={{ y: 100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ type: "spring", stiffness: 80 }}
            className="w-full max-w-lg rounded-2xl border border-white/10 bg-gray-800/60 p-10 text-center shadow-2xl backdrop-blur-xl"
          >
            <h2 className="mb-6 text-3xl font-extrabold">🎉 Woohoo! Quiz Finished!</h2>
            <p className="mb-6 text-xl font-semibold">
              ✨ Your Score:{" "}
              <span className="text-yellow-400">{score}</span> / {questions.length}
            </p>
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => navigate("/quiz")}
              className="mt-4 w-full rounded-xl bg-gradient-to-r from-green-500 to-emerald-600 py-3 text-lg font-bold text-white shadow-lg hover:from-green-400 hover:to-emerald-500"
            >
              🔙 Back to Quizzes
            </motion.button>
          </motion.div>
        )}
      </div>
    </div>
  );
}

export default QuizPlay;

