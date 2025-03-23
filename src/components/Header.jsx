import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars } from "@fortawesome/free-solid-svg-icons";
import { useEffect } from "react"; 
import axios from "axios";
import { checkAuthAndRedirect } from "../../backend/src/auth/authUtil";

const Header = ({renderButtons = true}) => {
    const [menuOpen, setMenuOpen] = useState(false);
    const [isLogged, setLoggedIn] = useState(false);
    const navigate = useNavigate();

    const scrollToSection = (id) => {
        const section = document.getElementById(id);
        if (section) {
            section.scrollIntoView({ behavior: "smooth" });
        }
    };

    const handleLogout = async () => {
        try {
          await axios.post("http://localhost:3000/api/logout", {}, { withCredentials: true }); 
          navigate("/"); 
        } catch (err) {
          console.error("Erro ao fazer logout:", err);
        }
      };

    useEffect(() => {
        const checkAuth = async () => {
        try {
            const res = await axios.get("http://localhost:3000/api/check-auth", {
            withCredentials: true,
            });

            if (res.data.isLoggedIn) {
                setLoggedIn(true);
            } else {
                setLoggedIn(false);
            }

        } catch (err) {
            console.error("Erro ao checar auth:", err);
            setLoggedIn(false);
        }
        };

        checkAuth();
    }, []);

    return (
        <header className="bg-desktop-bg text-white p-6 font-dmSans tracking-wide">
            <div className="container mx-auto flex justify-between items-center h-11">
                <Link to="/">
                <h1 className="text-2xl text-white">Equili<span className="font-bold">brium</span></h1>
                </Link> 
                {renderButtons && (
                <nav className="hidden md:flex md:space-x-6 md:ml-32">
                    <button onClick={() => scrollToSection("inicio")} className="hover:underline">
                        Início
                    </button>
                    <button onClick={() => scrollToSection("sobre")} className="hover:underline">
                        Sobre
                    </button>
                    <button onClick={() => scrollToSection("grupos")} className="hover:underline">
                        Grupos
                    </button>
                    <button onClick={() => scrollToSection("depoimentos")} className="hover:underline">
                        Depoimentos
                    </button>
                </nav>)}
                

                {!isLogged && ( 
                <div className="hidden md:flex md:space-x-4 pl-20">
                    <Link to="/login">
                        <button className="border-2 border-white px-6 py-2 rounded-full hover:bg-brand-green-hover hover:text-brand-green transition">
                            Login
                        </button>
                    </Link>
                    <Link to="/signup">
                        <button className="border-2 border-white px-6 py-2 rounded-full hover:bg-brand-green-hover hover:text-brand-green transition">
                            BUSQUE AJUDA
                        </button>
                    </Link>
                </div>)}

                {isLogged 
                && ( 
                    
                <div className="hidden md:flex md:space-x-4 pl-32">
                    
                    <Link to="/profile">
                        <div className="user_icon w-20 h-11 mx-auto mb-1">
                                <button><img src="src\assets\icons\logged_user.png" alt="user_icon" /></button>
                        </div>
                    </Link>
                    <Link to="/api/logout">
                        <button onClick={handleLogout} className="border-2 border-white px-6 py-3 rounded-full hover:bg-brand-green-hover hover:text-brand-green transition">
                            Sair
                        </button>
                    </Link>
                </div>)}

                <button
                    className="md:hidden"
                    onClick={() => setMenuOpen(!menuOpen)}
                    aria-label="Abrir menu"
                >
                    <FontAwesomeIcon icon={faBars} className="text-2xl" />
                </button>
            </div>

            {menuOpen && (
                <nav className="md:hidden grid bg-brand-green mt-2 space-y-4 p-6 text-2xl">
                    <button onClick={() => scrollToSection("inicio")} className="block hover:underline text-center font-bold py-4">
                        Início
                    </button>
                    <button onClick={() => scrollToSection("sobre")} className="block hover:underline text-center font-bold py-4">
                        Sobre
                    </button>
                    <button onClick={() => scrollToSection("grupos")} className="block hover:underline text-center font-bold py-4">
                        Grupos
                    </button>
                    <button onClick={() => scrollToSection("depoimentos")} className="block hover:underline text-center font-bold py-4">
                        Depoimentos
                    </button>
                    <div className="flex justify-center">
                        <Link to={"/signup"}>
                            <button className="border-2 border-white py-3 px-6 rounded-full hover:bg-brand-green-hover hover:text-brand-green font-bold transition w-full">
                                BUSQUE AJUDA
                            </button>
                        </Link>
                    </div>
                    <div className="flex justify-center">
                        <Link to={"/login"}>
                            <button className="border-2 border-white py-3 px-6 rounded-full hover:bg-brand-green-hover hover:text-brand-green font-bold transition w-full">
                                Login
                            </button>
                        </Link>
                    </div>
                </nav>
            )}
        </header>
    );
};

export default Header;