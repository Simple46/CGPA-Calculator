import { useState } from "react";
import { Sun, Moon, Plus, Trash2 } from "lucide-react";
import { useTheme } from "../assets/ThemeContext";
import {motion} from 'framer-motion'

const gradePoints = {
  A: 5,
  B: 4,
  C: 3,
  D: 2,
  E: 1,
  F:0,
}



export default function GPA() {
  const { darkMode, toggleTheme } = useTheme();
  const [courses, setCourses] = useState([{ name: "", unit: "", grade: "A" }]);

  const addCourses = () => {
    setCourses([...courses, { name: "", courses: "", grade: "A" }])
  }

  const removeCourse = (index) => {
    const newCourses = courses.filter((_, i) => i !== index)
    setCourses(newCourses)
  }
    const handleChange = (index, field, value) => {
      const newCourses = [...courses]
      newCourses[index][field] = value;
      setCourses(newCourses)
    }

    const totalUnits = courses.reduce(
      (acc, c) => acc + (parseInt(c.unit) || 0), 0
    )

    const totalPoints = courses.reduce((acc, c) => acc + (gradePoints[c.grade] * parseInt(c.unit) || 0), 0)
  
    const gpa = totalUnits > 0 ? (totalPoints / totalUnits).toFixed(2) : 0

 
    return (
      <div
        className={`min-h-screen flex flex-col items-center justify-center transition-colors duration-500 ${
          darkMode ? "bg-gray-900 text-white" : "bg-gray-50 text-gray-900"
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

        <h1 className="text-2xl font-bold mt-10 mb-6 bg-gradient-to-r from-blue-500 to-blue-700 bg-clip-text text-transparent">
          {" "}
          GPA Calculator
        </h1>

        <div className="w-full max-w-2xl flex flex-col gap-4 px-4">
          {courses.map((course, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className={`flex flex-col sm:flex-grow gap-3 p-3 rounded-lg border ${
                darkMode ? "border-gray-700" : "border-gray-300"
              }`}
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

          {/* Add courses */}
          <button
            onClick={addCourses}
            className="flex items-center gap-2 px-3 py-2 rounded-lg bg-gradient-to-r from-blue-500 to-blue-700 text-white font-medium hover:scale-105 transition self-center"
          >
            <Plus className="w-5 h-5" /> Add Courses
          </button>
        </div>

        {/* Result with circle animation */}

        <div className="mt-10 flex flex-col items-center">
          <motion.svg
            width="160"
            height="160"
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
              animate={{ pathLength: gpa / 5 }}
              transition={{duration:1}}
            />

            <defs>
              <linearGradient id="blueGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#3b82f6" />
                <stop offset="100%" stopColor="#1e40af" />
                

              </linearGradient>
            </defs>
          </motion.svg>

          <motion.p
            key={gpa}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
          className="mt-4 text-2xl font-bold">
            GPA: {gpa}
          </motion.p>

        </div>
      </div>
    );
  }
