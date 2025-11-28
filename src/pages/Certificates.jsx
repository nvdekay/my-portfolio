// import React from 'react';
// import { motion } from 'framer-motion';
// import { useCertificates, useSiteSettings } from '../hooks/usePortfolioData';
// import ErrorMessage from '../components/ErrorMessage';
// import LoadingSpinner from '../components/LoadingSpinner';

// const CertificateCard = ({ image, title, issuer, description, link }) => (
//     <motion.article
//         initial={{ opacity: 0, y: 20 }}
//         whileInView={{ opacity: 1, y: 0 }}
//         transition={{ duration: 0.4 }}
//         viewport={{ once: true }}
//         className="relative bg-gray-800 rounded overflow-hidden shadow-lg group w-full max-w-sm mx-auto"
//     >
//         <div className='absolute z-0 w-40 h-40 sm:w-60 sm:h-60 bg-[#cd3cf5] rounded-full blur-3xl opacity-50 -top-5 left-10'></div>

//         <div className="z-10">
//             <figure className="relative">
//                 <img
//                     src={image || '/assets/images/certificates/default.jpg'}
//                     className="w-full h-48 object-cover transition-transform duration-300 group-hover:scale-110"
//                     alt={title}
//                 />
//                 {link && (
//                     <a
//                         href={link}
//                         target="_blank"
//                         rel="noopener noreferrer"
//                         className="absolute h-[202px] inset-0 flex items-center justify-center bg-purple-800 bg-opacity-50 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
//                     >
//                         <button className="bg-white font-medium text-black py-2 px-4 rounded-3xl shadow hover:text-white hover:bg-[#2879d5]">
//                             View Certificate
//                         </button>
//                     </a>
//                 )}
//             </figure>
//             <div className="px-6 py-4 relative h-full flex flex-col">
//                 <header>
//                     <h3 className="text-white font-bold text-xl mb-1">{title}</h3>
//                     {issuer && <p className="text-sm text-gray-400 italic mb-2">Issued by: {issuer}</p>}
//                 </header>
//                 {description && <p className="text-gray-200 text-base">{description}</p>}
//             </div>
//         </div>
//     </motion.article>
// );

// const Certificates = () => {
//     const { data: certificates, loading, error } = useCertificates();
//     const { data: settings } = useSiteSettings();

//     if (error) {
//         return <ErrorMessage message="Error loading certificates" />;
//     }

//     if (loading) {
//         return <LoadingSpinner />;
//     }

//     return (
//         <main id="certificates" className="p-4 ml-0 lg:ml-60 min-h-screen mt-48">
//             <section data-aos="fade-up" data-aos-delay="300">
//                 <header className="text-center relative">
//                     <img
//                         src={settings.hero_image_left || "/assets/images/avatars/imghero.png"}
//                         alt=""
//                         className="absolute z-0 left-2 top-2 sm:left-16 sm:top-32 transform -rotate-12 w-24 h-auto sm:w-32 opacity-70"
//                     />
//                     <div className='absolute z-0 w-72 h-36 sm:w-96 sm:h-44 bg-[#cd3cf5] rounded-full blur-3xl opacity-50 top-10 sm:top-28 left-1/2 transform -translate-x-1/2'></div>

//                     <div>
//                         <h1 className="text-3xl text-white sm:text-4xl font-bold mb-6">
//                             {settings.certificates_title || 'My Certificates'}
//                         </h1>
//                         <p className="text-gray-400 mt-2 sm:mt-4 text-sm sm:text-base">
//                             {settings.certificates_subtitle || 'A collection of certifications I\'ve earned through continuous learning.'}
//                         </p>
//                     </div>
//                     <img
//                         src={settings.hero_image_right || "/assets/images/avatars/imghero.png"}
//                         alt=""
//                         className="absolute z-0 right-2 top-2 sm:right-16 sm:top-32 transform rotate-12 w-24 h-auto sm:w-32 opacity-70"
//                     />
//                 </header>
//             </section>

//             <section
//                 data-aos="fade-up"
//                 data-aos-delay="500"
//                 className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mt-36 sm:mt-64 px-6 sm:px-12 lg:px-24"
//             >
//                 {certificates && certificates.length > 0 ? (
//                     certificates.map((cert) => (
//                         <CertificateCard
//                             key={cert.id}
//                             image={cert.image_url}
//                             title={cert.title}
//                             issuer={cert.issuer}
//                             description={cert.description}
//                             link={cert.link}
//                         />
//                     ))
//                 ) : (
//                     <div className="col-span-full text-center text-gray-400 py-20">
//                         No certificates available yet.
//                     </div>
//                 )}
//             </section>
//         </main>
//     );
// };

// export default Certificates;
