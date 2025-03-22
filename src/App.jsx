import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
//import About from "./pages/About";
//import Groups from "./pages/Groups";
import Testimony from "./pages/Testimony";
import Login from "./pages/Login.jsx";
import Dashboard from "./components/Dashboard.jsx";
import SingUp from "./components/SignUp.jsx";
//import Anamnesis from "./components/Anamnesis.jsx";
//import ProfessionalForm from "./components/ProfessionalForm.jsx";

import Profile from "./pages/Profile.jsx";
import ProfessionalForm from "./components/ProfessionalForm.jsx";
import ProfessinalSearch from "./components/ProfessionalSearch.jsx";


const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        {/*<Route path="/about" element={<About />} />
        <Route path="/groups" element={<Groups />} /> */}
        <Route path="/testimony" element={<Testimony />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SingUp />} />
        <Route path="/dashboard" element={<Dashboard />}/>
        <Route path="/professional" element={<ProfessionalForm />}/>
        <Route path="/profile" element={<Profile />}/>
        <Route path="/search" element={<ProfessinalSearch />}/>
        
      </Routes>
    </Router>
  );
};

export default App;
