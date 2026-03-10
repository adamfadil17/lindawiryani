"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  MapPin,
  Sparkles,
  Heart,
  BookOpen,
  ImageIcon,
  Briefcase,
  MessageSquare,
  ChevronRight,
  LogOut,
  Settings,
  Bell,
  Menu,
  X,
  LayoutDashboard,
  Hotel,
  Newspaper,
} from "lucide-react";

// ─── Types ────────────────────────────────────────────────────────────────────

interface NavItem {
  label: string;
  href: string;
  icon: React.ReactNode;
  badge?: number;
}

interface NavGroup {
  group: string;
  items: NavItem[];
}

// ─── Nav Config ───────────────────────────────────────────────────────────────

const navGroups: NavGroup[] = [
  {
    group: "Overview",
    items: [
      {
        label: "Dashboard",
        href: "/dashboard",
        icon: <LayoutDashboard className="w-4 h-4" />,
      },
    ],
  },
  {
    group: "Content",
    items: [
      {
        label: "Destinations",
        href: "/dashboard/destinations",
        icon: <MapPin className="w-4 h-4" />,
      },
      {
        label: "Wedding Themes",
        href: "/dashboard/wedding-themes",
        icon: <Sparkles className="w-4 h-4" />,
      },
      {
        label: "Wedding Experiences",
        href: "/dashboard/wedding-experiences",
        icon: <Heart className="w-4 h-4" />,
      },
      {
        label: "Venues",
        href: "/dashboard/venues",
        icon: <Hotel className="w-4 h-4" />,
      },
      {
        label: "Journal",
        href: "/dashboard/journal",
        icon: <BookOpen className="w-4 h-4" />,
      },
      {
        label: "Portfolio",
        href: "/dashboard/portfolio",
        icon: <Newspaper className="w-4 h-4" />,
      },
    ],
  },
  {
    group: "Operations",
    items: [
      {
        label: "Career & Partnership",
        href: "/dashboard/career-partnership",
        icon: <Briefcase className="w-4 h-4" />,
      },
      {
        label: "Inquiry",
        href: "/dashboard/inquiry",
        icon: <MessageSquare className="w-4 h-4" />,
        badge: 3,
      },
    ],
  },
];

// ─── Sidebar Component ────────────────────────────────────────────────────────

