import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import Home from "./pages/Home"
import GPA from './pages/GPA';
import CGPA from './pages/CGPA'
import { ThemeProvider } from "./assets/ThemeContext";


export default function App() {

  return (
    <ThemeProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/gpa" element={<GPA />} />
          <Route path="/cgpa" element={<CGPA />} />
        </Routes>
      </Router>
    </ThemeProvider>
  );
}


