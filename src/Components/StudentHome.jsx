// StudentHome.jsx
import React, { useState } from "react";
import { motion } from "framer-motion";
import { Link, useLocation, useNavigate } from "react-router-dom";

function StudentHome() {
  const location = useLocation();
  const fallbackName = localStorage.getItem("studentName") || "Student";
  const studentName = location.state?.studentName || fallbackName;

  // Navbar Logout
  const [showConfirm, setShowConfirm] = useState(false);
  const navigate = useNavigate();
  const handleLogout = () => {
    setShowConfirm(false);
    navigate("/"); // redirect to login
  };

  // Stars background (same as login/signup)
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
        style={{
          left: `${randomX}%`,
          top: `${randomY}%`,
          width: `${size}px`,
          height: `${size}px`,
        }}
        animate={{ opacity: [0, 1, 0], scale: [0.5, 1.2, 0.5] }}
        transition={{
          duration,
          repeat: Infinity,
          repeatType: "reverse",
          ease: "easeInOut",
          delay,
        }}
      />
    );
  });

  return (
    <div className="relative flex min-h-screen flex-col overflow-hidden bg-gradient-to-br from-gray-950 via-gray-900 to-black">
      {/* Stars */}
      <div className="absolute inset-0 z-0">{stars}</div>

      {/* Navbar */}
      <nav className="relative z-20 flex items-center justify-between border-b border-white/10 bg-gray-800/60 px-6 py-4 backdrop-blur-xl shadow-md">
        <h1 className="text-2xl font-extrabold text-white tracking-wide hover:text-sky-400 transition duration-300">
          EduPlay
        </h1>

        <ul className="flex space-x-8 text-white font-medium">
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

          {/* Logout */}
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

      {/* Hero Section */}
      <div className="relative z-20 flex flex-1 flex-col items-center justify-center px-6 text-center">
        <h2 className="mb-10 text-4xl font-extrabold leading-snug text-white drop-shadow-lg md:text-5xl">
          Welcome, <span className="text-indigo-400">{studentName}</span> 👋
          <br />
          India’s Free & Leading E-Learning Platform
        </h2>

        {/* Buttons */}
        <div className="mt-6 flex flex-col gap-6 md:flex-row">
          <Link to="/quiz">
            <motion.button
              whileHover={{ scale: 1.08 }}
              whileTap={{ scale: 0.95 }}
              className="group relative rounded-xl bg-gradient-to-r from-blue-600 to-indigo-700 px-8 py-4 font-semibold text-white shadow-lg overflow-hidden"
            >
              <span className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-500 opacity-0 transition duration-500 blur-lg group-hover:opacity-100"></span>
              <span className="relative">⚡ Ready to test your superpowers?</span>
            </motion.button>
          </Link>

          <Link to="/studentslearning">
            <motion.button
              whileHover={{ scale: 1.08 }}
              whileTap={{ scale: 0.95 }}
              className="group relative rounded-xl bg-gradient-to-r from-purple-600 to-fuchsia-700 px-8 py-4 font-semibold text-white shadow-lg overflow-hidden"
            >
              <span className="absolute inset-0 bg-gradient-to-r from-pink-500 to-orange-500 opacity-0 transition duration-500 blur-lg group-hover:opacity-100"></span>
              <span className="relative">🌍 Curious? Let’s explore together</span>
            </motion.button>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default StudentHome;
