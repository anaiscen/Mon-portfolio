import { Route, Routes, Navigate } from "react-router-dom";
import { useState } from "react";
import UserProvider from "./context/UserContext";
import Login from "./components/login/Login";
import Home from "./pages/Home";
import "./App.css";
import EditProject from "./components/editProject/EditProject";
import AddProject from "./components/addProject/AddProject";
import AddImg from "./components/addImg/AddImg";
import Navbar from "./components/nabvar/Navbar";
import AdminPage from "./pages/AdminPage";

function App() {
  const [loggedIn, setLoggedIn] = useState(false);

  const handleLogin = () => {
    setLoggedIn(true);
  };

  return (
    <div className="App">
      <UserProvider>
        {loggedIn ? (
          <div>
            <Navbar />
            <Routes>
              <Route path="/admin" element={<AdminPage />} />
              <Route path="/project/:id" element={<EditProject />} />
              <Route path="/project/add" element={<AddProject />} />
              <Route path="/img/:projectId" element={<AddImg />} />
            </Routes>
          </div>
        ) : (
          <Routes>
            <Route
              path="/login"
              element={<Login handleLogin={handleLogin} />}
            />
            <Route path="/" element={<Home />} />
            <Route path="/project/:id" element={<EditProject />} />
            <Route path="/project/add" element={<AddProject />} />
            <Route path="/img/:projectId" element={<AddImg />} />
            <Route path="*" element={<Navigate to="/" />} />
          </Routes>
        )}
      </UserProvider>
    </div>
  );
}

export default App;
