// pages/Admin/Dashboard.tsx
"use client";

import { useSession, signOut } from "next-auth/react";
import ProtectedPage from "@/components/Admin/plugin/PageProtector";
import VisitorStats from "@/components/Admin/VisitorStats";

export default function Dashboard() {
  const { data: session, status } = useSession();

  if (status === "loading") {
    return <div>Loading session...</div>;
  }
let user = "";
  if (session) {
    
     user = session.user ?? {};
  }else{
      user = "";
  }

  // Session info

  return (
    <>
      <ProtectedPage>
       
        <VisitorStats />
      </ProtectedPage>
    </>
  );
}

