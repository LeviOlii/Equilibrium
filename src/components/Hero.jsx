import { Link } from "react-router-dom";
import HeroImage from "../assets/images/homepage-hero-smiling-woman.png";
import DivNumbers from "./DivNumbers";
import SearchBar from "./SearchBar";

const Hero = () => {
    return (
        <div className="flex flex-col min-h-screen"> {/* Added min-h-screen to the main container */}
            <section className="bg-mobile-bg w-full flex flex-col md:flex-row font-dmSans items-center md:items-start flex-grow"> {/* Added flex-grow */}
                <div className="p-6 md:p-16 w-full md:w-hero-texts-width mx-4 md:mx-10 text-center md:text-left">
                    <p className="text-desktop-bg font-bold tracking-wider text-sm md:text-base">
                        BOAS-VINDAS A EQUILIBRIUM
                    </p>
                    <p className="py-4 text-4xl md:text-6xl lg:text-5xl leading-tight md:leading-hero-bigger-paragraph text-gray-headline font-bold tracking-wide">
                        Assistência psicológica simplificada para todos
                    </p>
                    <p className="text-sm md:text-base tracking-wide">
                        Conectamos profissionais de saúde mental a quem mais precisa, tornando a assistência psicológica acessível para todos
                    </p>
                    <div className="py-6 md:py-12">
                        <Link to="/login">
                            <button className="bg-brand-green text-white px-6 py-2 md:py-3 rounded-md hover:bg-brand-green-hover transition">
                                Entrar
                            </button>
                        </Link>
                    </div>
                    <div className="w-full max-w-lg mt-8 md:mt-0">
                        <SearchBar />
                    </div>
                </div>
                <div className="md:flex flex-auto items-end"> 
                    <img
                        src={HeroImage}
                        alt="Moça sorrindo representando acolhimento"
                        className="hidden md:block w-full h-auto max-w-full object-cover"
                    />
                </div>
            </section>
            <div className="relative">
                <DivNumbers />
            </div>
        </div>
    );
};

export default Hero;