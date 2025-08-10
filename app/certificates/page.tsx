"use client";

import React from "react";
import PgHeader from "@/components/PgHeader";
//  cutome module linking
import Certs from "@/components/submodule/Certs";

export default function CertificatesPage() {
    return (
        <main>
            <PgHeader page="Certificates" desc="Here are my certificates and achievements." />
            <Certs />
        </main>
    );
}