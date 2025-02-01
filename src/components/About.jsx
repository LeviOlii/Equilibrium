import React from "react";
import AboutImage from "../assets/images/homepage-aboutus-smiling-doctor.jpg";

const About = () => {
    return (
        <section id="sobre" className="font-dmSans bg-brand-beige w-full py-16">
            <div className="container mx-auto py-16 px-4 md:px-8 lg:px-16"> 
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center"> 
                    <div className="flex justify-center">
                        <img
                            src={AboutImage}
                            alt="Médico sorrindo enquanto segura uma prancheta, acompanhado de uma mulher e uma criança que estão abraçadas"
                            className="object-cover rounded-2xl shadow-lg w-full h-auto" 
                        />
                    </div>

                    <div className="space-y-6 text-gray-headline">
                        <h2 className="text-base font-bold tracking-wide text-desktop-bg">
                            SOBRE NÓS
                        </h2>

                        <h2 className="text-3xl md:text-4xl font-bold tracking-wide leading-tight"> 
                            Entenda quem somos e por que existimos
                        </h2>

                        <p className="text-base md:text-lg leading-relaxed"> 
                            Na Equilibrium, acreditamos que a saúde mental é essencial para a qualidade de vida de todos.
                            Nosso objetivo é conectar profissionais qualificados a pessoas que precisam de assistência,
                            promovendo acolhimento e acessibilidade em cada etapa do processo.
                        </p>
                        <p className="text-base md:text-lg leading-relaxed"> 
                            Oferecemos uma abordagem inovadora para simplificar o cuidado com a saúde mental, sempre
                            focados no bem-estar e na inclusão.
                        </p>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default About;