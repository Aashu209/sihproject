// LogIn.jsx
import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";

// Animation variants for staggered appearance
const containerVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      delayChildren: 0.2,
      staggerChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

function LogIn() {
  const navigate = useNavigate();
  const [role, setRole] = useState("student"); // Track current role
  const [error, setError] = useState(""); // error message

  // Create an array of stars for the background
  const stars = [...Array(100)].map((_, i) => {
    const randomX = Math.random() * 100;
    const randomY = Math.random() * 100;
    // Increased size range for stars
    const size = Math.random() * 3 + 1; // Stars will now range from 1px to 4px
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

  const handleLogin = (e) => {
    e.preventDefault();
    setError(""); // clear previous error

    const enteredID = e.target.id.value; // for both email or TeacherID
    const enteredPassword = e.target.password.value;

    if (role === "student") {
      const storedUser = JSON.parse(localStorage.getItem("studentUser"));

      if (!storedUser) {
        setError("No student account found. Please sign up first.");
        return;
      }

      if (enteredID === storedUser.email && enteredPassword === storedUser.password) {
        localStorage.setItem("studentName", storedUser.name); // keep name
        navigate("/studenthome", { state: { studentName: storedUser.name } });
      } else {
        setError("Invalid email or password");
      }
    } else {
      // Teacher login (using TeacherID + password)
      const storedTeacher = JSON.parse(localStorage.getItem("teacherUser"));

      if (!storedTeacher) {
        setError("No teacher account found. Please sign up first.");
        return;
      }

      if (enteredID === storedTeacher.teacherID && enteredPassword === storedTeacher.password) {
        localStorage.setItem("teacherName", storedTeacher.name);
        navigate("/teacherhome", { state: { teacherName: storedTeacher.name } });
      } else {
        setError("Invalid TeacherID or password");
      }
    }
  };

  return (
    <div className="relative flex min-h-screen items-center justify-center overflow-hidden bg-gradient-to-br from-gray-950 via-gray-900 to-black p-4">
      {/* Stars Background */}
      <div className="absolute inset-0 z-0">{stars}</div>

      {/* Login Card - Do not change this, as per user's request */}
      <motion.div
        className="relative z-10 w-full max-w-md overflow-hidden rounded-3xl bg-gray-800/60 p-8 shadow-2xl backdrop-blur-xl transition-all duration-500 ease-in-out sm:p-10"
        initial="hidden"
        animate="visible"
        variants={containerVariants}
      >
        <motion.h2 variants={itemVariants} className="mb-2 text-center text-4xl font-extrabold text-white">
          Welcome Back ✨
        </motion.h2>
        <motion.p variants={itemVariants} className="mb-8 text-center text-gray-400">
          Please log in to your account
        </motion.p>

        {/* Role Switch */}
        <motion.div variants={itemVariants} className="relative mb-6 flex rounded-full bg-gray-700/50 p-1">
          <motion.div
            className={`absolute left-0 top-0 h-full w-1/2 rounded-full bg-gradient-to-r ${
              role === "student" ? "from-blue-600 to-indigo-700" : "from-purple-600 to-fuchsia-700"
            }`}
            layoutId="role-pill"
            transition={{ type: "spring", stiffness: 500, damping: 30 }}
            animate={{ x: role === "student" ? "0%" : "100%" }}
          />
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setRole("student")}
            className={`relative z-10 flex-1 rounded-full px-4 py-2 font-semibold transition-colors duration-300 ${
              role === "student" ? "text-white" : "text-gray-300 hover:text-white/80"
            }`}
          >
            Student
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setRole("teacher")}
            className={`relative z-10 flex-1 rounded-full px-4 py-2 font-semibold transition-colors duration-300 ${
              role === "teacher" ? "text-white" : "text-gray-300 hover:text-white/80"
            }`}
          >
            Teacher
          </motion.button>
        </motion.div>

        {/* Form */}
        <form className="space-y-6" onSubmit={handleLogin}>
          <motion.div variants={itemVariants}>
            <label className="mb-2 block text-sm font-medium text-gray-300">
              {role === "student" ? "Email Address" : "Teacher ID"}
            </label>
            <motion.input
              type={role === "student" ? "email" : "text"}
              name="id"
              required
              className="w-full rounded-md border border-transparent bg-gray-700/50 p-3 text-white placeholder-gray-500 transition-colors duration-300 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder={
                role === "student" ? "you@example.com" : "Enter your Teacher ID"
              }
              whileFocus={{ scale: 1.01, boxShadow: "0 0 0 2px rgba(59,130,246,0.5)" }}
              whileHover={{ borderColor: "rgba(107,114,128,0.5)" }}
            />
          </motion.div>
          <motion.div variants={itemVariants}>
            <label className="mb-2 block text-sm font-medium text-gray-300">
              Password
            </label>
            <motion.input
              type="password"
              name="password"
              required
              className="w-full rounded-md border border-transparent bg-gray-700/50 p-3 text-white placeholder-gray-500 transition-colors duration-300 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="••••••••"
              whileFocus={{ scale: 1.01, boxShadow: "0 0 0 2px rgba(59,130,246,0.5)" }}
              whileHover={{ borderColor: "rgba(107,114,128,0.5)" }}
            />
          </motion.div>

          <AnimatePresence>
            {error && (
              <motion.p
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.3 }}
                className="text-sm font-medium text-red-400"
              >
                {error}
              </motion.p>
            )}
          </AnimatePresence>

          <motion.button
            variants={itemVariants}
            whileHover={{ scale: 1.02, boxShadow: "0 0 15px rgba(59,130,246,0.4)" }}
            whileTap={{ scale: 0.98 }}
            type="submit"
            className={`w-full rounded-lg py-3 font-bold transition-all duration-300 ${
              role === "student"
                ? "bg-gradient-to-r from-blue-600 to-indigo-700 text-white hover:from-blue-700 hover:to-indigo-800"
                : "bg-gradient-to-r from-purple-600 to-fuchsia-700 text-white hover:from-purple-700 hover:to-fuchsia-800"
            }`}
          >
            Log In
          </motion.button>
        </form>

        <motion.div variants={itemVariants} className="mt-6 flex flex-col items-center space-y-3 sm:flex-row sm:justify-between sm:space-y-0">
          <motion.button
            type="button"
            onClick={() => navigate("/signup")}
            className="text-sm font-medium text-gray-400 transition-colors duration-300 hover:text-blue-400 hover:underline"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Don’t have an account? Sign Up
          </motion.button>
          <motion.button
            type="button"
            className="text-sm font-medium text-gray-400 transition-colors duration-300 hover:text-blue-400 hover:underline"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Forgot Password?
          </motion.button>
        </motion.div>
      </motion.div>
    </div>
  );
}

export default LogIn;