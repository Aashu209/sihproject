// src/Components/CreateQuiz.jsx
import React, { useState } from "react";
import { motion } from "framer-motion";
import { useNavigate, Link } from "react-router-dom";

function CreateQuiz() {
  const [quizTitle, setQuizTitle] = useState("");
  const [quizSubject, setQuizSubject] = useState("");
  const [quizDescription, setQuizDescription] = useState("");
  const [questions, setQuestions] = useState([
    { question: "", options: ["", "", "", ""], answer: "" },
  ]);
  const [showConfirm, setShowConfirm] = useState(false);

  const navigate = useNavigate();

  const handleQuestionChange = (index, value) => {
    const updated = [...questions];
    updated[index].question = value;
    setQuestions(updated);
  };

  const handleOptionChange = (qIndex, oIndex, value) => {
    const updated = [...questions];
    updated[qIndex].options[oIndex] = value;
    setQuestions(updated);
  };

  const handleAnswerChange = (qIndex, value) => {
    const updated = [...questions];
    updated[qIndex].answer = value;
    setQuestions(updated);
  };

  const addQuestion = () => {
    setQuestions([...questions, { question: "", options: ["", "", "", ""], answer: "" }]);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const quizData = { title: quizTitle, subject: quizSubject, description: quizDescription, questions };

    const existingQuizzes = JSON.parse(localStorage.getItem("teacherQuizzes") || "[]");
    existingQuizzes.push(quizData);
    localStorage.setItem("teacherQuizzes", JSON.stringify(existingQuizzes));

    alert("✅ Quiz Created Successfully!");
    setQuizTitle("");
    setQuizSubject("");
    setQuizDescription("");
    setQuestions([{ question: "", options: ["", "", "", ""], answer: "" }]);

    navigate("/teacherdashboard");
  };

  const handleLogout = () => {
    setShowConfirm(false);
    navigate("/");
  };

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

      {/* Quiz Form */}
      <motion.div
        className="relative z-20 mx-auto max-w-3xl rounded-2xl border border-white/10 bg-gray-800/60 p-8 shadow-lg backdrop-blur-xl mt-10"
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <h2 className="mb-6 text-center text-3xl font-bold">📝 Create a New Quiz</h2>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Quiz Metadata */}
          <div>
            <label className="mb-2 block text-sm font-semibold">Quiz Title</label>
            <input
              type="text"
              required
              value={quizTitle}
              onChange={(e) => setQuizTitle(e.target.value)}
              className="w-full rounded-md border border-white/20 bg-white/10 p-3 text-white placeholder-gray-300 focus:ring-2 focus:ring-purple-400"
              placeholder="Enter quiz title"
            />
          </div>

          <div>
            <label className="mb-2 block text-sm font-semibold">Subject</label>
            <input
              type="text"
              required
              value={quizSubject}
              onChange={(e) => setQuizSubject(e.target.value)}
              className="w-full rounded-md border border-white/20 bg-white/10 p-3 text-white placeholder-gray-300 focus:ring-2 focus:ring-purple-400"
              placeholder="e.g., Science, Math"
            />
          </div>

          <div>
            <label className="mb-2 block text-sm font-semibold">Description</label>
            <textarea
              required
              value={quizDescription}
              onChange={(e) => setQuizDescription(e.target.value)}
              className="w-full rounded-md border border-white/20 bg-white/10 p-3 text-white placeholder-gray-300 focus:ring-2 focus:ring-purple-400"
              placeholder="A brief description of the quiz"
            ></textarea>
          </div>

          {/* Questions */}
          {questions.map((q, qIndex) => (
            <div
              key={qIndex}
              className="space-y-3 rounded-xl border border-white/20 bg-white/5 p-4"
            >
              <label className="block text-sm font-semibold">
                Question {qIndex + 1}
              </label>
              <input
                type="text"
                required
                value={q.question}
                onChange={(e) => handleQuestionChange(qIndex, e.target.value)}
                className="w-full rounded-md border border-white/20 bg-white/10 p-3 text-white placeholder-gray-300 focus:ring-2 focus:ring-purple-400"
                placeholder="Enter your question"
              />

              {q.options.map((opt, oIndex) => (
                <div key={oIndex} className="flex items-center space-x-3">
                  <input
                    type="text"
                    required
                    value={opt}
                    onChange={(e) => handleOptionChange(qIndex, oIndex, e.target.value)}
                    className="flex-1 rounded-md border border-white/20 bg-white/10 p-3 text-white placeholder-gray-300 focus:ring-2 focus:ring-purple-400"
                    placeholder={`Option ${oIndex + 1}`}
                  />
                </div>
              ))}

              <div>
                <label className="mt-2 block text-sm font-semibold">Correct Answer</label>
                <select
                  required
                  value={q.answer}
                  onChange={(e) => handleAnswerChange(qIndex, e.target.value)}
                  className="w-full rounded-md border border-white/20 bg-white/10 p-2 text-white focus:ring-2 focus:ring-green-400"
                >
                  <option value="">Select correct option</option>
                  {q.options.map((opt, i) => (
                    <option key={i} value={opt} className="text-black">
                      {opt || `Option ${i + 1}`}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          ))}

          {/* Add Question */}
          <button
            type="button"
            onClick={addQuestion}
            className="w-full rounded-md bg-gradient-to-r from-yellow-500 to-orange-500 py-3 font-bold text-white transition hover:scale-105"
          >
            ➕ Add Another Question
          </button>

          {/* Save Quiz */}
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            type="submit"
            className="w-full rounded-md bg-gradient-to-r from-green-500 to-blue-600 py-3 font-bold text-white transition hover:scale-105"
          >
            ✅ Save Quiz
          </motion.button>
        </form>
      </motion.div>
    </div>
  );
}

export default CreateQuiz;
