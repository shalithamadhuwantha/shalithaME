"use client";

import React from "react";
import { NextSeo } from "next-seo";

import PgHeader from "@/components/PgHeader";
import About from "@/components/About";
import Highlights from "@/components/Heiglightme";

export default function AboutPage() {
  return (
    <>
      <NextSeo
        title="About Me | Shalitha Madhuwantha"
        description="Cybersecurity enthusiast, exploit developer, and Linux system engineer specializing in penetration testing and system hardening."
        openGraph={{
          url: "https://shalitha.me/about",
          title: "About Me | Shalitha Madhuwantha",
          description:
            "Cybersecurity enthusiast, exploit developer, and Linux system engineer specializing in penetration testing and system hardening.",
          images: [
            {
              url: "https://shalitha.me/assets/img/dp.jpg",
              width: 1200,
              height: 630,
              alt: "Shalitha Madhuwantha - Cybersecurity Enthusiast",
            },
          ],
          site_name: "Shalitha.me",
        }}
        twitter={{
          handle: "@shalithamadh",
          site: "@shalithamadh",
          cardType: "summary_large_image",
        }}
      />

      <main>
        <PgHeader page="About Me" desc="Learn more about my background and experiences." />
        <div className="m-8">
          <About />
          <Highlights />
        </div>
      </main>
    </>
  );
}
