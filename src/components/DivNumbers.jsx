import React, { useState } from "react";



const DivNumbers = () => {

    return (

        <div className="hidden md:flex absolute top-[-120px] w-full justify-center">

            <div className="hidden md:flex justify-center items-center md:w-4/5 md:h-52 bg-brand-beige border-2 border-mobile-bg rounded-md font-dmSans">

                <div className=" md:px-12 lg:px-28 w-full ">

                    <p className="text-5xl text-center">+3500</p>

                    <p className="text-xs text-center text-desktop-bg">Pacientes atendidos</p>

                </div>



                <div className=" md:px-12 lg:px-28 w-full border-x-2 border-mobile-bg">

                <p className="text-5xl text-center">+15</p>

                <p className="text-xs text-center text-desktop-bg">Especialistas disponíveis</p>

                </div>



                <div className="md:px-12 lg:px-28 w-full">

                <p className="text-5xl text-center">+5</p>

                <p className="text-xs text-center text-desktop-bg">Anos no mercado</p>

                </div>

            </div>

        </div>

    );

};



export default DivNumbers;