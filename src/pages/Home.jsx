import React, { useState } from "react";
import Header from "../components/Header";
import Hero from "../components/Hero"

const Home = () => {
    const [menuOpen, setMenuOpen] = useState(false);
    
    return (
        <>
            <Header/>
            <Hero />
        </>
    );

};

export default Home;