import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar.jsx";
import Home from "./components/Home.jsx";
import Collect from "./components/Collect.jsx";
import Scan from "./components/Scan.jsx";
import Login from "./components/Login.jsx";
import Register from "./components/Register.jsx";


function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/collect" element={<Collect />} />
        <Route path="/scan" element={<Scan />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    </>
  );
}

export default App;
