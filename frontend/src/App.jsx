import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import "./App.css";
import EditProject from "./components/editProject/EditProject";
import AddProject from "./components/addProject/AddProject";
import AddImg from "./components/addImg/AddImg";

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/project/:id" element={<EditProject />} />
          <Route path="/project/add" element={<AddProject />} />
          <Route path="/img/:projectId" element={<AddImg />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
