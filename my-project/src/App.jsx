import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import Register from "./pages/Register";
import Login from "./pages/Login";
import AdminPanel from "./pages/Adminpannel";
import Navbar from "./pages/Navbar";
import ProtectedRoute from "./ProtectedRoute"
import Layout from './Layout'

function App() {
  return (
    <div className="app-container">
      {/* <Navbar /> */}
      <Routes>
        <Route path="/" element={<Layout />}></Route>
        {/* Protected regular user route */}
        <Route path="/dashboard" element={
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        } />
        
        {/* Protected admin route */}
        <Route path="/admin" element={
          <ProtectedRoute adminOnly={true}>
            <AdminPanel />
          </ProtectedRoute>
        } />

        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </div>
  );
}

export default App;
