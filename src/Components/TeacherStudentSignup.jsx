// src/Components/TeacherStudentSignup.jsx
import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";

// Animation variants
const containerVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { delayChildren: 0.2, staggerChildren: 0.1 },
  },
};
const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

function TeacherStudentSignup() {
  const navigate = useNavigate();
  const [role, setRole] = useState("student");
  const [error, setError] = useState("");

  // Stars background (same as LogIn.jsx)
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

  // Handle Submit
  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");
    const form = e.target;

    const name = form.name.value;
    const password = form.password.value;
    const confirmPassword = form.confirmPassword.value;

    if (password !== confirmPassword) {
      setError("Passwords do not match!");
      return;
    }

    if (role === "student") {
      const roll = form.roll.value;
      const studentClass = form.class.value;
      const email = form.email.value;

      const studentUser = { name, roll, class: studentClass, email, password };
      localStorage.setItem("studentUser", JSON.stringify(studentUser));
      localStorage.setItem("studentName", name);

      navigate("/studenthome", { state: { studentName: name } });
    } else {
      const subject = form.subject.value;
      const teacherID = form.teacherID.value;

      const teacherUser = { name, subject, teacherID, password };
      localStorage.setItem("teacherUser", JSON.stringify(teacherUser));
      localStorage.setItem("teacherName", name);

      navigate("/teacherhome", { state: { teacherName: name } });
    }
  };

  return (
    <div className="relative flex min-h-screen items-center justify-center overflow-hidden bg-gradient-to-br from-gray-950 via-gray-900 to-black p-4">
      {/* Stars */}
      <div className="absolute inset-0 z-0">{stars}</div>

      {/* Signup Card - same design as LogIn.jsx */}
      <motion.div
        className="relative z-10 w-full max-w-md overflow-hidden rounded-3xl bg-gray-800/60 p-8 shadow-2xl backdrop-blur-xl transition-all duration-500 ease-in-out sm:p-10"
        initial="hidden"
        animate="visible"
        variants={containerVariants}
      >
        <motion.h2
          variants={itemVariants}
          className="mb-2 text-center text-4xl font-extrabold text-white"
        >
          {role === "student" ? "Student Sign Up ✨" : "Teacher Sign Up 👩‍🏫"}
        </motion.h2>
        <motion.p
          variants={itemVariants}
          className="mb-8 text-center text-gray-400"
        >
          Create your account
        </motion.p>

        {/* Role Switch (same pill as login) */}
        <motion.div
          variants={itemVariants}
          className="relative mb-6 flex rounded-full bg-gray-700/50 p-1"
        >
          <motion.div
            className={`absolute left-0 top-0 h-full w-1/2 rounded-full bg-gradient-to-r ${
              role === "student"
                ? "from-blue-600 to-indigo-700"
                : "from-purple-600 to-fuchsia-700"
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
              role === "student"
                ? "text-white"
                : "text-gray-300 hover:text-white/80"
            }`}
          >
            Student
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setRole("teacher")}
            className={`relative z-10 flex-1 rounded-full px-4 py-2 font-semibold transition-colors duration-300 ${
              role === "teacher"
                ? "text-white"
                : "text-gray-300 hover:text-white/80"
            }`}
          >
            Teacher
          </motion.button>
        </motion.div>

        {/* Form */}
        <form className="space-y-6" onSubmit={handleSubmit}>
          {/* Common Name */}
          <motion.div variants={itemVariants}>
            <label className="mb-2 block text-sm font-medium text-gray-300">
              Name
            </label>
            <motion.input
              type="text"
              name="name"
              required
              className="w-full rounded-md border border-transparent bg-gray-700/50 p-3 text-white placeholder-gray-500 transition-colors duration-300 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter your name"
            />
          </motion.div>

          {/* Student Fields */}
          {role === "student" && (
            <>
              <motion.div variants={itemVariants}>
                <label className="mb-2 block text-sm font-medium text-gray-300">
                  Roll No
                </label>
                <motion.input
                  type="text"
                  name="roll"
                  required
                  className="w-full rounded-md border border-transparent bg-gray-700/50 p-3 text-white placeholder-gray-500 transition-colors duration-300 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter your roll number"
                />
              </motion.div>
              <motion.div variants={itemVariants}>
                <label className="mb-2 block text-sm font-medium text-gray-300">
                  Class
                </label>
                <select
                  name="class"
                  required
                  className="w-full rounded-md border border-transparent bg-gray-700/50 p-3 text-white focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="">Select your class</option>
                  {[6, 7, 8, 9, 10, 11, 12].map((cls) => (
                    <option key={cls} value={cls} className="text-black">
                      {`Class ${cls}`}
                    </option>
                  ))}
                </select>
              </motion.div>
              <motion.div variants={itemVariants}>
                <label className="mb-2 block text-sm font-medium text-gray-300">
                  Email
                </label>
                <motion.input
                  type="email"
                  name="email"
                  required
                  className="w-full rounded-md border border-transparent bg-gray-700/50 p-3 text-white placeholder-gray-500 transition-colors duration-300 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="you@example.com"
                />
              </motion.div>
            </>
          )}

          {/* Teacher Fields */}
          {role === "teacher" && (
            <>
              <motion.div variants={itemVariants}>
                <label className="mb-2 block text-sm font-medium text-gray-300">
                  Subject
                </label>
                <motion.input
                  type="text"
                  name="subject"
                  required
                  className="w-full rounded-md border border-transparent bg-gray-700/50 p-3 text-white placeholder-gray-500 transition-colors duration-300 focus:border-purple-500 focus:outline-none focus:ring-2 focus:ring-purple-500"
                  placeholder="Enter subject"
                />
              </motion.div>
              <motion.div variants={itemVariants}>
                <label className="mb-2 block text-sm font-medium text-gray-300">
                  Teacher ID
                </label>
                <motion.input
                  type="text"
                  name="teacherID"
                  required
                  className="w-full rounded-md border border-transparent bg-gray-700/50 p-3 text-white placeholder-gray-500 transition-colors duration-300 focus:border-purple-500 focus:outline-none focus:ring-2 focus:ring-purple-500"
                  placeholder="Enter your Teacher ID"
                />
              </motion.div>
            </>
          )}

          {/* Password */}
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
            />
          </motion.div>

          {/* Confirm Password */}
          <motion.div variants={itemVariants}>
            <label className="mb-2 block text-sm font-medium text-gray-300">
              Confirm Password
            </label>
            <motion.input
              type="password"
              name="confirmPassword"
              required
              className="w-full rounded-md border border-transparent bg-gray-700/50 p-3 text-white placeholder-gray-500 transition-colors duration-300 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="••••••••"
            />
          </motion.div>

          {/* Error Message */}
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

          {/* Submit */}
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
            Sign Up
          </motion.button>
        </form>

        {/* Already have account link */}
        <motion.div
          variants={itemVariants}
          className="mt-6 flex justify-center"
        >
          <motion.button
            type="button"
            onClick={() => navigate("/")}
            className="text-sm font-medium text-gray-400 transition-colors duration-300 hover:text-blue-400 hover:underline"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Already have an account? Log In
          </motion.button>
        </motion.div>
      </motion.div>
    </div>
  );
}

export default TeacherStudentSignup;

