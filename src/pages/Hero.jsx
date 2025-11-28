import { usePersonalInfo, useRoles, useSiteSettings } from '../hooks/usePortfolioData'
import { useTypedText } from '../hooks/useTypedText'
import ErrorMessage from '../components/ErrorMessage'

function Hero() {
    const socialLinks = [
        {
            id: 1,
            platform: 'GitHub',
            url: 'https://github.com/nvdekay',
            icon: '/assets/images/socials/github.png'
        },
        {
            id: 2,
            platform: 'LinkedIn',
            url: 'https://www.linkedin.com/in/nvdeekay07/',
            icon: '/assets/images/socials/linkedin.png'
        },
        {
            id: 3,
            platform: 'Facebook',
            url: 'https://www.facebook.com/nvdeekay.07/',
            icon: '/assets/images/socials/facebook.png'
        },
        {
            id: 4,
            platform: 'Instagram',
            url: 'https://www.instagram.com/nvdeekay.07/',
            icon: '/assets/images/socials/instagram.png'
        }
    ]

    // Fetch data from Supabase
    const { data: personalInfo, loading: personalLoading, error: personalError } = usePersonalInfo()
    const { data: roles, loading: rolesLoading, error: rolesError } = useRoles()
    const { data: settings, loading: settingsLoading } = useSiteSettings()

    // Extract roles for typing animation - với fallback
    const rolesList = roles && roles.length > 0 
        ? roles.map(role => role.title) 
        : ['Frontend Developer', 'Backend Developer', 'Software Engineer', 'Full Stack Developer']
    
    const typedText = useTypedText(
        rolesList,
        parseInt(settings?.typing_speed) || 8000,
        parseInt(settings?.typing_delay) || 5500
    )

    const scrollToSection = (id) => {
        const section = document.getElementById(id);
        if (section) {
            section.scrollIntoView({ behavior: 'smooth' });
        }
    };

    // Error state
    if (personalError || rolesError) {
        return <ErrorMessage message="Error loading hero data" />
    }

    const person = personalInfo?.[0] || {}

    return (
        <div className='relative overflow-hidden min-h-[550px] sm:min-h-[600px] flex flex-col justify-center items-center lg:ml-60'>
            <main
                id='home'
                className='flex flex-col-reverse md:flex-row items-center w-full max-w-[1280px] mx-auto px-4 md:px-8 pb-4 pt-24 mt-14 md:mt-36 gap-8'
            >
                <section
                    className='w-full md:w-1/2 flex flex-col items-center md:items-start text-center md:text-left mt-10 md:mt-0 relative px-4 md:px-0 lg:px-8'
                    data-aos='fade-up'
                    data-aos-delay='100'
                >
                    <header className="flex flex-col items-center md:items-start">
                        <h6 className="text-white text-secondary-dark text-lg lg:text-2xl font-medium mb-2 md:mb-2 transition-all duration-300">
                            {settings.hero_title || 'Hello, I am'}
                        </h6>
                        <h1 className="text-[#bb65d3] text-4xl md:text-5xl lg:text-6xl font-bold mb-2 md:mb-4 leading-tight">
                            {person.display_name}
                        </h1>
                        <h2 className='text-xl sm:text-4xl md:text-2xl font-bold text-white mb-3 flex justify-center md:justify-start'>
                            {settings.hero_subtitle || 'I am a'}{' '}
                            <span className='ml-2 text-[#bb65d3]'>
                                {typedText}
                            </span>
                        </h2>

                        <div className='flex items-center space-x-4 mb-6 justify-center md:justify-start'>
                            {socialLinks.map((social) => (
                                <a
                                    key={social.id}
                                    href={social.url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    title={social.platform}
                                    className='transition-transform hover:scale-110 duration-300'
                                >
                                    <img
                                        src={social.icon}
                                        alt={social.platform}
                                        className='w-11 h-11 object-contain'
                                    />
                                </a>
                            ))}
                        </div>

                        <div className='flex justify-center md:justify-start items-center w-full'>
                            <button
                                onClick={() => scrollToSection('about')}
                                className="select-none border-4 border-black bg-gray-500 pb-[10px] transition ease-in-out transform hover:-translate-y-1 hover:shadow-lg active:pb-0 active:mb-[10px] active:translate-y-[10px] cursor-pointer"
                            >
                                <div className="bg-[#dddddd] border-4 border-white px-4 py-[2px] text-[1.2em] tracking-[1px]">
                                    About me!
                                </div>
                            </button>
                        </div>
                    </header>
                </section>

                <figure
                    data-aos='fade-up'
                    data-aos-delay='500'
                    className='w-full md:w-1/2 flex justify-center items-center'
                >
                    <img
                        src={person.avatar_url || "/assets/images/avatars/avthero.jpg"}
                        alt="Hero Image"
                        className='w-[200px] sm:w-[280px] md:w-[400px] max-w-[90vw] aspect-square object-cover rounded-full border-[6px] border-transparent bg-gradient-to-tr from-[#8e6cf5] via-[#bb61c5] to-[#cd3cf5] p-[3px]'
                    />
                </figure>
            </main>
        </div>
    )
}

export default Hero