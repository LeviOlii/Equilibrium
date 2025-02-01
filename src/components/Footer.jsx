import React from "react";
import { FaInstagram, FaFacebookF, FaYoutube } from "react-icons/fa";

const Footer = () => {
    return (
        <footer className="bg-desktop-bg text-white py-20 px-8 flex justify-between items-center font-dmSans">
            <div>
                <h2 className="text-5xl pb-8">Equili<span className="font-bold">brium</span></h2>
                <p className="text-sm mt-2">©2025 - Equilibrium.</p>
                <p className="text-sm">Todos os direitos reservados.</p>
            </div>

            <div className="flex gap-6 text-xl">
                <FaInstagram />
                <FaFacebookF />
                <FaYoutube />
            </div>
        </footer>
    );
};

export default Footer;
