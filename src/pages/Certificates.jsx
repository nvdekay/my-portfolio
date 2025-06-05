import React from 'react';
import { motion } from 'framer-motion';

const certificates = [
    {
        image: '/assets/images/certificates/Coursera1.png',
        title: 'Web Design for Everybody: Basics of Web Development & Coding',
        issuer: 'Coursera',
        description: 'This Specialization covers how to write syntactically correct HTML5 and CSS3, and how to create interactive web experiences with JavaScript',
        link: 'https://www.coursera.org/account/accomplishments/specialization/LQF8AYHJVVLU?utm_source=link&utm_medium=certificate&utm_content=cert_image&utm_campaign=sharing_cta&utm_product=s12n',
    },
    {
        image: '/assets/images/certificates/Coursera2.png',
        title: 'Software Development Lifecycle',
        issuer: 'Coursera',
        description: 'Certified in applying Agile, Lean, and Waterfall to build quality software and optimize SDLC practices based on project needs.',
        link: 'https://www.coursera.org/account/accomplishments/specialization/JY8FHLM4PBS7?utm_source=link&utm_medium=certificate&utm_content=cert_image&utm_campaign=sharing_cta&utm_product=s12n',
    },
    {
        image: '/assets/images/certificates/Coursera3.png',
        title: 'User Experience Research and Design',
        issuer: 'Coursera',
        description: 'Hands-on training in integrating UX research and design to create user-centered products—from concept to prototyping and user testing.',
        link: 'https://www.coursera.org/account/accomplishments/specialization/9TG5B25QYUUE?utm_source=link&utm_medium=certificate&utm_content=cert_image&utm_campaign=sharing_cta&utm_product=s12n',
    }
];

const CertificateCard = ({ image, title, issuer, description, link }) => (
    <motion.article
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        viewport={{ once: true }}
        className="relative bg-gray-800 rounded overflow-hidden shadow-lg group w-full max-w-sm mx-auto"
    >
        <div className='absolute z-0 w-40 h-40 sm:w-60 sm:h-60 bg-[#cd3cf5] rounded-full blur-3xl opacity-50 -top-5 left-10'></div>

        <div className="z-10">
            <figure className="relative">
                <img
                    src={image}
                    className="w-full h-48 object-cover transition-transform duration-300 group-hover:scale-110"
                    alt={title}
                />
                <a
                    href={link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="absolute h-[202px] inset-0 flex items-center justify-center bg-purple-800 bg-opacity-50 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                >
                    <button className="bg-white font-medium text-black py-2 px-4 rounded-3xl shadow hover:text-white hover:bg-[#2879d5]">
                        View Certificate
                    </button>
                </a>
            </figure>
            <div className="px-6 py-4 relative h-full flex flex-col">
                <header>
                    <h3 className="text-white font-bold text-xl mb-1">{title}</h3>
                    <p className="text-sm text-gray-400 italic mb-2">Issued by: {issuer}</p>
                </header>
                <p className="text-gray-200 text-base">{description}</p>
            </div>
        </div>
    </motion.article>
);

const Certificates = () => {
    return (
        <main id="certificates" className="p-4 ml-0 lg:ml-60 min-h-screen mt-48">
            <section data-aos="fade-up" data-aos-delay="300">
                <header className="text-center relative">
                    <img
                        src="/assets/images/avatars/imghero.png"
                        alt=""
                        className="absolute z-0 left-2 top-2 sm:left-16 sm:top-32 transform -rotate-12 w-24 h-auto sm:w-32 opacity-70"
                    />
                    <div className='absolute z-0 w-72 h-36 sm:w-96 sm:h-44 bg-[#cd3cf5] rounded-full blur-3xl opacity-50 top-10 sm:top-28 left-1/2 transform -translate-x-1/2'></div>

                    <div>
                        <h1 className="text-3xl text-white sm:text-4xl font-bold mb-6">
                            My <span className="text-purple-400">Certificates</span>
                        </h1>
                        <p className="text-gray-400 mt-2 sm:mt-4 text-sm sm:text-base">
                            A collection of certifications I’ve earned through continuous learning.
                        </p>
                    </div>
                    <img
                        src="/assets/images/avatars/imghero.png"
                        alt=""
                        className="absolute z-0 right-2 top-2 sm:right-16 sm:top-32 transform rotate-12 w-24 h-auto sm:w-32 opacity-70"
                    />
                </header>
            </section>

            <section
                data-aos="fade-up"
                data-aos-delay="500"
                className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mt-36 sm:mt-64 px-6 sm:px-12 lg:px-24"
            >
                {certificates.map((cert, index) => (
                    <CertificateCard
                        key={index}
                        image={cert.image}
                        title={cert.title}
                        issuer={cert.issuer}
                        description={cert.description}
                        link={cert.link}
                    />
                ))}
            </section>
        </main>
    );
};

export default Certificates;
