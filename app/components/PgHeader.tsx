import React from "react";
import { useEffect, useState } from "react";


interface PgHeaderProps {
    page?: string;
    desc?: string;
}

const PgHeader: React.FC<PgHeaderProps> = ({ page = "about" , desc="test"}) => {
        useEffect(() => {
        const loadScripts = async () => {
          try {
            // Load Font Awesome
            if (!document.querySelector('script[src*="fontawesome"]')) {
              const fontAwesome = document.createElement("script");
              fontAwesome.src = "https://kit.fontawesome.com/8026947c0c.js";
              fontAwesome.crossOrigin = "anonymous";
              document.head.appendChild(fontAwesome);
            }
          } catch (error) {
            console.error("Error loading scripts:", error);
          }
        };
    
        loadScripts();
      }, []);

  return (
    <header className="w-full py-12 px-4 md:px-0 mb-8">
      <div className=" mx-auto ml-16">
        {/* Title */}
        <h1 className="text-4xl md:text-5xl font-playfair font-bold  mb-4 tracking-tight" style={{ color: "#bc9f00" }}>
          {page}
        </h1>
        
        {/* Description */}
        <p className="text-lg md:text-xl text-custom-text2 font-normal max-w-2xl  leading-relaxed">
          {desc}
        </p>
        
        {/* Simple divider */}
        <div className="w-20 h-0.5 bg-custom-text2/30  mt-8"></div>
      </div>
    </header>
  );
};

export default PgHeader;
