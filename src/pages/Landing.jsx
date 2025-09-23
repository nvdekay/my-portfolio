// Landing.jsx
import { motion } from "framer-motion";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faBars,
    faXmark,
    faArrowRight,
} from "@fortawesome/free-solid-svg-icons";

export default function Landing() {
    return (
        <div className="bg-[#ebebeb] min-h-screen font-sans text-gray-900">
            {/* Header */}
            <header className="w-full fixed top-0 left-0 z-50 bg-[#ebebeb]/90 backdrop-blur-sm shadow">
                <nav className="container mx-auto flex justify-between items-center py-4 px-6">
                    {/* Logo */}
                    <div className="flex items-center space-x-3">
                        <div className="w-6 h-6 rounded-full bg-black" />
                        <span className="text-sm font-medium text-gray-700 hidden sm:block">
                            Open for any <br /> collaborations and offers
                        </span>
                    </div>

                    {/* Desktop Nav */}
                    <ul className="hidden md:flex items-center space-x-8 text-sm font-medium">
                        <li>
                            <a href="/works.html" className="hover:text-black transition">
                                Works
                            </a>
                        </li>
                        <li>
                            <a href="/about.html" className="hover:text-black transition">
                                About
                            </a>
                        </li>
                        <li>
                            <a href="/play-ground.html" className="hover:text-black transition">
                                Playground
                            </a>
                        </li>
                        <li>
                            <a href="/contact.html" className="hover:text-black transition">
                                Contact
                            </a>
                        </li>
                    </ul>

                    {/* Mobile Menu Button */}
                    <button className="md:hidden text-xl">
                        <FontAwesomeIcon icon={faBars} />
                    </button>
                </nav>
            </header>

            {/* Hero Section */}
            <main className="pt-32 container mx-auto px-6">
                <motion.section
                    className="text-center"
                    initial={{ opacity: 0, y: 40 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                >
                    <h1 className="text-5xl sm:text-7xl font-bold tracking-tight">
                        <span className="font-serif">Huy</span> Phan
                    </h1>
                    <p className="mt-2 text-gray-500">(ML)</p>
                </motion.section>

                {/* About / Person Section */}
                <section className="mt-16 grid md:grid-cols-3 gap-8 items-center">
                    <motion.div
                        className="flex flex-col items-center text-center space-y-4"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                    >
                        <img
                            src="/Images/Shapes.svg"
                            alt="circle"
                            className="w-16 h-16"
                        />
                        <p>
                            Huy Phan (he/him) aka Huyml is an independent designer from Ho Chi
                            Minh City, Vietnam
                        </p>
                    </motion.div>

                    <motion.div
                        className="flex justify-center"
                        initial={{ scale: 0.8, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        transition={{ delay: 0.4 }}
                    >
                        <div className="w-48 h-48 bg-gray-200 rounded-full flex items-center justify-center shadow-lg">
                            {/* Placeholder for Lottie animation */}
                            <span className="text-gray-500">[Animation]</span>
                        </div>
                    </motion.div>

                    <motion.div
                        className="flex flex-col items-center text-center space-y-4"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.6 }}
                    >
                        <img
                            src="/Images/Shapes.svg"
                            alt="circle"
                            className="w-16 h-16"
                        />
                        <p>
                            Passionate about creating unforgettable and beautiful digital
                            experiences.
                        </p>
                    </motion.div>
                </section>
            </main>

            {/* Footer */}
            <footer className="mt-24 py-8 border-t text-center text-gray-600">
                <p>Just an ordinary designer. &nbsp; From Vietnam with love.</p>
            </footer>
        </div>
    );
}
