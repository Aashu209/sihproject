import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";

function StudentsLearning() {
  const location = useLocation();
  const fallbackName = localStorage.getItem("studentName") || "Student";
  const studentName = location.state?.studentName || fallbackName;

  const [showConfirm, setShowConfirm] = useState(false);
  const [pendingQuizzes, setPendingQuizzes] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const quizzes = JSON.parse(localStorage.getItem("teacherQuizzes") || "[]");
    setPendingQuizzes(quizzes);
  }, []);

  const handleLogout = () => {
    setShowConfirm(false);
    navigate("/");
  };

  const activeCourses = [
    { id: 1, title: "Science", progress: 75, color: "bg-pink-500", gamePath: "/games/solarsystem" },
    { id: 2, title: "Technology", progress: 40, color: "bg-blue-500", gamePath: "/games/binaryblitz" },
    { id: 3, title: "English", progress: 10, color: "bg-purple-500", gamePath: "/games/memorymatch" },
    { id: 4, title: "Mathematics", progress: 43, color: "bg-green-500", gamePath: "/games/mathpuzzle" },
  ];

  const minProgress = 20, maxProgress = 95;
  const overallProgress = Math.floor(Math.random() * (maxProgress - minProgress + 1)) + minProgress;

  // Stars background (same as login/signup/home)
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
      <div className="relative z-20 flex-1 px-8 pt-10">
        <h2 className="mb-6 text-3xl font-bold">{studentName}'s Journey 📖</h2>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
          {/* Active Courses */}
          <div className="md:col-span-2">
            <h3 className="mb-4 text-xl font-semibold">Active Courses</h3>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
              {activeCourses.map((course) => (
                <motion.div
                  key={course.id}
                  whileHover={{ scale: 1.05 }}
                  className="rounded-xl bg-gray-800/60 p-4 shadow-lg backdrop-blur-xl border border-white/10"
                >
                  <div className="mb-3 flex h-32 items-center justify-center rounded-lg">
                    <div
                      className={`flex h-16 w-16 items-center justify-center rounded-full text-xl font-bold ${course.color}`}
                    >
                      {course.title.charAt(0)}
                    </div>
                  </div>
                  <h4 className="text-lg font-bold">{course.title}</h4>
                  <p className="text-sm">{course.progress}% Complete</p>
                  <div className="mt-2 h-2 w-full rounded-full bg-white/20">
                    <div
                      className={`h-2 rounded-full ${course.color}`}
                      style={{ width: `${course.progress}%` }}
                    />
                  </div>
                  <button
                    className="mt-3 w-full rounded-lg bg-gradient-to-r from-blue-600 to-indigo-700 py-2 font-semibold text-white hover:from-blue-700 hover:to-indigo-800 transition"
                    onClick={() => navigate(course.gamePath)}
                  >
                    Learn and Play
                  </button>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            <div className="rounded-xl bg-gray-800/60 p-4 shadow-lg backdrop-blur-xl border border-white/10">
              <h3 className="mb-3 text-lg font-semibold">Your Progress</h3>
              <div className="flex items-center justify-center">
                <div className="h-28 w-28">
                  <CircularProgressbar
                    value={overallProgress}
                    text={`${overallProgress}%`}
                    styles={buildStyles({
                      textColor: "#fff",
                      pathColor: "#facc15",
                      trailColor: "rgba(255,255,255,0.2)",
                    })}
                  />
                </div>
              </div>
              <p className="mt-3 text-center text-sm">10 Days Streak 🔥</p>
            </div>

            {/* Pending Quizzes */}
            <div className="rounded-xl bg-gray-800/60 p-4 shadow-lg backdrop-blur-xl border border-white/10">
              <h3 className="mb-3 text-lg font-semibold">Pending Quizzes</h3>
              <div className="space-y-3">
                {pendingQuizzes.length > 0 ? (
                  pendingQuizzes.map((quiz, index) => (
                    <motion.div
                      key={index}
                      whileHover={{ scale: 1.05 }}
                      className="flex items-center justify-between rounded-lg bg-white/5 p-3"
                    >
                      <div>
                        <p className="font-semibold">{quiz.title}</p>
                        <span className="text-xs opacity-75">{quiz.subject}</span>
                      </div>
                      <button
                        onClick={() => navigate("/quiz/start", { state: { quizData: quiz } })}
                        className="rounded-lg bg-green-500 px-3 py-1 text-sm hover:bg-green-600 transition"
                      >
                        Start
                      </button>
                    </motion.div>
                  ))
                ) : (
                  <p className="text-center text-sm opacity-75">No new quizzes 🎉</p>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Ticker */}
      <div className="relative z-20 bg-gradient-to-r from-yellow-400 to-orange-400 py-2 px-4 text-center font-medium text-black shadow-lg">
        🌟 Keep up the great work! New adventures await! 🚀
      </div>
    </div>
  );
}

export default StudentsLearning;

