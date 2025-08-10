"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";
import TextSkeleton from "./settings/LoadingSklt";

export default function About() {
  const [bio, setBio] = useState<string>("");
  const [biovisi, setBiovisi] = useState<boolean>(false);
  const [achive, setachive] = useState<string>("");
  const [achivevisi, setachivevisi] = useState<boolean>(false);
  const [about, setAbout] = useState<string>("");
  const [aboutvisi, setAboutvisi] = useState<boolean>(false);
   const [scriptsLoaded, setScriptsLoaded] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    // loadScripts();
    profileAPI();
    aboutAPI();
  }, []);

// st


  useEffect(() => {
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
        console.error("Error loading scripts:", error);
      }
    };

    loadScripts();
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
      initializeSocialMedia();
    } catch (error) {
      console.error("Error initializing:", error);
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
      console.error("Error initializing social media:", error);
    }
  };


// end
  function profileAPI() {
    axios
      .get("/api/frontend/profile", {
        headers: {
          Authorization: process.env.NEXT_PUBLIC_MY_API_KEY,
        },
      })
      .then((res) => {
        const data = res.data;
        if (Array.isArray(data) && data.length > 0) {
          setBio(data[0].content);
          setachive(data[1].content);

          setBiovisi(data[0].visibility);
          setachivevisi(data[1].visibility);
        } else if (data.content) {
          setBio(data[0].content);
          setachive(data[1].content);

          setBiovisi(data[0].visibility);
          setachivevisi(data[1].visibility);
        }
      })
      .catch(() => setBio(""));
  }

  function aboutAPI() {
    axios
      .get("/api/frontend/specs", {
        headers: {
          Authorization: process.env.NEXT_PUBLIC_MY_API_KEY,
        },
      })
      .then((res) => {
        const rawdata = res.data;
        const data = rawdata["data"][0]["data"];
        const visibility = rawdata["data"][0]["visibility"];
        console.log(visibility);
        console.log(data);
        if (data) {
          setAbout(data);
          setAboutvisi(visibility);
        }
      })
      .catch(() => setBio(""));
  }


    

  return (
    <>
      {/* About Section Header */}
      <div className="flex flex-row mt-5 mb-2.5 px-2 sm:px-0">
        <div className="typeH text-custom-typeH text-xl sm:text-2xl font-playfair"></div>
        <span
          id="aboutani"
          className="text-xl sm:text-2xl font-playfair text-custom-text"
        ></span>
      </div>

      {/* About Section */}
      <div className="flex flex-col sm:flex-row" id="about">
        <div className="font-ibm-plex text-custom-text2 w-full sm:w-1/2 px-2 sm:px-0">
          {!aboutvisi ? (
            <p className="text-base sm:text-lg text-center">-</p>
          ) : !about ? (
            <TextSkeleton width="w-1/2" height="h-4" />
          ) : (
            <div 
              className="text-base sm:text-lg leading-relaxed prose prose-sm max-w-none
                         prose-p:text-custom-text2 prose-strong:text-custom-heading
                         prose-a:text-custom-typeH prose-a:hover:text-custom-heading"
              dangerouslySetInnerHTML={{ __html: about }} 
            />
          )}
        </div>
        
        <div className="w-full sm:w-1/2 flex flex-col items-center justify-center font-playfair p-0 pl-0 sm:pl-1.5 mt-6 sm:mt-0">
          {/* Profile Image */}
          <img
            className="w-[90px] h-[90px] sm:w-[120px] sm:h-[120px] border-2 border-custom-text p-1.5 rounded-full"
            src="/assets/img/dp.jpg"
            alt="my logo"
          />
          <h2 className="m-0 p-0 text-lg sm:text-xl">Shalitha Madhuwantha</h2>
          <p className="text-center m-0 p-0 text-custom-text2 text-base sm:text-lg">
            {/* bio sections */}
            {biovisi === true
              ? bio || <TextSkeleton width="w-1/2" height="h-4" />
              : "-"}
          </p>
          <p className="text-center m-0 p-0 text-custom-text2 text-xs sm:text-sm">
            CTF player | Reverse Engineer | Content Creator | Public Speaker |
            Exploit Developer
          </p>

          {/* Social Media Icons */}
          <div className="social_listJS mt-2 mb-2" />

          <button
            className="bg-transparent text-custom-typeH cursor-pointer border-0 p-0 m-0 text-sm sm:text-base"
            onClick={() => {
              const modal = document.getElementById("contactmebg");
              if (modal) modal.style.visibility = "visible";
            }}
          >
            <i className="fa-brands fa-medapps"></i> More About
          </button>

          <hr className="w-full border border-[#343434] mt-2" />

          <div className="achiev w-full">
            <h3 className="text-custom-heading text-center text-base sm:text-lg">
              <i className="fa-solid fa-medal text-custom-text2"></i> My
              achievement
            </h3>
            {achivevisi === true ? (
              <div className="overflow-x-auto w-full">
                <table className="w-full min-w-[300px] border-collapse text-custom-text2 font-space-mono text-xs sm:text-base">
                  <tbody>
                    {achive ? (
                      achive
                        .split(/\r?\n/)
                        .reduce(
                          (rows: string[][], item: string, idx: number) => {
                            if (idx % 2 === 0) {
                              rows.push([item]);
                            } else {
                              rows[rows.length - 1].push(item);
                            }
                            return rows;
                          },
                          []
                        )
                        .map((pair, idx) => (
                          <tr
                            key={idx}
                            className="flex flex-col sm:table-row w-full"
                          >
                            <td className="w-full sm:w-1/2 p-2.5 align-top flex-1">
                              <i className="fa-regular fa-star text-custom-heading"></i>{" "}
                              {pair[0]}
                            </td>
                            <td className="w-full sm:w-1/2 p-2.5 align-top flex-1">
                              {pair[1] && (
                                <>
                                  <i className="fa-regular fa-star text-custom-heading"></i>{" "}
                                  {pair[1]}
                                </>
                              )}
                            </td>
                          </tr>
                        ))
                    ) : (
                      <TextSkeleton width="w-1/2" height="h-4" />
                    )}
                  </tbody>
                </table>
              </div>
            ) : (
              <p className="text-center text-custom-text2">-</p>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
