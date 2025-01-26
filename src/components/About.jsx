import React, { useState } from "react";
import AboutImage from "../assets/images/homepage-aboutus-smiling-doctor.jpg";

const About = () => {
    return (
        <>
            <section id="sobre" className="font-dmSans bg-brand-beige w-full h-full">
                <div className="grid grid-cols-2 items-center size-10/12 py-28 px-16">
                    <img src={AboutImage} 
                    alt="Médico sorrindo enquanto segura uma prancheta, acompanhado de uma mulher e uma criança que estão abraçadas" 
                    className="object-cover border rounded-md"/>

                    <p className="text-desktop-bg text-sm font-bold">SOBRE NÓS</p>
                </div>
                <p></p>
            </section>
        </>
    );
};

export default About;