// src/Components/TeacherDashboard.jsx
import React, { useState } from "react";
import { motion } from "framer-motion";
import { Link, useNavigate } from "react-router-dom";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";

function TeacherDashboard() {
  const [showConfirm, setShowConfirm] = useState(false);
  const navigate = useNavigate();

  const handleLogout = () => {
    setShowConfirm(false);
    navigate("/");
  };

  // Dummy analytics
  const studentsEnrolled = 42;
  const avgPerformance = 76;
  const avgAttendance = 88;
  const avgTimeSpent = "1h 25m";

  const studentList = [
    { id: 1, name: "Ananya", performance: "82%", attendance: "90%" },
    { id: 2, name: "Rohit", performance: "74%", attendance: "85%" },
    { id: 3, name: "Sneha", performance: "69%", attendance: "80%" },
    { id: 4, name: "Aman", performance: "88%", attendance: "95%" },
  ];

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
    <div className="relative min-h-screen flex flex-col bg-gradient-to-br from-gray-950 via-gray-900 to-black text-white overflow-hidden">
      {/* Stars */}
      <div className="absolute inset-0 z-0">{stars}</div>

      {/* Navbar */}
      <nav className="relative z-20 flex items-center justify-between border-b border-white/10 bg-gray-800/60 px-6 py-4 backdrop-blur-xl shadow-md">
        <h1 className="text-2xl font-extrabold text-white tracking-wide hover:text-purple-400 transition duration-300">
          EduPlay – Teacher
        </h1>

        <ul className="flex space-x-8 font-medium">
          {[
            { name: "Home", path: "/teacherhome" },
            { name: "Create Quiz", path: "/createquiz" },
            { name: "Dashboard", path: "/teacherdashboard" },
          ].map((item, i) => (
            <li key={i}>
              <Link to={item.path} className="relative px-2 py-1 group">
                <span className="relative z-10 transition duration-300 group-hover:text-purple-400">
                  {item.name}
                </span>
                <span className="absolute left-0 bottom-0 w-0 h-0.5 bg-gradient-to-r from-purple-400 to-pink-500 transition-all duration-500 group-hover:w-full"></span>
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

      {/* Logout Popup */}
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

      {/* Dashboard Content */}
      <div className="relative z-20 flex-1 px-8 pt-20">
        <h2 className="mb-6 text-3xl font-bold">📊 Teacher Dashboard</h2>

        {/* Stats */}
        <div className="mb-8 grid grid-cols-1 gap-6 md:grid-cols-4">
          <div className="flex flex-col items-center justify-center rounded-xl bg-gray-800/60 p-6 shadow-lg backdrop-blur-xl border border-white/10">
            <h3 className="mb-2 text-lg font-semibold">👩‍🎓 Students Enrolled</h3>
            <p className="text-3xl font-bold">{studentsEnrolled}</p>
          </div>

          <div className="flex flex-col items-center rounded-xl bg-gray-800/60 p-6 shadow-lg backdrop-blur-xl border border-white/10">
            <h3 className="mb-3 text-lg font-semibold">Avg. Performance</h3>
            <div className="h-24 w-24">
              <CircularProgressbar
                value={avgPerformance}
                text={`${avgPerformance}%`}
                styles={buildStyles({
                  textColor: "#fff",
                  pathColor: "#f472b6",
                  trailColor: "rgba(255,255,255,0.2)",
                })}
              />
            </div>
          </div>

          <div className="flex flex-col items-center rounded-xl bg-gray-800/60 p-6 shadow-lg backdrop-blur-xl border border-white/10">
            <h3 className="mb-3 text-lg font-semibold">Attendance</h3>
            <div className="h-24 w-24">
              <CircularProgressbar
                value={avgAttendance}
                text={`${avgAttendance}%`}
                styles={buildStyles({
                  textColor: "#fff",
                  pathColor: "#38bdf8",
                  trailColor: "rgba(255,255,255,0.2)",
                })}
              />
            </div>
          </div>

          <div className="flex flex-col items-center justify-center rounded-xl bg-gray-800/60 p-6 shadow-lg backdrop-blur-xl border border-white/10">
            <h3 className="mb-2 text-lg font-semibold">⏱ Avg. Time Spent</h3>
            <p className="text-2xl font-bold">{avgTimeSpent}</p>
            <p className="text-sm opacity-75">per student daily</p>
          </div>
        </div>

        {/* Student List */}
        <div className="rounded-xl bg-gray-800/60 p-6 shadow-lg backdrop-blur-xl border border-white/10">
          <h3 className="mb-4 text-lg font-semibold">📋 Student Overview</h3>
          <div className="space-y-3">
            {studentList.map((s) => (
              <motion.div
                key={s.id}
                whileHover={{ scale: 1.02 }}
                className="flex items-center justify-between rounded-lg bg-white/5 p-4"
              >
                <span className="font-semibold">{s.name}</span>
                <span className="text-sm">Performance: {s.performance}</span>
                <span className="text-sm">Attendance: {s.attendance}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default TeacherDashboard;
