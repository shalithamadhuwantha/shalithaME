"use client";

import { useEffect, useState } from "react";
import ClientOnly from "@/components/ClientOnly";
import About from "@/components/About";
import Skills from "@/components/Skills";
import Projects from "@/components/Projects";
import ContactModal from "@/components/ContactModal";
import Head from "next/head";

declare global {
  interface Window {
    TypeIt: any;
  }
}

export default function Home() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <div className="w-[90%] mx-auto">
        <div className="w-auto flex flex-col justify-center text-center font-playfair mt-4">
          <div className="w-[100px] h-[100px] border-2 border-custom-text p-2.5 rounded-[60px] self-center bg-gray-300 animate-pulse"></div>
          <h1 className="mt-0 mb-0 text-custom-text">Loading...</h1>
        </div>
      </div>
    );
  }

  return (
    <>
      <Head>
        <title>Shalitha Madhuwantha | Ethical Hacker & Exploit Developer</title>
        <meta
          name="description"
          content="Portfolio of Shalitha Madhuwantha — Ethical Hacker, Exploit Developer, System Administrator, and technology enthusiast from Sri Lanka."
        />
        <meta
          name="keywords"
          content="Shalitha, cybersecurity, ethical hacking, penetration testing, exploit development, vulnerability assessment, system administration, network security, information security, security research, Sri Lanka, portfolio, projects, software development, programming, bug bounty, security tools, cyber defense, malware analysis, security automation"
        />
        <meta name="author" content="Shalitha Madhuwantha" />

        {/* Open Graph / Facebook */}
        <meta property="og:title" content="Shalitha Madhuwantha | Ethical Hacker & Exploit Developer" />
        <meta
          property="og:description"
          content="Explore Shalitha's ethical hacking projects, research, and blog articles."
        />
        <meta property="og:url" content="https://shalitha.me" />
        <meta property="og:type" content="website" />
        <meta property="og:image" content="https://shalitha.me/assets/img/dp.jpg" />

        {/* Twitter */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:site" content="@shalithaMgamage" />
        <meta name="twitter:creator" content="@shalithaMgamage" />
        <meta name="twitter:title" content="Shalitha Madhuwantha | Ethical Hacker & Exploit Developer" />
        <meta
          name="twitter:description"
          content="Explore Shalitha's ethical hacking projects, research, and blog articles."
        />
        <meta name="twitter:image" content="https://shalitha.me/assets/img/dp.jpg" />

        {/* Schema.org JSON-LD */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Person",
              name: "Shalitha Madhuwantha",
              url: "https://shalitha.me",
              sameAs: [
                "https://github.com/shalithamadhuwantha",
                "https://www.linkedin.com/in/shalitha-madhuwantha/",
                "https://x.com/shalithaMgamage",
              ],
              jobTitle: "Cybersecurity Student & Developer",
              alumniOf: "Rajarata University of Sri Lanka",
            }),
          }}
        />
      </Head>

      <div className="w-[90%] mx-auto">
        <ClientOnly
          fallback={
            <div className="w-auto flex flex-col justify-center text-center font-playfair mt-4">
              <div className="w-[100px] h-[100px] border-2 border-custom-text p-2.5 rounded-[60px] self-center bg-gray-300 animate-pulse"></div>
              <h1 className="mt-0 mb-0 text-custom-text">Loading...</h1>
            </div>
          }
        >
          <div className="webBody">
            <About />
            <Skills />
            <Projects />
          </div>
          <ContactModal />
        </ClientOnly>
      </div>
    </>
  );
}
