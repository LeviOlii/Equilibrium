import {Link} from 'react-router-dom';
import HeroImage from "../assets/images/homepage-hero-smiling-woman.png";
import DivNumbers from "./DivNumbers";
import SearchBar from './SearchBar';

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
                        
                    </Link>
                </div>

                <SearchBar />
                
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