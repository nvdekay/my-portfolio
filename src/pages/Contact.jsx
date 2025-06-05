import React, { useRef } from 'react';
import emailjs from '@emailjs/browser';
function Contact() {
    const form = useRef();

    const sendEmail = (e) => {
        e.preventDefault();
        

        const serviceID = import.meta.env.VITE_EMAILJS_SERVICE_ID;
        const templateID = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;
        const publicKey = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;

        if (!serviceID || !templateID || !publicKey) {
            alert('Chưa cấu hình biến môi trường cho EmailJS!');
            return;
        }

        emailjs
            .sendForm(serviceID, templateID, form.current, publicKey)
            .then(
                (result) => {
                    alert('Tin nhắn đã được gửi thành công!');
                    form.current.reset();
                },
                (error) => {
                    console.error(error);
                    alert('Đã xảy ra lỗi khi gửi. Vui lòng thử lại!');
                }
            );
    };

    return (
        <section
            id="contact"
            data-aos="fade-up"
            data-aos-delay="500"
            className="lg:ml-60 min-h-screen overflow-hidden flex justify-center items-center p-6 mt-10 relative"
        >
            <article className="shadow-lg rounded-lg flex flex-col md:flex-row max-w-4xl w-full relative">
                <aside className="w-full md:w-1/2 relative">
                    <div className="absolute z-0 w-40 h-40 sm:w-60 sm:h-60 bg-[#cd3cf5] rounded-full blur-3xl opacity-50 -top-5 left-10"></div>
                </aside>

                <section className="p-8 w-full md:w-1/2">
                    <header className="mb-6">
                        <h2 className="text-4xl font-bold text-center text-white">Contact Me</h2>
                    </header>
                    <form ref={form} onSubmit={sendEmail} className="space-y-4">
                        <div>
                            <label htmlFor="name" className="block text-gray-300 font-medium mb-2">Name</label>
                            <input type="text" name="name" id="name" placeholder="Your name" className="w-full px-4 py-2 text-white bg-gray-900 rounded-lg focus:outline-none" required />
                        </div>
                        <div>
                            <label htmlFor="email" className="block text-gray-300 font-medium mb-2">Email</label>
                            <input type="email" name="email" id="email" placeholder="Your email" className="w-full px-4 py-2 text-white bg-gray-900 rounded-lg focus:outline-none" required />
                        </div>
                        <div>
                            <label htmlFor="message" className="block text-gray-300 font-medium mb-2">Send me a message</label>
                            <textarea name="message" id="message" placeholder="Your message" className="w-full px-4 py-2 text-white bg-gray-900 rounded-lg focus:outline-none" required />
                        </div>
                        <button type="submit" className="w-full text-white border-2 py-2 px-6 focus:outline-none hover:bg-[#801b9c] hover:shadow-[0_0_40px_rgba(128, 0, 128, 0.7)] rounded-full text-lg">Send Message</button>
                    </form>
                </section>
            </article>
        </section>
    );
}

export default Contact;
