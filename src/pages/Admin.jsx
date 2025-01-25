import React, { useState } from "react";
import Header from "../components/Header";
import Dashboard from "../components/Dashboard";

const Admin = () => {
    const [menuOpen, setMenuOpen] = useState(false);
    
    return (
        <>
            <Header/>
            <Dashboard/>
        </>
    );

};

export default Admin;