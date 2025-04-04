import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./pages/Home.jsx";
// import About from "./pages/About";
// import Groups from "./pages/Groups";
import Login from "./pages/Login.jsx";
import Dashboard from "./components/Dashboard.jsx";
import SignUp from "./components/SignUp.jsx";
import Profile from "./pages/Profile.jsx";
import ProfessionalForm from "./components/ProfessionalForm.jsx";
import ProfessionalSearch from "./components/ProfessionalSearch.jsx";
import Testimony from "./pages/Testimony.jsx";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        {/* <Route path="/about" element={<About />} />
        <Route path="/groups" element={<Groups />} /> */} 
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/professional" element={<ProfessionalForm />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/profile/:id" element={<Profile />} />
        <Route path="/search" element={<ProfessionalSearch />} />
        <Route path="/testimony" element={<Testimony />} />

      </Routes>
    </Router>
  );
};

export default App;
