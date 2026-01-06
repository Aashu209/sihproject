import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./Components/Navbar";
//Login
import LogIn from "./Components/Login";
//Signup
import TeacherStudentSignup from "./Components/TeacherStudentSignup";
//Student sections
import StudentHome from "./Components/StudentHome";
import StudentsLearning from "./Components/StudentsLearning";
import Quiz from "./Components/Quiz";
import Dashboard from "./Components/Dashboard";
import QuizPlay from "./Components/QuizPlay";
//Teacher Section
import TeacherHome from "./Components/TeacherHome";
import CreateQuiz from "./Components/CreateQuiz";
import TeacherDashboard from "./Components/TeacherDashboard";
import QuizTaker from "./Components/QuizTaker";
//QUizs
import MathPuzzle from "./Components/Games/MathPuzzle";
import MemoryMatch from "./Components/Games/MemoryMatch";
import SolarSystem from "./Components/Games/SolarSystem";
import BinaryBlitz from "./Components/Games/BinaryBlitz";

// TeacherSignup will be added later

function App() {
  return (
    <Router>
      <Navbar/>
      <Routes>
        {/* Default Login */}
        <Route path="/" element={<LogIn />} />

        {/*  SignUp */}
        <Route path="/signup" element={<TeacherStudentSignup />} />

        {/* Student FUntionality */}
        <Route path="/studenthome" element={<StudentHome />}/>
        <Route path="/studentslearning" element={<StudentsLearning />}/>
        <Route path="/quiz" element={<Quiz />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/quiz/:subject" element={<QuizPlay />} />

        {/* Teacher FUntionality */}
        <Route path="/teacherhome" element={<TeacherHome />}/>
        <Route path="/createquiz" element={<CreateQuiz />}/>
        <Route path="/teacherdashboard" element={<TeacherDashboard />}/>
        <Route path="/quiz/start" element={<QuizTaker />}/>

        
        {/* Games Routes */}
        <Route path="/games/mathpuzzle" element={<MathPuzzle />} />
        <Route path="/games/memorymatch" element={<MemoryMatch />} />
        <Route path="/games/solarsystem" element={<SolarSystem />} />
        <Route path="/games/binaryblitz" element={<BinaryBlitz />} />
      </Routes>
    </Router>
  );
}

export default App;


