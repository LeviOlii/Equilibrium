import React, {useState} from "react";
import {Link} from 'react-router-dom';

const Hero = () => {
    const [menuOpen, setMenuOpen] = useState(false);

    return (
        <section className="h-hero-desktop bg-mobile-bg w-full flex font-dmSans">
            <div className="p-16 h-80 w-hero-texts-width mx-10">
                <p className="text-desktop-bg font-bold tracking-wider">BOAS-VINDAS A EQUILIBRIUM 👋</p>
                <p className="py-4 text-hero-bigger-paragraph leading-hero-bigger-paragraph text-gray-headline font-bold tracking-wide">Assistência psicológica simplificada para todos</p>
                <p className="text-base tracking-wide">Conectamos profissionais de saúde mental a quem mais precisa, tornando a assistência psicológica acessível para todos</p>
                
                <div className="py-12 ">
                    <Link to="/login">
                        <button className="hidden md:block bg-desktop-bg border-2 text-white border-white px-6 py-2 rounded-full hover:bg-brand-green-hover hover:text-brand-green transition"
                        >
                        BUSQUE AJUDA
                        </button>
                    </Link>
                </div>
            </div>
        </section>
        
    );
};

export default Hero;