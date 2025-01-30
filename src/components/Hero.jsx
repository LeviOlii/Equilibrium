import {Link} from 'react-router-dom';
import HeroImage from "../assets/images/homepage-hero-smiling-woman.png";
import DivNumbers from "./DivNumbers";

const Hero = () => {

    return (
    <>
        <section className="h-hero-desktop bg-mobile-bg w-full flex font-dmSans">
            <div className="p-16 h-80 w-hero-texts-width mx-10">
                <p className="text-desktop-bg font-bold tracking-wider">BOAS-VINDAS A EQUILIBRIUM 👋</p>
                <p className="py-4 text-6xl lg:text-5xl leading-hero-bigger-paragraph text-gray-headline font-bold tracking-wide">Assistência psicológica simplificada para todos</p>
                <p className="text-base tracking-wide">Conectamos profissionais de saúde mental a quem mais precisa, tornando a assistência psicológica acessível para todos</p>
                
                <div className=" py-12 lg:py-6 ">
                    <Link to="/login">
                        <button className="hidden md:block bg-desktop-bg border-2 text-white border-white px-6 py-2 rounded-full hover:bg-brand-green-hover hover:text-brand-green transition"
                        >
                        BUSQUE PROFISSIONAIS
                        </button>
                    </Link>
                </div>
            </div>

            <div className=" md:flex inline-flex flex-auto" >
                <img
                    src={HeroImage} 
                    alt="Moça sorrindo representando acolhimento" 
                    className="hidden lg:block h-full max-w-full object-cover"
                />
            </div>
            </section>

            <div className="relative">
                <DivNumbers />
            </div>
        </>
    );
};

export default Hero;