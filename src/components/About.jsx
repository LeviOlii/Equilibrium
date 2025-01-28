import React from "react";
import AboutImage from "../assets/images/homepage-aboutus-smiling-doctor.jpg";

const About = () => {
    return (
        <>
            <section id="sobre" className="font-dmSans bg-brand-beige w-full h-full">
                <div className="grid lg:grid-cols-2 gap-10 items-center py-28 px-8 md:px-16">
                    <div className="flex justify-center">
                        <img 
                            src={AboutImage} 
                            alt="Médico sorrindo enquanto segura uma prancheta, acompanhado de uma mulher e uma criança que estão abraçadas" 
                            className="object-cover rounded-2xl shadow-lg max-w-full"
                        />
                    </div>

                    <div className="space-y-6 text-gray-headline">
                        <h2 className="text-base font-bold tracking-wide text-desktop-bg">
                            SOBRE NÓS
                        </h2>

                        <h2 className="text-4xl font-bold tracking-wide w-96">
                            Entenda quem somos e por que existimos
                        </h2>

                        <p className="text-lg leading-relaxed">
                            Na Equilibrium, acreditamos que a saúde mental é essencial para a qualidade de vida de todos. 
                            Nosso objetivo é conectar profissionais qualificados a pessoas que precisam de assistência, 
                            promovendo acolhimento e acessibilidade em cada etapa do processo.
                        </p>
                        <p className="text-lg leading-relaxed">
                            Oferecemos uma abordagem inovadora para simplificar o cuidado com a saúde mental, sempre 
                            focados no bem-estar e na inclusão.
                        </p>
                        <button className="bg-desktop-bg text-white px-6 py-3 rounded-full shadow-md hover:bg-brand-green-hover hover:text-brand-green transition">
                            Saiba Mais
                        </button>
                    </div>
                </div>
            </section>
        </>
    );
};

export default About;
