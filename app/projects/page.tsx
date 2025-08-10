"use client";

import React from "react";
import PgHeader from "@/components/PgHeader";
import Thoughts from "@/components/Thoughts";

export default function ThoughtsPage() {
    return (
        <main>
            <PgHeader 
                page="Thoughts & Projects" 
                desc="Explore my thoughts, projects, and creative endeavors across different domains." 
            />
            <div className="m-8">
                <Thoughts />
            </div>
        </main>
    );
}
