import React, { useRef, useState } from 'react';
import emailjs from '@emailjs/browser';
import { ContactService } from '../services/contactService';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope, faUser, faMessage, faTimes } from '@fortawesome/free-solid-svg-icons';
import { motion, AnimatePresence } from 'framer-motion';

function Contact() {
    const form = useRef();
    const [popup, setPopup] = useState({ show: false, success: true, message: '' });

    const closePopup = () => {
        setPopup(prev => ({ ...prev, show: false }));
    };

    const sendEmail = (e) => {
        e.preventDefault();

        const serviceID = import.meta.env.VITE_EMAILJS_SERVICE_ID;
        const templateID = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;
        const publicKey = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;

        if (!serviceID || !templateID || !publicKey) {
            setPopup({ show: true, success: false, message: 'Missing EmailJS configuration!' });
            return;
        }

        emailjs.sendForm(serviceID, templateID, form.current, publicKey)
            .then(() => {
                setPopup({
                    show: true,
                    success: true,
                    message: "Your message has been sent successfully. I’ll get back to you as soon as possible."
                });
                form.current.reset();
                setTimeout(closePopup, 10000);
            })
            .catch(() => {
                setPopup({
                    show: true,
                    success: false,
                    message: 'Failed to send message. Try again later.'
                });
                setTimeout(closePopup, 4000);
            });
    };

    return (
        <section id="contact" className="relative lg:ml-60 min-h-screen flex items-center justify-center text-white px-4 sm:px-6 overflow-hidden">
            <div className="max-w-4xl w-full flex flex-col lg:flex-row gap-10">
                {/* Left section */}
                <div data-aos="fade-right" className="flex-1 relative lg:mt-28">
                    <div className="absolute z-0 w-40 h-40 sm:w-60 sm:h-60 bg-[#6c95f5] rounded-full blur-3xl opacity-30 -top-5 left-10"></div>
                    <header className="flex flex-col items-start">
                        <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4">Get in touch</h2>
                        <hr className="border-t-2 border-[#6c95f5] w-1/4 mb-6" />
                        <p className="text-xl text-gray-400 max-w-md">
                            I'm always open to discussing new projects, ideas or opportunities to be part of your visions. Feel free to drop a message!
                        </p>
                    </header>
                </div>

                {/* Form section */}
                <form
                    ref={form}
                    onSubmit={sendEmail}
                    className="flex-1 flex flex-col gap-5 p-6 w-full rounded-2xl shadow-xl"
                    data-aos="fade-left"
                >
                    <header className="flex flex-col items-start">
                        <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-4 sm:mb-6">Contact Me</h1>
                        <hr className="border-t-2 border-[#9c3fda] w-1/4 mb-6 sm:mb-8 self-start" />
                    </header>

                    {/* Name & Email */}
                    <div className="flex flex-col md:flex-row gap-5">
                        <div className="relative w-full">
                            <FontAwesomeIcon icon={faUser} className="absolute top-3 left-3 text-gray-400" />
                            <input
                                type="text"
                                name="name"
                                required
                                placeholder="Your name"
                                className="pl-10 pr-4 py-2 w-full bg-transparent border border-gray-600 rounded-md text-white placeholder-gray-400 focus:outline-none"
                            />
                        </div>
                        <div className="relative w-full">
                            <FontAwesomeIcon icon={faEnvelope} className="absolute top-3 left-3 text-gray-400" />
                            <input
                                type="email"
                                name="email"
                                required
                                placeholder="Your email"
                                className="pl-10 pr-4 py-2 w-full bg-transparent border border-gray-600 rounded-md text-white placeholder-gray-400 focus:outline-none"
                            />
                        </div>
                    </div>

                    {/* Message */}
                    <div className="relative">
                        <FontAwesomeIcon icon={faMessage} className="absolute top-3 left-3 text-gray-400" />
                        <textarea
                            name="message"
                            required
                            rows="5"
                            placeholder="Your message"
                            className="pl-10 pr-4 py-2 w-full bg-transparent border border-gray-600 rounded-md text-white placeholder-gray-400 focus:outline-none"
                        />
                    </div>

                    {/* Button */}
                    <button
                        type="submit"
                        className="inline-block py-[6px] px-4 text-lg border-2 border-black rounded-[10px] shadow-[5px_5px_0_0_#000] transition-all duration-300 ease-in-out cursor-pointer hover:bg-white hover:text-black hover:border-[#6c95f5] hover:shadow-[5px_5px_0_0_#6c95f5] active:bg-[#bdbdbd] active:shadow-none active:translate-y-[4px]"
                    >
                        Send Message
                    </button>
                </form>
            </div>

            {/* Modal popup */}
            <AnimatePresence>
                {popup.show && (
                    <motion.div
                        className="fixed inset-0 z-[9999] flex items-center justify-center bg-black bg-opacity-60"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                    >
                        <motion.div
                            className={`relative px-6 py-5 rounded-2xl shadow-2xl w-[90%] max-w-md text-center ${popup.success ? 'bg-white text-green-800' : 'bg-white text-red-700'
                                }`}
                            initial={{ scale: 0.8, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0.8, opacity: 0 }}
                            transition={{ duration: 0.3 }}
                        >
                            <button
                                onClick={closePopup}
                                className="absolute top-3 right-3 text-gray-500 hover:text-gray-700"
                                aria-label="Close popup"
                            >
                                <FontAwesomeIcon icon={faTimes} size="lg" />
                            </button>
                            <h2 className="text-xl font-semibold mb-2">
                                {popup.success ? 'Thank you!' : 'Oops!'}
                            </h2>
                            <p className="text-base">{popup.message}</p>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </section>
    );
}

export default Contact;
