"use client";

import { useSession, signOut } from "next-auth/react";
import ProtectedPage from "@/components/Admin/plugin/PageProtector";
import VisitorStats from "@/components/Admin/VisitorStats";

export default function Dashboard() {
  const { data: session, status } = useSession();

  if (status === "loading") {
    return <div>Loading session...</div>;
  }

  // Either the user object from the session or null
  const user = session?.user ?? null;

  return (
    <ProtectedPage>
      <div>
        <h1>Welcome, {user?.name ?? "Guest"}</h1>
        <VisitorStats />
      </div>
    </ProtectedPage>
  );
}
