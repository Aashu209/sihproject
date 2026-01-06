import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';

function QuizTaker() {
  const location = useLocation();
  const navigate = useNavigate();
  const quizData = location.state?.quizData;

  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [score, setScore] = useState(0);
  const [showResult, setShowResult] = useState(false);
  const [message, setMessage] = useState('');

  if (!quizData || !quizData.questions) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-indigo-950 via-purple-900 to-indigo-950 text-white p-6">
        <h1 className="text-3xl font-bold">Quiz not found!</h1>
        <button
          onClick={() => navigate('/studentslearning')}
          className="mt-6 px-6 py-2 bg-blue-500 rounded-lg hover:bg-blue-600 transition"
        >
          Back to Learning
        </button>
      </div>
    );
  }

  const currentQuestion = quizData.questions[currentQuestionIndex];

  const handleAnswerSelect = (option) => {
    setSelectedAnswer(option);
  };

  const handleNextQuestion = () => {
    const isCorrect = selectedAnswer === currentQuestion.answer;
    if (isCorrect) {
      setScore(score + 10);
      setMessage("✅ Correct!");
    } else {
      setMessage(`❌ Wrong! The correct answer was: ${currentQuestion.answer}`);
    }

    setShowResult(true);

    setTimeout(() => {
      setShowResult(false);
      setSelectedAnswer(null);
      if (currentQuestionIndex < quizData.questions.length - 1) {
        setCurrentQuestionIndex(currentQuestionIndex + 1);
      } else {
        // Quiz is over
        setMessage(`Quiz finished! Your final score is: ${score + (isCorrect ? 10 : 0)}`);
        // Navigate back to the learning page after a final message
        setTimeout(() => {
          navigate('/studentslearning');
        }, 3000);
      }
    }, 1500);
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-indigo-950 via-purple-900 to-indigo-950 text-white p-6">
      <div className="w-full max-w-2xl bg-white/10 p-8 rounded-xl shadow-lg backdrop-blur-lg">
        <h1 className="text-3xl font-bold mb-4">{quizData.title}</h1>
        <p className="text-lg opacity-80 mb-6">Question {currentQuestionIndex + 1} of {quizData.questions.length}</p>

        <AnimatePresence mode="wait">
          <motion.div
            key={currentQuestionIndex}
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 50 }}
            transition={{ duration: 0.5 }}
          >
            <p className="text-xl font-semibold mb-4">{currentQuestion.question}</p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {currentQuestion.options.map((option, index) => (
                <motion.button
                  key={index}
                  onClick={() => handleAnswerSelect(option)}
                  className={`p-4 rounded-lg transition-colors
                    ${selectedAnswer === option ? 'bg-indigo-600' : 'bg-gray-700 hover:bg-gray-600'}
                  `}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  {option}
                </motion.button>
              ))}
            </div>
            <button
              onClick={handleNextQuestion}
              disabled={!selectedAnswer}
              className={`mt-6 w-full py-3 rounded-lg font-bold transition
                ${!selectedAnswer ? 'bg-gray-500 cursor-not-allowed' : 'bg-green-600 hover:bg-green-700'}
              `}
            >
              Submit Answer
            </button>
          </motion.div>
        </AnimatePresence>
      </div>

      <AnimatePresence>
        {showResult && (
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className={`mt-6 text-xl font-bold ${message.includes('Correct') ? 'text-green-400' : 'text-red-400'}`}
          >
            {message}
          </motion.p>
        )}
      </AnimatePresence>
    </div>
  );
}

export default QuizTaker;