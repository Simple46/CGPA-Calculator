import { useState } from "react";
import { Sun, Moon, Plus, Trash2 } from "lucide-react";
import { useTheme } from "../assets/ThemeContext";
import { motion } from 'framer-motion'
import Image from "./Image";
import { Link } from "react-router-dom";


const gradePoints = {
  A: 5,
  B: 4,
  C: 3,
  D: 2,
  E: 1,
  F: 0,
};


export default function CGPA() {
  const { darkMode, toggleTheme } = useTheme()
  
  const [prevGpa, setPrevGpa] = useState("")
  const [prevUnits, setPrevUnits] = useState("")

  const [courses, setCourses] = useState([{ name: "", unit: "", grade: "A" }])
  
  const addCourses = () => {
    setCourses([...courses, { name: "", courses: "", grade: "A" }]);
  };

  const removeCourse = (index) => {
    const newCourses = courses.filter((_, i) => i !== index);
    setCourses(newCourses);
  };

  const handleChange = (index, field, value) => {
    const newCourses = [...courses];
    newCourses[index][field] = value;
    setCourses(newCourses);
  };

  const currentUnits = courses.reduce((acc, c) => acc + (parseInt(c.unit) || 0), 0)
  
  const currentPoints = courses.reduce((acc, c) => acc + (gradePoints[c.grade] * (parseInt(c.unit) || 0)), 0)
  
  const currentGpa = currentUnits > 0 ? (currentPoints / currentUnits).toFixed(2) : 0;

  const totalUnits = (parseInt(prevUnits) || 0) + currentUnits;
  const totalPoints = (parseFloat(prevGpa) || 0) * (parseInt(prevUnits) || 0) + currentPoints
  
  const cgpa = totalUnits > 0 ? (totalPoints / totalUnits).toFixed(2) : 0;
  
  return (
    <div
      className={`min-h-screen flex flex-col items-center justify-center transition-colors duration-500 ${
        darkMode ? "bg-gray-900 text-white" : "bg-gray-100 text-gray-900"
      } `}
    >
      <button
        onClick={toggleTheme}
        className="absolute top-5 right-5 p-2 rounded-full transition hover:scale-110"
      >
        {darkMode ? (
          <Sun className="w-6 h-6 text-yellow-400" />
        ) : (
          <Moon className="w-6 h-6 text-blue-600" />
        )}
      </button>
      <Link to="/">

      <Image className="absolute top-2 left-2 w-20 transition "/>
      </Link>
      

      <h1 className="text-2xl font-bold mt-10 mb-6 bg-gradient-to-r from-blue-500 to-blue-700 bg-clip-text text-transparent">
        CGPA Calculator
      </h1>

      <div className="w-full max-w-2xl px-4 mb-8 ">
        <h2 className="mb-3 text-lg font-medium">Previous Academic Record</h2>
        <div className="flex flex-col sm:flex-row gap-4">
          <input
            type="number"
            placeholder="Previous GPA"
            value={prevGpa}
            onChange={(e) => setPrevGpa(e.target.value)}
            className={`flex-1 px-3 py-2 rounded-md outline-none ${
              darkMode ? "bg-gray-800 text-white" : "bg-white text-gray-900"
            }`}
          />

          <input
            type="number"
            placeholder="Previous Total Units"
            value={prevUnits}
            onChange={(e) => setPrevUnits(e.target.value)}
            className={`flex-1 px-3 py-2 rounded-md outline-none ${
              darkMode ? "bg-gray-800 text-white" : "bg-white text-gray-900"
            }`}
          />
        </div>
      </div>

      {/* Current Courses  */}
      <div className="w-full max-w-2xl flex flex-col gap-4 px-4">
        {courses.map((course, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className={`flex flex-col sm:flex-row gap-3 p-3 rounded-lg border ${
              darkMode ? "border-gray-700" : "border-gray-300"
            } `}
          >
            <input
              type="text"
              placeholder="Course Name"
              value={course.name}
              onChange={(e) => handleChange(index, "name", e.target.value)}
              className={`flex-1 px-3 py-2 rounded-md outline-none ${
                darkMode ? "bg-gray-800 text-white" : "bg-white text-gray-900"
              }`}
            />

            <input
              type="number"
              placeholder="Unit"
              value={course.unit}
              max={3}
              min={0}
              onChange={(e) => handleChange(index, "unit", e.target.value)}
              className={`flex-1 px-3 py-2 rounded-md outline-none ${
                darkMode ? "bg-gray-800 text-white" : "bg-white text-gray-900"
              }`}
            />

            <select
              value={course.grade}
              onChange={(e) => handleChange(index, "grade", e.target.value)}
              className={`w-24 px-3 py-2 rounded-md outline-none ${
                darkMode ? "bg-gray-800 text-white" : "bg-white text-gray-900"
              } `}
            >
              {Object.keys(gradePoints).map((g) => (
                <option key={g} value={g}>
                  {g}
                </option>
              ))}
            </select>

            {courses.length > 1 && (
              <button
                onClick={() => removeCourse(index)}
                className="text-red-500 hover:text-red-600 transition"
              >
                <Trash2 className="w-5 h-5" />
              </button>
            )}
          </motion.div>
        ))}

        <button
          onClick={addCourses}
          className="flex items-center gap-2 px-3 py-2 rounded-lg bg-gradient-to-r from-blue-500 to-blue-700 text-white font-medium hover:scale-105 transition self-center"
        >
          <Plus className="w-5 h-5" /> Add Course
        </button>
      </div>

      {/* GPA + CGPA Result  */}
      <div className="mt-10 flex flex-col items-center gap-6">
        <div className="flex flex-col items-center">
          <motion.svg
            width="140"
            height="140"
            viewBox="0 0 160 160"
            className="rotate-[-90deg]"
          >
            <circle
              cx="80"
              cy="80"
              r="70"
              stroke={darkMode ? "#374151" : "#e5e7eb"}
              strokeWidth="12"
              fill="none"
            />
            <motion.circle
              cx="80"
              cy="80"
              r="70"
              stroke="url(#blueGradient)"
              strokeWidth="12"
              fill="none"
              strokeLinecap="round"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: currentGpa / 5 }}
              transition={{ duration: 1 }}
            />
            <defs>
              <linearGradient
                id="blueGradient"
                x1="0%"
                y1="0%"
                x2="100%"
                y2="0%"
              >
                <stop offset="0%" stopColor="#3b82f6" />
                <stop offset="100%" stopColor="#1e40af" />
              </linearGradient>
            </defs>
          </motion.svg>
          <motion.p
            key={currentGpa}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="mt-4 text-2xl font-bold"
          >
            Current GPA : {currentGpa}
          </motion.p>
        </div>

        {/* CGPA circle  */}
        <div className="flex flex-col items-center">
          <motion.svg
            width="140"
            height="140"
            viewBox="0 0 160 160"
            className="rotate-[-90deg]"
          >
            <circle
              cx="80"
              cy="80"
              r="70"
              stroke={darkMode ? "#374151" : "#e5e7eb"}
              strokeWidth="12"
              fill="none"
            />
            <motion.circle
              cx="80"
              cy="80"
              r="70"
              stroke="url(#blueGradient)"
              strokeWidth="12"
              fill="none"
              strokeLinecap="round"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: cgpa / 5 }}
              transition={{ duration: 1 }}
            />
          </motion.svg>
          <motion.p
            key={cgpa}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="mt-4 text-2xl font-bold"
          >
            CGPA : {cgpa}
          </motion.p>
        </div>
      </div>
    </div>
  );
}
