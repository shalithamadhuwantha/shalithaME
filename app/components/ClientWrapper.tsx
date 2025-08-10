// app/components/ClientWrapper.tsx
"use client";

import { usePathname } from "next/navigation";
import Header from "@/components/Header";
import Footer from "@/components/settings/Footer";
import { SessionProvider } from 'next-auth/react'
import { useEffect, useState } from "react";


export default function ClientWrapper({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isAdmin = pathname.toLowerCase().includes("admin");
  const [scriptsLoaded, setScriptsLoaded] = useState(false);
  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    setMounted(true);
  }, []);
    useEffect(() => {
      // console.log("Mounted:", mounted);
      if (!mounted) return;

      const loadScripts = async () => {
        try {
          // Load Font Awesome
          if (!document.querySelector('script[src*="fontawesome"]')) {
            const fontAwesome = document.createElement("script");
            fontAwesome.src = "https://kit.fontawesome.com/8026947c0c.js";
            fontAwesome.crossOrigin = "anonymous";
            document.head.appendChild(fontAwesome);
          }
  
          // Load TypeIt
          if (!document.querySelector('script[src*="typeit"]')) {
            const typeIt = document.createElement("script");
            typeIt.src = "https://unpkg.com/typeit@8.7.1/dist/index.umd.js";
            document.head.appendChild(typeIt);
  
            typeIt.onload = () => {
              setTimeout(() => {
                setScriptsLoaded(true);
                initializeAll();
              }, 1000);
            };
          } else if (window.TypeIt) {
            setScriptsLoaded(true);
            initializeAll();
          }
        } catch (error) {
          // console.error("Error loading scripts:", error);
        }
      };
  
      loadScripts();
           initializeSocialMedia();
    }, [mounted]);
  
    const waitForElement = (selector: string): Promise<Element | null> => {
      return new Promise((resolve) => {
        const checkElement = () => {
          const element = document.querySelector(selector);
          if (element) {
            resolve(element);
          } else {
            setTimeout(checkElement, 100);
          }
        };
        checkElement();
      });
    };
  
    const initializeAll = async () => {
      if (!window.TypeIt) return;
  
      try {
        // Initialize typing prefix
        const headerst = document.getElementsByClassName("typeH");
        for (let i = 0; i < headerst.length; i++) {
          if (headerst[i]) {
            headerst[i].innerHTML = "root@shalitha :~# ";
          }
        }
  
        // Wait for elements and initialize TypeIt
        const targetElement = await waitForElement("#target");
        if (targetElement) {
          new window.TypeIt("#target", {
            speed: 75,
            loop: true,
          })
            .type("Software developer", { delay: 300 })
            .delete(17)
            .type("ecurity enthusiast")
            .go();
        }
  
        const aboutElement = await waitForElement("#aboutani");
        if (aboutElement) {
          new window.TypeIt("#aboutani", {
            speed: 75,
            loop: true,
          })
            .type(" cd profile", { delay: 300 })
            .delete(9)
            .type("at biography.asm ")
            .go();
        }
  
        const contactElement = await waitForElement("#contacttype");
        if (contactElement) {
          new window.TypeIt("#contacttype", {
            speed: 75,
            loop: true,
          })
            .type("python -m about.py", { delay: 300 })
            .go();
        }
  
        const skillElement = await waitForElement("#skilltype");
        if (skillElement) {
          new window.TypeIt("#skilltype", {
            speed: 75,
            loop: true,
          })
            .type("gcc -o skill skill.c", { delay: 300 })
            .delete(21)
            .type("./skill")
            .go();
        }
  
        const certElement = await waitForElement("#certtype");
        if (certElement) {
          new window.TypeIt("#certtype", {
            speed: 75,
            loop: true,
          })
            .type("nasm -f elf32 -o cert.o cert.asm", { delay: 300 })
            .delete(33)
            .type("ld -m elf_i386 -o cert cert.o")
            .delete(29)
            .type("./cert")
            .go();
        }
  
        const expElement = await waitForElement("#experince");
        if (expElement) {
          new window.TypeIt("#experince", {
            speed: 75,
            loop: true,
          })
            .type("python -m Experience.py", { delay: 300 })
            .go();
        }
  
        const projectElement = await waitForElement("#myprojectType");
        if (projectElement) {
          new window.TypeIt("#myprojectType", {
            speed: 75,
            loop: true,
          })
            .type("xdg-open project.asp", { delay: 300 })
            .go();
        }
  
        // Initialize social media
   
      } catch (error) {
        // console.error("Error initializing:", error);
      }
    };
  
    const initializeSocialMedia = () => {
      try {
        const social_list = `
          <div class="overflow-x-auto max-w-full">
            <ul class="list-none flex flex-row nav-raw  flex-nowrap items-center gap-2 mt-0 mb-0 pl-0 whitespace-nowrap">
              <li>
                <a href="https://www.facebook.com/Shalitha.Madhuwantha.Gamage?mibextid=ZbWKwL" target="_blank" rel="noopener noreferrer" class="mx-2.5 text-lg text-custom-heading hover:text-custom-text">
                  <i class="fa-brands fa-facebook"></i>
                </a>
              </li>
              <li>
                <a href="https://github.com/shalithamadhuwantha" target="_blank" rel="noopener noreferrer" class="mx-2.5 text-lg text-custom-heading hover:text-custom-text">
                  <i class="fa-brands fa-github"></i>
                </a>
              </li>
              <li>
                <a href="https://www.youtube.com/@WeberNetCo" target="_blank" rel="noopener noreferrer" class="mx-2.5 text-lg text-custom-heading hover:text-custom-text">
                  <i class="fa-brands fa-youtube"></i>
                </a>
              </li>
              <li>
                <a href="https://www.linkedin.com/in/shalitha-madhuwantha/" target="_blank" rel="noopener noreferrer" class="mx-2.5 text-lg text-custom-heading hover:text-custom-text">
                  <i class="fa-brands fa-linkedin"></i>
                </a>
              </li>
              <li>
                <a href="https://x.com/shalithaMgamage?t=b9-rBI8cZJJJ9NEmSiOc-w&s=09" target="_blank" rel="noopener noreferrer" class="mx-2.5 text-lg text-custom-heading hover:text-custom-text">
                  <i class="fa-brands fa-x-twitter"></i>
                </a>
              </li>
              <li>
                <a href="https://wa.me/+940740082154" target="_blank" rel="noopener noreferrer" class="mx-2.5 text-lg text-custom-heading hover:text-custom-text">
                  <i class="fa-brands fa-whatsapp"></i>
                </a>
              </li>
            </ul>
          </div>
          `;
  
        const social_listJS = document.getElementsByClassName("social_listJS");
        for (let i = 0; i < social_listJS.length; i++) {
          if (social_listJS[i]) {
            social_listJS[i].innerHTML = social_list;
          }
        }
      } catch (error) {
        // console.error("Error initializing social media:", error);
      }
    };


  return (
    <>
       <SessionProvider>
        
      {!isAdmin && <Header />}
      {children}
      {!isAdmin && <Footer />}
       </SessionProvider>
    </>
  );
}
