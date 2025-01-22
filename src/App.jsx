import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Admin from "./pages/Admin";
import Header from "./components/Header";
import Home from "./pages/Home";
//import About from "./pages/About";
//import Groups from "./pages/Groups";
//import Testimony from "./pages/Testimony";


const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        {/*<Route path="/about" element={<About />} />
        /*<Route path="/groups" element={<Groups />} />
        /*<Route path="/testimony" element={<Testimony />} />*/}
      </Routes>
    </Router>
  );
};

export default App;
