import type { NextPage } from "next";
import Head from "next/head";
import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import Link from "next/link";

import Header from "../components/Header";
import Hero from "../components/Hero";
import About from "../components/About";
import Value from "../components/Value";
import Experience from "../components/Experience";
import Projects from "../components/Projects";
import Contact from "../components/Contact";
import AdminDashboard from "../components/AdminDashboard";
import Pixel from "../components/Pixel";

const HomePage: NextPage = () => {
  const router = useRouter();
  const [isAdminMode, setIsAdminMode] = useState(false);

  // Enable Admin mode if query param is present
  useEffect(() => {
    if (router.query.admin === "true") {
      setIsAdminMode(true);
    }
  }, [router.query]);

  if (isAdminMode) {
    return <AdminDashboard />;
  }

  return (
    <div className="bg-[rgb(36,36,36)] text-[#8CC63F] h-screen snap-y snap-mandatory overflow-y-scroll overflow-x-hidden z-0 scrollbar scrollbar-track-gray-400/20 scrollbar-thumb-[#7FAB0A]">
      <Head>
        <title>Malyam Agro</title>
      </Head>

      {/* Pixel fires PageView automatically */}
      <Pixel />

      {/* Header */}
      <Header />

      {/* Contact Section */}
      <section id="contact" className="snap-start">
        <Contact />
      </section>

      {/* Hero Section */}
      <section id="hero" className="snap-start">
        <Hero />
      </section>

      {/* About / Trust Section */}
      <section id="about" className="snap-center">
        <About />
      </section>

      {/* Value Section */}
      <section id="value" className="snap-center">
        <Value />
      </section>

      {/* Experience / Testimonials */}
      <section id="experience" className="snap-center">
        <Experience />
      </section>

      {/* Projects Section */}
      <section id="projects" className="snap-start">
        <Projects />
      </section>

      {/* Footer scroll-to-top */}
      <Link href="#hero">
        <footer className="sticky bottom-5 w-full cursor-pointer">
          <div className="flex items-center justify-center">
            <img
              className="h-12 w-12 md:h-16 md:w-16 rounded-full grayscale hover:grayscale-0 cursor-pointer bg-[#F5F5DC]"
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
