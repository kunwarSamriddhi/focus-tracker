import Dashboard from "./pages/Dashboard"
import History from "./pages/History";
import Login from "./pages/Login"
import Signup from "./pages/Signup"
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";
function App() {
  return (
    <>
      <div className="min-h-screen bg-pink-50 flex flex-col items-center p-8">

        <div className="bg-white rounded-3xl shadow-lg p-6">

          <h1 className="text-4xl font-bold text-pink-500">
            🌸 Focus Tracker 🌸
          </h1>

          <p className="text-center text-gray-500 mt-2">
            Stay focused, one session at a time ✨
          </p>

        </div>
        <div className="bg-white rounded-3xl shadow-lg p-8 mt-6 w-full max-w-2xl">
          <Router>
            <Routes>
              <Route path="/login" element={<Login />} />
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/history" element={<History />} />
              <Route path="/signup" element={<Signup />} />
            </Routes>
          </Router>
        </div>
      </div>
    </>
  )
}


export default App
