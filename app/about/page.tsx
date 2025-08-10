"use client";

import React from "react";

import PgHeader from "@/components/PgHeader";
//  cutome module linking
import About from "@/components/About";
import Highlights from "@/components/Heiglightme";

export default function AboutPage() {

    return (
        <main>
            <PgHeader page="About Me" desc="Learn more about my background and experiences." />
            <div className="m-8">
            <About />
            <Highlights />
            </div>
        </main>
    );
}