import { Sun, Moon } from "lucide-react";
import { useTheme } from "../assets/ThemeContext";


export default function GPA() {
    const {darkMode, toggleTheme} = useTheme()
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

          <h1> GPA</h1>
          <p>Add below</p>
          </div>
  );
}