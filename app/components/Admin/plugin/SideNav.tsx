'use client'

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useSession, signOut } from "next-auth/react";

interface NavItem {
  displayName: string;
  icon: string;
  url: string;
  subItems?: NavItem[];
}

interface SidebarNavProps {
  navItems: NavItem[];
}

export default function SidebarNav({ navItems }: SidebarNavProps) {
  const { data: session } = useSession();
  const [collapsed, setCollapsed] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [openSubmenus, setOpenSubmenus] = useState<Record<string, boolean>>({});
  const [isMobile, setIsMobile] = useState(false);
  const pathname = usePathname();

  const user = session?.user ?? {
    name: "Unknown",
    email: "no@email.com",
    image: "",
  };

  // Handle responsive behavior
  useEffect(() => {
    const handleResize = () => {
      const mobile = window.innerWidth <= 768;
      setIsMobile(mobile);
      
      // Auto-collapse on tablet sizes
      if (window.innerWidth <= 1024 && window.innerWidth > 768) {
        setCollapsed(true);
      } else if (window.innerWidth > 1024) {
        setCollapsed(false);
      }
      
      // Close mobile menu when resizing to desktop
      if (window.innerWidth > 768) {
        setMobileMenuOpen(false);
      }
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Close mobile menu when clicking outside or navigating
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as Element;
      if (isMobile && mobileMenuOpen && !target.closest('[data-sidebar]')) {
        setMobileMenuOpen(false);
      }
    };

    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, [isMobile, mobileMenuOpen]);

  // Close mobile menu on route change
  useEffect(() => {
    if (isMobile) {
      setMobileMenuOpen(false);
    }
  }, [pathname, isMobile]);

  function toggleCollapse() {
    if (!isMobile) {
      setCollapsed(!collapsed);
    }
  }

  function toggleMobileMenu() {
    setMobileMenuOpen(!mobileMenuOpen);
  }

  function toggleSubmenu(name: string) {
    setOpenSubmenus((prev) => ({
      ...prev,
      [name]: !prev[name],
    }));
  }

  // Mobile hamburger button
  if (isMobile) {
    return (
      <>
        {/* Mobile Header */}
        <div
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            height: '60px',
            backgroundColor: '#111',
            borderBottom: '1px solid #333',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            padding: '0 1rem',
            zIndex: 1001,
            fontFamily: "'Courier New', monospace",
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
            {user.image ? (
              <img
                src={user.image}
                alt="Profile Picture"
                style={{
                  width: 35,
                  height: 35,
                  borderRadius: "50%",
                  objectFit: "cover",
                }}
              />
            ) : (
              <div
                style={{
                  width: 35,
                  height: 35,
                  borderRadius: "50%",
                  backgroundColor: "#444",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontWeight: "bold",
                  fontSize: "1rem",
                  color: "#bc9f00",
                }}
              >
                {user.name?.[0]?.toUpperCase() ?? "?"}
              </div>
            )}
            <div style={{ color: "#bc9f00" }}>
              <div style={{ fontWeight: "bold", fontSize: "0.9rem" }}>
                {user.name}
              </div>
            </div>
          </div>
          
          <button
            onClick={toggleMobileMenu}
            style={{
              background: "none",
              border: "none",
              color: "#bc9f00",
              cursor: "pointer",
              fontSize: "1.5rem",
              padding: "0.5rem",
            }}
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? "✕" : "☰"}
          </button>
        </div>

        {/* Mobile Overlay */}
        {mobileMenuOpen && (
          <div
            style={{
              position: 'fixed',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              backgroundColor: 'rgba(0, 0, 0, 0.5)',
              zIndex: 1002,
            }}
            onClick={() => setMobileMenuOpen(false)}
          />
        )}

        {/* Mobile Sidebar */}
        <aside
          data-sidebar
          style={{
            position: 'fixed',
            top: '60px',
            left: mobileMenuOpen ? 0 : '-100%',
            width: '280px',
            height: 'calc(100vh - 60px)',
            backgroundColor: "#111",
            color: "#bc9f00",
            display: "flex",
            flexDirection: "column",
            transition: "left 0.3s ease",
            overflowY: "auto",
            fontFamily: "'Courier New', monospace",
            zIndex: 1003,
            borderRight: mobileMenuOpen ? '1px solid #333' : 'none',
          }}
        >
          {/* Navigation Items */}
          <nav style={{ flexGrow: 1, padding: '1rem 0' }}>
            {navItems.map(({ displayName, icon, url, subItems }) => {
              const isActive = pathname === url || pathname?.startsWith(url + "/");
              const isSubmenuOpen = openSubmenus[displayName];

              return (
                <div key={displayName}>
                  <Link
                    href={url}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      padding: "0.75rem 1rem",
                      color: isActive ? "#fff" : "#bc9f00",
                      backgroundColor: isActive ? "#333" : "transparent",
                      textDecoration: "none",
                      cursor: "pointer",
                      userSelect: "none",
                    }}
                    onClick={(e) => {
                      if (subItems) {
                        e.preventDefault();
                        toggleSubmenu(displayName);
                      }
                    }}
                  >
                    <span style={{ marginRight: "1rem", fontSize: "1.2rem" }}>
                      {icon}
                    </span>
                    <span style={{ flexGrow: 1 }}>{displayName}</span>
                    {subItems && (
                      <span
                        style={{
                          transform: isSubmenuOpen ? "rotate(90deg)" : "rotate(0deg)",
                          transition: "transform 0.3s",
                        }}
                      >
                        ▶
                      </span>
                    )}
                  </Link>

                  {/* Submenu */}
                  {subItems && isSubmenuOpen && (
                    <div style={{ paddingLeft: "2rem", backgroundColor: "#222" }}>
                      {subItems.map(({ displayName: subName, icon: subIcon, url: subUrl }) => {
                        const isSubActive = pathname === subUrl;
                        return (
                          <Link
                            key={subName}
                            href={subUrl}
                            style={{
                              display: "flex",
                              alignItems: "center",
                              padding: "0.5rem 1rem",
                              color: isSubActive ? "#fff" : "#bc9f00",
                              backgroundColor: isSubActive ? "#444" : "transparent",
                              textDecoration: "none",
                              cursor: "pointer",
                            }}
                          >
                            <span style={{ marginRight: "0.75rem" }}>{subIcon}</span>
                            {subName}
                          </Link>
                        );
                      })}
                    </div>
                  )}
                </div>
              );
            })}
          </nav>

          {/* Sign Out button */}
          <div style={{ padding: "1rem", borderTop: "1px solid #333" }}>
            <button
              onClick={() => signOut()}
              style={{
                background: "none",
                border: "1px solid #bc9f00",
                color: "#bc9f00",
                width: "100%",
                padding: "0.75rem",
                cursor: "pointer",
                fontWeight: "bold",
                fontSize: "0.9rem",
                borderRadius: "4px",
              }}
            >
              Sign Out
            </button>
          </div>
        </aside>
      </>
    );
  }

  // Desktop/Tablet Sidebar
  return (
    <aside
      data-sidebar
      style={{
        width: collapsed ? "60px" : "240px",
        backgroundColor: "#111",
        color: "#bc9f00",
        height: "100vh",
        display: "flex",
        flexDirection: "column",
        transition: "width 0.3s ease",
        overflowY: "auto",
        fontFamily: "'Courier New', monospace",
        position: "relative",
        minWidth: collapsed ? "60px" : "240px",
      }}
    >
      {/* Profile section */}
      <div
        style={{
          padding: "1rem",
          borderBottom: "1px solid #333",
          display: "flex",
          alignItems: "center",
          gap: collapsed ? 0 : "0.75rem",
          justifyContent: collapsed ? "center" : "flex-start",
          cursor: "default",
          minHeight: "80px",
        }}
      >
        {user.image ? (
          <img
            src={user.image}
            alt="Profile Picture"
            style={{
              width: 40,
              height: 40,
              borderRadius: "50%",
              objectFit: "cover",
              flexShrink: 0,
            }}
          />
        ) : (
          <div
            style={{
              width: 40,
              height: 40,
              borderRadius: "50%",
              backgroundColor: "#444",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontWeight: "bold",
              fontSize: "1.2rem",
              flexShrink: 0,
            }}
          >
            {user.name?.[0]?.toUpperCase() ?? "?"}
          </div>
        )}
        {!collapsed && (
          <div style={{ overflow: "hidden", whiteSpace: "nowrap", minWidth: 0 }}>
            <div style={{ 
              fontWeight: "bold", 
              fontSize: "1rem",
              textOverflow: "ellipsis",
              overflow: "hidden"
            }}>
              {user.name}
            </div>
            <div style={{ 
              fontSize: "0.75rem", 
              opacity: 0.8, 
              userSelect: "text",
              textOverflow: "ellipsis",
              overflow: "hidden"
            }}>
              {user.email}
            </div>
          </div>
        )}
      </div>

      {/* Collapse toggle */}
      <button
        onClick={toggleCollapse}
        aria-label={collapsed ? "Expand sidebar" : "Collapse sidebar"}
        style={{
          background: "none",
          border: "none",
          color: "#bc9f00",
          cursor: "pointer",
          padding: "0.75rem",
          fontSize: "1.5rem",
          alignSelf: collapsed ? "center" : "flex-end",
          marginTop: "0.5rem",
          marginBottom: "1rem",
        }}
      >
        {collapsed ? "➡️" : "⬅️"}
      </button>

      {/* Navigation Items */}
      <nav style={{ flexGrow: 1 }}>
        {navItems.map(({ displayName, icon, url, subItems }) => {
          const isActive = pathname === url || pathname?.startsWith(url + "/");
          const isSubmenuOpen = openSubmenus[displayName];

          return (
            <div key={displayName}>
              <Link
                href={url}
                style={{
                  display: "flex",
                  alignItems: "center",
                  padding: "0.75rem 1rem",
                  color: isActive ? "#fff" : "#bc9f00",
                  backgroundColor: isActive ? "#333" : "transparent",
                  textDecoration: "none",
                  cursor: "pointer",
                  userSelect: "none",
                }}
                onClick={(e) => {
                  if (subItems) {
                    e.preventDefault();
                    toggleSubmenu(displayName);
                  }
                }}
                title={collapsed ? displayName : undefined}
              >
                <span style={{ 
                  marginRight: collapsed ? 0 : "1rem", 
                  fontSize: "1.2rem",
                  flexShrink: 0
                }}>
                  {icon}
                </span>
                {!collapsed && (
                  <>
                    <span style={{ flexGrow: 1, minWidth: 0, overflow: "hidden", textOverflow: "ellipsis" }}>
                      {displayName}
                    </span>
                    {subItems && (
                      <span
                        style={{
                          transform: isSubmenuOpen ? "rotate(90deg)" : "rotate(0deg)",
                          transition: "transform 0.3s",
                          flexShrink: 0,
                        }}
                      >
                        ▶
                      </span>
                    )}
                  </>
                )}
              </Link>

              {/* Submenu */}
              {!collapsed && subItems && isSubmenuOpen && (
                <div style={{ paddingLeft: "2rem", backgroundColor: "#222" }}>
                  {subItems.map(({ displayName: subName, icon: subIcon, url: subUrl }) => {
                    const isSubActive = pathname === subUrl;
                    return (
                      <Link
                        key={subName}
                        href={subUrl}
                        style={{
                          display: "flex",
                          alignItems: "center",
                          padding: "0.5rem 1rem",
                          color: isSubActive ? "#fff" : "#bc9f00",
                          backgroundColor: isSubActive ? "#444" : "transparent",
                          textDecoration: "none",
                          cursor: "pointer",
                        }}
                      >
                        <span style={{ marginRight: "0.75rem", flexShrink: 0 }}>{subIcon}</span>
                        <span style={{ minWidth: 0, overflow: "hidden", textOverflow: "ellipsis" }}>
                          {subName}
                        </span>
                      </Link>
                    );
                  })}
                </div>
              )}
            </div>
          );
        })}
      </nav>

      {/* Sign Out button */}
      <div style={{ padding: "1rem", borderTop: "1px solid #333" }}>
        <button
          onClick={() => signOut()}
          style={{
            background: "none",
            border: "1px solid #bc9f00",
            color: "#bc9f00",
            width: "100%",
            padding: "0.5rem",
            cursor: "pointer",
            fontWeight: "bold",
            fontSize: "0.9rem",
            borderRadius: "4px",
          }}
        >
          {collapsed ? "⏻" : "Sign Out"}
        </button>
      </div>
    </aside>
  );
}