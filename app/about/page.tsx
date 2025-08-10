"use client";

import React from "react";
import Head from "next/head";

import PgHeader from "@/components/PgHeader";
import About from "@/components/About";
import Highlights from "@/components/Heiglightme";

export default function AboutPage() {
  return (
    <>
      <Head>
        {/* Basic SEO */}
        <title>About Shalitha Madhuwantha – Cybersecurity Specialist & Exploit Developer</title>
        <meta
          name="description"
          content="Shalitha Madhuwantha is a cybersecurity enthusiast, exploit developer, system engineer skilled in Linux and Windows, and a penetration testing specialist."
        />
        <meta
          name="keywords"
          content="Shalitha Madhuwantha, cybersecurity, exploit developer, system engineer, Linux, Windows, penetration testing, ethical hacking, security researcher"
        />
        <meta name="author" content="Shalitha Madhuwantha" />
        <meta name="robots" content="index, follow" />
        <meta httpEquiv="Content-Type" content="text/html; charset=utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />

        {/* Open Graph / Facebook */}
        <meta property="og:title" content="About Shalitha Madhuwantha – Cybersecurity Specialist & Exploit Developer" />
        <meta
          property="og:description"
          content="Shalitha Madhuwantha is a cybersecurity enthusiast, exploit developer, system engineer skilled in Linux and Windows, and a penetration testing specialist."
        />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://shalitha.me/about" />
        <meta property="og:image" content="https://shalitha.me/assets/img/dp.jpg" />

        {/* Twitter */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="About Shalitha Madhuwantha – Cybersecurity Specialist & Exploit Developer" />
        <meta
          name="twitter:description"
          content="Shalitha Madhuwantha is a cybersecurity enthusiast, exploit developer, system engineer skilled in Linux and Windows, and a penetration testing specialist."
        />
        <meta name="twitter:image" content="https://shalitha.me/assets/img/dp.jpg" />
      </Head>
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
