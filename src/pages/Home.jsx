import React, { useState } from "react";
import Header from "../components/Header";

const Home = () => {
    const [menuOpen, setMenuOpen] = useState(false);
    
    return (
        <>
            <Header/>
        </>
    );

};

export default Home;