function Sidebar({
  collapsed,
  onToggle,
}: {
  collapsed: boolean;
  onToggle: () => void;
}) {
  const pathname = usePathname();

  return (
    <aside
      className={`
        hidden lg:flex flex-col h-screen sticky top-0
        border-r border-primary/20 bg-white transition-all duration-300 ease-in-out
        ${collapsed ? "w-[72px]" : "w-[240px]"}
      `}
    >
      {/* Logo */}
      <div
        className={`flex items-center border-b border-primary/20 h-[72px] px-4 ${
          collapsed ? "justify-center" : "justify-between"
        }`}
      >
        {!collapsed && (
          <Link href="/dashboard" className="flex-1 flex justify-center">
            <Image
              src="/images/logo-gray.png"
              alt="Linda Wiryani | Luxury Wedding Planner & Designer in Bali"
              className="h-10 w-auto"
              width={120}
              height={40}
            />
          </Link>
        )}
        {collapsed && (
          <Link href="/dashboard">
            <div className="w-9 h-9 bg-primary flex items-center justify-center flex-shrink-0">
              <span className="text-white text-sm font-semibold tracking-widest">
                L
              </span>
            </div>
          </Link>
        )}
        <button
          onClick={onToggle}
          className="text-primary/40 hover:text-primary transition-colors flex-shrink-0"
          aria-label="Toggle sidebar"
        >
          <ChevronRight
            className={`w-4 h-4 transition-transform duration-300 ${
              collapsed ? "" : "rotate-180"
            }`}
          />
        </button>
      </div>

      {/* Nav */}
      <nav className="flex-1 overflow-y-auto py-6 px-3 space-y-6">
        {navGroups.map((group) => (
          <div key={group.group}>
            {!collapsed && (
              <p className="text-primary/80 tracking-[0.2em] uppercase text-[10px] mb-3 px-3">
                {group.group}
              </p>
            )}
            <ul className="space-y-1">
              {group.items.map((item) => {
                const isActive =
                  item.href === "/dashboard"
                    ? pathname === "/dashboard"
                    : pathname.startsWith(item.href);

                return (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      title={collapsed ? item.label : undefined}
                      className={`
                        flex items-center gap-3 px-3 py-2.5 transition-all duration-200 group relative
                        ${collapsed ? "justify-center" : ""}
                        ${
                          isActive
                            ? "bg-primary text-white"
                            : "text-primary/60 hover:text-primary hover:bg-primary/20"
                        }
                      `}
                    >
                      <span className="flex-shrink-0">{item.icon}</span>
                      {!collapsed && (
                        <>
                          <span className="text-xs tracking-[0.1em] uppercase font-medium flex-1">
                            {item.label}
                          </span>
                          {item.badge && (
                            <span className="bg-primary/20 text-primary text-xs px-1.5 py-0.5 min-w-[18px] text-center">
                              {item.badge}
                            </span>
                          )}
                        </>
                      )}
                      {/* Active indicator */}
                      {isActive && !collapsed && (
                        <span className="absolute right-0 top-1/2 -translate-y-1/2 w-0.5 h-4 bg-white/80" />
                      )}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>
        ))}
      </nav>

      {/* Footer */}
      <div className="border-t border-primary/20 p-3 space-y-1">
        <Link
          href="/dashboard/settings"
          className={`flex items-center gap-3 px-3 py-2.5 text-primary/80 hover:text-primary hover:bg-primary/5 transition-colors ${
            collapsed ? "justify-center" : ""
          }`}
          title={collapsed ? "Settings" : undefined}
        >
          <Settings className="w-4 h-4 flex-shrink-0" />
          {!collapsed && (
            <span className="text-xs tracking-[0.1em] uppercase">Settings</span>
          )}
        </Link>
        <button
          className={`w-full flex items-center gap-3 px-3 py-2.5 text-primary/80 hover:cursor-pointer hover:text-red-500 hover:bg-red-50 transition-colors ${
            collapsed ? "justify-center" : ""
          }`}
          title={collapsed ? "Sign Out" : undefined}
          onClick={() => {
            document.cookie =
              "token=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT";
            localStorage.removeItem("token");
            window.location.href = "/login";
          }}
        >
          <LogOut className="w-4 h-4 flex-shrink-0" />
          {!collapsed && (
            <span className="text-xs tracking-[0.1em] uppercase">Sign Out</span>
          )}
        </button>
      </div>
    </aside>
  );
}

// ─── Mobile Sidebar ───────────────────────────────────────────────────────────

function MobileSidebar({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  const pathname = usePathname();

  return (
    <>
      {/* Backdrop */}
      <div
        className={`fixed inset-0 bg-black/40 z-40 lg:hidden transition-opacity duration-300 ${
          open
            ? "opacity-100 pointer-events-auto"
            : "opacity-0 pointer-events-none"
        }`}
        onClick={onClose}
      />

      {/* Drawer */}
      <aside
        className={`fixed top-0 left-0 h-full w-[280px] bg-white z-50 lg:hidden flex flex-col transition-transform duration-300 ease-in-out ${
          open ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        {/* Logo */}
        <div className="flex items-center justify-between px-6 h-[72px] border-b border-primary/20">
          <Image
            src="/images/logo-gray.png"
            alt="Linda Wiryani | Luxury Wedding Planner & Designer in Bali"
            className="h-9 w-auto"
            width={120}
            height={36}
          />
          <button
            onClick={onClose}
            className="text-primary/40 hover:text-primary transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Nav */}
        <nav className="flex-1 overflow-y-auto py-6 px-4 space-y-6">
          {navGroups.map((group) => (
            <div key={group.group}>
              <p className="text-primary/80 tracking-[0.2em] uppercase text-[10px] mb-3 px-2">
                {group.group}
              </p>
              <ul className="space-y-1">
                {group.items.map((item) => {
                  const isActive =
                    item.href === "/dashboard"
                      ? pathname === "/dashboard"
                      : pathname.startsWith(item.href);

                  return (
                    <li key={item.href}>
                      <Link
                        href={item.href}
                        onClick={onClose}
                        className={`flex items-center gap-3 px-3 py-2.5 transition-all duration-200 ${
                          isActive
                            ? "bg-primary text-white"
                            : "text-primary/60 hover:text-primary hover:bg-primary/5"
                        }`}
                      >
                        <span className="flex-shrink-0">{item.icon}</span>
                        <span className="text-xs tracking-[0.1em] uppercase font-medium flex-1">
                          {item.label}
                        </span>
                        {item.badge && (
                          <span
                            className={`text-[10px] px-1.5 py-0.5 min-w-[18px] text-center ${
                              isActive
                                ? "bg-white/20 text-white"
                                : "bg-primary/20 text-primary"
                            }`}
                          >
                            {item.badge}
                          </span>
                        )}
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </div>
          ))}
        </nav>

        {/* Footer */}
        <div className="border-t border-primary/20 p-4 space-y-1">
          <Link
            href="/dashboard/settings"
            onClick={onClose}
            className="flex items-center gap-3 px-3 py-2.5 text-primary/80 hover:text-primary hover:bg-primary/5 transition-colors"
          >
            <Settings className="w-4 h-4" />
            <span className="text-xs tracking-[0.1em] uppercase">Settings</span>
          </Link>
          <button
            className="w-full flex items-center gap-3 px-3 py-2.5 text-primary/80 hover:cursor-pointer hover:text-red-500 hover:bg-red-50 transition-colors"
            onClick={() => {
              document.cookie =
                "token=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT";
              localStorage.removeItem("token");
              window.location.href = "/login";
            }}
          >
            <LogOut className="w-4 h-4" />
            <span className="text-xs tracking-[0.1em] uppercase">Sign Out</span>
          </button>
        </div>
      </aside>
    </>
  );
}

// ─── Header Component ─────────────────────────────────────────────────────────

function Header({ onMobileMenuOpen }: { onMobileMenuOpen: () => void }) {
  const pathname = usePathname();

  // Derive page title from pathname
  const pageTitle = (() => {
    const segment = pathname.split("/").filter(Boolean).at(-1) ?? "dashboard";
    return segment
      .split("-")
      .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
      .join(" ");
  })();

  return (
    <header className="h-[72px] border-b border-primary/20 bg-white flex items-center justify-between px-6 sticky top-0 z-30">
      {/* Left: hamburger (mobile) + breadcrumb */}
      <div className="flex items-center gap-4">
        <button
          onClick={onMobileMenuOpen}
          className="lg:hidden text-primary/80 hover:text-primary transition-colors"
          aria-label="Open menu"
        >
          <Menu className="w-5 h-5" />
        </button>
        <div>
          <p className="text-primary/80 tracking-[0.2em] uppercase text-[10px]">
            Studio Portal
          </p>
          <h1 className="text-primary font-semibold text-sm tracking-wide">
            {pageTitle}
          </h1>
        </div>
      </div>

      {/* Right: notifications + user avatar */}
      <div className="flex items-center gap-3">
        {/* Notification bell */}
        <button className="relative w-9 h-9 flex items-center justify-center text-primary/80 hover:cursor-pointer hover:text-primary hover:bg-primary/20 transition-colors">
          <Bell className="w-4 h-4" />
          <span className="absolute top-1.5 right-1.5 w-1.5 h-1.5 bg-primary rounded-full" />
        </button>

        {/* Divider */}
        <div className="w-px h-6 bg-primary/20" />

        {/* User avatar */}
        <div className="flex items-center gap-3 cursor-pointer group">
          <div className="text-right hidden sm:block">
            <p className="text-primary text-sm font-medium tracking-wide">
              Admin
            </p>
            <p className="text-primary/80 text-xs tracking-wider uppercase">
              Administrator
            </p>
          </div>
          <div className="w-9 h-9 bg-primary flex items-center justify-center flex-shrink-0 relative">
            <span className="text-white text-xs font-semibold tracking-widest">
              A
            </span>
            {/* Online indicator */}
            <span className="absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 bg-green-400 border-2 border-white rounded-full" />
          </div>
        </div>
      </div>
    </header>
  );
}

// ─── Layout ───────────────────────────────────────────────────────────────────

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <div className="flex h-screen bg-[#fafaf9] overflow-hidden">
      {/* Desktop Sidebar */}
      <Sidebar
        collapsed={sidebarCollapsed}
        onToggle={() => setSidebarCollapsed((v) => !v)}
      />

      {/* Mobile Sidebar */}
      <MobileSidebar open={mobileOpen} onClose={() => setMobileOpen(false)} />

      {/* Main content area */}
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        {/* Header */}
        <Header onMobileMenuOpen={() => setMobileOpen(true)} />

        {/* Page content */}
        <main className="flex-1 overflow-y-auto">{children}</main>
      </div>
    </div>
  );
}
