// import { useState } from 'react'
import { motion } from 'framer-motion'
import { Sun, Moon } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import { useTheme } from '../assets/ThemeContext';
import Image from './Image';



export default function Home() {
  const { darkMode, toggleTheme } = useTheme();
    const navigate = useNavigate();
    
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
      <Image className="w-40 transition" />

      <motion.h1
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-3xl font-bold mb-12 bg-gradient-to-r from-blue-500 to-blue-700 bg-clip-text text-transparent"
      >
        GPA & CGPA Calculator
      </motion.h1>

      <div className="flex gap-6 items-center justify-center flex-col sm:flex-row w-3/4 max-w-md">
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => navigate("/gpa")}
          className="w-full p-3 rounded-lg text-lg font-semibold text-white bg-gradient-to-r  from-blue-500 to-blue-700 transition-transform "
        >
          GPA Calculator
        </motion.button>

        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => navigate("/cgpa")}
          className="w-full p-3 rounded-lg text-lg font-semibold text-white bg-gradient-to-r from-blue-500 to-blue-700 transition-transform "
        >
          CGPA Calculator
        </motion.button>
      </div>
      <p
        className={`absolute bottom-3 ${
          darkMode ? "text-gray-400" : "text-gray-600"
        } `}
      >
        Developed By Hissa, FUHSI 400L ITH Student
      </p>
    </div>
  );
}
