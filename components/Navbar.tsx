"use client";

import { cn } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import {
  Show,
  SignInButton,
  SignUpButton,
  UserButton,
  useUser,
} from "@clerk/nextjs";
import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";

const navItems = [
  { label: "Library", href: "/" },
  { label: "Add New", href: "/books/new" },
  { label: "Pricing", href: "/subscriptions" },
];

const Navbar = () => {
  const pathName = usePathname();
  const { user } = useUser();
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <header className="w-full fixed z-50 bg-(--bg-primary)">
      <div className="wrapper navbar-height py-4 flex justify-between items-center">
        <Link
          href="/"
          className="flex gap-0.5 items-center"
          onClick={() => setMobileOpen(false)}
        >
          <Image src="/assets/logo.png" alt="Narravox" width={42} height={26} />
          <span className="logo-text">Narravox</span>
        </Link>

        {/* Desktop nav */}
        <nav className="hidden md:flex gap-7.5 items-center">
          {navItems.map(({ label, href }) => {
            const isActive =
              pathName === href || (href !== "/" && pathName?.startsWith(href));
            return (
              <Link
                key={label}
                href={href}
                className={cn(
                  "nav-link-base",
                  isActive ? "nav-link-active" : "text-black hover:opacity-70"
                )}
              >
                {label}
              </Link>
            );
          })}

          <div className="flex items-center gap-4 ml-4">
            <Show when="signed-out">
              <SignInButton mode="modal">
                <Button>Sign In</Button>
              </SignInButton>
              <SignUpButton mode="modal">
                <Button variant="outline">Sign Up</Button>
              </SignUpButton>
            </Show>
            <Show when="signed-in">
              <div className="nav-user-link">
                <UserButton />
                {user?.firstName && (
                  <Link href="/subscriptions" className="nav-user-name">
                    {user.firstName}
                  </Link>
                )}
              </div>
            </Show>
          </div>
        </nav>

        {/* Mobile: auth + hamburger */}
        <div className="flex md:hidden items-center gap-3">
          <Show when="signed-in">
            <UserButton />
          </Show>
          <Show when="signed-out">
            <SignInButton mode="modal">
              <Button size="sm">Sign In</Button>
            </SignInButton>
          </Show>
          <button
            className="p-1 text-black"
            onClick={() => setMobileOpen((v) => !v)}
            aria-label="Toggle menu"
            type="button"
          >
            {mobileOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile dropdown */}
      {mobileOpen && (
        <div className="md:hidden bg-(--bg-primary) border-t border-(--border-subtle) px-5 py-4 flex flex-col gap-4">
          {navItems.map(({ label, href }) => {
            const isActive =
              pathName === href || (href !== "/" && pathName?.startsWith(href));
            return (
              <Link
                key={label}
                href={href}
                className={cn(
                  "nav-link-base text-lg py-1",
                  isActive ? "nav-link-active" : "text-black hover:opacity-70"
                )}
                onClick={() => setMobileOpen(false)}
              >
                {label}
              </Link>
            );
          })}
          <Show when="signed-out">
            <SignUpButton mode="modal">
              <Button
                variant="outline"
                className="w-full"
                onClick={() => setMobileOpen(false)}
              >
                Sign Up
              </Button>
            </SignUpButton>
          </Show>
        </div>
      )}
    </header>
  );
};

export default Navbar;
