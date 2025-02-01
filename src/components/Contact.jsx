import React from "react";
import { FaMapMarkerAlt, FaEnvelope } from "react-icons/fa";
import ContactImage from "../assets/images/homepage-contact-man-smiling-phone.jpg";

const Contact = () => {
    return (
        <section className="flex items-center justify-between gap-16 bg-brand-white px-8 md:px-16 py-24 font-dmSans">
            <div className="max-w-lg">
                <h2 className="text-4xl font-bold text-gray-headline mb-6">
                    Entre em contato com a gente!
                </h2>

                <div className="space-y-4 text-lg ">
                    <div className="flex items-center gap-4">
                        <FaMapMarkerAlt className="text-brand-green text-2xl text-desktop-bg" />
                        <span>Av. Beira-Mar, 123 - Fortaleza, CE</span>
                    </div>

                    <div className="flex items-center gap-4">
                        <FaEnvelope className="text-brand-green text-2xl text-desktop-bg" />
                        <span>contato@equilibrium.com</span>
                    </div>
                </div>
            </div>

            <div className="max-w-lg">
                <img
                    src={ContactImage}
                    alt="Homem sorrindo enquanto olha para o celular"
                    className="rounded-lg shadow-lg object-cover"
                />
            </div>
        </section>
    );
};

export default Contact;
