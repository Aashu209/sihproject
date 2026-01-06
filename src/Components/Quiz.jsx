// src/Components/Quiz.jsx
import React, { useState } from "react";
import { motion } from "framer-motion";
import { Link, useNavigate } from "react-router-dom";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";

function Quiz() {
  // Navbar Logout
  const [showConfirm, setShowConfirm] = useState(false);
  const navigate = useNavigate();
  const handleLogout = () => {
    setShowConfirm(false);
    navigate("/"); // redirect to login
  };

  const quizzes = [
    { id: 1, subject: "Mathematics", title: "Mathematics Quiz", desc: "Test your problem-solving skills", color: "bg-blue-600" },
    { id: 2, subject: "Science", title: "Science Quiz", desc: "Explore the wonders of science", color: "bg-green-600" },
    { id: 3, subject: "Technology", title: "Technology Quiz", desc: "Travel back in time with questions", color: "bg-yellow-600" },
    { id: 4, subject: "English", title: "English Quiz", desc: "Challenge your grammar & vocab", color: "bg-purple-600" },
  ];

  // Random progress for demo
  const minProgress = 30, maxProgress = 90;
  const quizProgress = Math.floor(Math.random() * (maxProgress - minProgress + 1)) + minProgress;
  const quizzesAttempted = 3;
  const streak = 5;

  // Stars background
  const stars = [...Array(100)].map((_, i) => {
    const randomX = Math.random() * 100;
    const randomY = Math.random() * 100;
    const size = Math.random() * 3 + 1;
    const duration = Math.random() * 2 + 1;
    const delay = Math.random() * 2;
    return (
      <motion.div
        key={i}
        className="absolute rounded-full bg-white"
        style={{ left: `${randomX}%`, top: `${randomY}%`, width: `${size}px`, height: `${size}px` }}
        animate={{ opacity: [0, 1, 0], scale: [0.5, 1.2, 0.5] }}
        transition={{ duration, repeat: Infinity, repeatType: "reverse", ease: "easeInOut", delay }}
      />
    );
  });

  return (
    <div className="relative min-h-screen flex flex-col bg-gradient-to-br from-gray-950 via-gray-900 to-black text-white overflow-hidden">
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

          <li>
            <button
              onClick={() => setShowConfirm(true)}
              className="relative px-2 py-1 group text-white"
            >
              <span className="relative z-10 transition duration-300 group-hover:text-red-400">
                Log Out
              </span>
              <span className="absolute left-0 bottom-0 w-0 h-0.5 bg-gradient-to-r from-red-400 to-red-600 transition-all duration-500 group-hover:w-full"></span>
            </button>
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

      {/* Page Content */}
      <div className="relative z-20 flex-1 px-8 pt-20">
        <h2 className="mb-6 text-3xl font-bold">Quiz Section ✨</h2>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
          {/* Quizzes List */}
          <div className="md:col-span-2">
            <h3 className="mb-4 text-xl font-semibold">Available Quizzes</h3>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              {quizzes.map((quiz) => (
                <motion.div
                  key={quiz.id}
                  whileHover={{ scale: 1.05 }}
                  className="rounded-xl bg-gray-800/60 p-6 shadow-lg backdrop-blur-xl border border-white/10"
                >
                  <div className={`mb-4 flex h-14 w-14 items-center justify-center rounded-full text-xl font-bold ${quiz.color}`}>
                    {quiz.title.charAt(0)}
                  </div>
                  <h3 className="text-lg font-bold">{quiz.title}</h3>
                  <p className="mt-1 text-sm opacity-80">{quiz.desc}</p>
                  <button
                    onClick={() => navigate(`/quiz/${quiz.title.split(" ")[0].toLowerCase()}`)}
                    className="mt-6 w-full rounded-lg bg-gradient-to-r from-blue-600 to-indigo-700 py-2 font-semibold text-white hover:from-blue-700 hover:to-indigo-800 transition"
                  >
                    Start Quiz
                  </button>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Progress Overview */}
            <div className="rounded-xl bg-gray-800/60 p-4 shadow-lg backdrop-blur-xl border border-white/10">
              <h3 className="mb-3 text-lg font-semibold">Your Quiz Progress</h3>
              <div className="flex items-center justify-center">
                <div className="h-28 w-28">
                  <CircularProgressbar
                    value={quizProgress}
                    text={`${quizProgress}%`}
                    styles={buildStyles({
                      textColor: "#fff",
                      pathColor: "#38bdf8",
                      trailColor: "rgba(255,255,255,0.2)",
                    })}
                  />
                </div>
              </div>
              <p className="mt-3 text-center text-sm">You’ve attempted {quizzesAttempted} quizzes 🎯</p>
              <p className="text-center text-sm">Current streak: {streak} days 🔥</p>
            </div>

            {/* Motivation Box */}
            <div className="rounded-xl bg-gray-800/60 p-4 text-center shadow-lg backdrop-blur-xl border border-white/10">
              <h3 className="mb-2 text-lg font-semibold">Keep Going 🚀</h3>
              <p className="text-sm opacity-80">Challenge yourself daily and level up your skills!</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Quiz;

