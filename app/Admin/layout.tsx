"use client";

import React from "react";
import SidebarNav from "@/components/Admin/plugin/SideNav";
import { navItems } from "@/components/Admin/plugin/navItems";
import { usePathname } from "next/navigation";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const isLoginPage = pathname === "/Admin/login";
  const isNotAccessPage = pathname === "/Admin/not-access";
  // Hardcoded example profile info - replace with actual user info from session or props
  const profile = {
    name: "John Doe",
    email: "john.doe@example.com",
    image: "https://i.pravatar.cc/150?u=john.doe@example.com",
  };
  // Only show layout if it's not the login page
  if (isLoginPage || isNotAccessPage) {
    return <>{children}</>;
  }

  return (
    <div style={{ display: "flex", height: "100vh", backgroundColor: "#000" }}>
      <SidebarNav navItems={navItems} />
      <main
        style={{
          flexGrow: 1,
          padding: "2rem",
          color: "#bc9f00",
          overflowY: "auto",
          fontFamily: "'Courier New', monospace",
        }}
      >
        {children}
      </main>
    </div>
  );
}
