import type { NextPage } from 'next';
import Head from 'next/head';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';

import Header from '../components/Header';
import Hero from '../components/Hero';
import About from '../components/About';
import Value from '../components/Value';
import Experience from '../components/Experience';
import Projects from '../components/Projects';
import Contact from '../components/Contact';
import AdminDashboard from '../components/AdminDashboard';
import Link from 'next/link';

const HomePage: NextPage = () => {
  const router = useRouter();
  const [isAdminMode, setIsAdminMode] = useState(false);
   useEffect(() => {
    if (typeof window !== "undefined" && (window as any).fbq) {
      (window as any).fbq("track", "ViewContent", {
        content_name: "Livestock Landing Page",
        content_category: "LandingPage",
      });
    }
  }, []);

  useEffect(() => {
    // Check query param for admin
    if (router.query.admin === 'true') {
      setIsAdminMode(true);
    }
  }, [router.query]);

  if (isAdminMode) {
    // Render admin dashboard only
    return <AdminDashboard />;
  }

  return (
    <div className="bg-[rgb(36,36,36)] text-[#8CC63F] h-screen snap-y snap-mandatory overflow-y-scroll overflow-x-hidden z-0 scrollbar scrollbar-track-gray-400/20 scrollbar-thumb-[#7FAB0A]">
      <Head>
        <title>Malyam Agro</title>
      </Head>

      <Header />

      {/* hero */}
      <section id="hero" className="snap-start">
        <Hero />
      </section>

      {/* Trust */}
      <section id="about" className="snap-center">
        <About />
      </section>
      
      {/* Value stark */}
      <section id="value" className="snap-center">
        <Value />
      </section>


      {/* testimonials */}
      <section id="experience" className="snap-center">
        <Experience />
      </section>

      {/* Projects */}
      <section id='projects' className='snap-start'>
        <Projects />
      </section>

      {/* Contact */}
      <section id='contact' className='snap-start'>
        <Contact />
      </section>

      <Link href="#hero">
        <footer className='sticky bottom-5 w-full cursor-pointer'>
          <div className='flex items-center justify-center'>
            <img 
              className='h-12 w-12 md:h-16 md:w-16 rounded-full grayscale hover:grayscale-0 cursor-pointer bg-[#F5F5DC]'
              src="./logo/beefLogo.jpg" 
              alt="Logo" 
            />
          </div>
        </footer>
      </Link>
    </div>
  );
};

export default HomePage;
