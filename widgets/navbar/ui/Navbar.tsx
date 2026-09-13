"use client";

import Link from "next/link";
import { useState } from "react";
import { Logo } from "@/entities/office";
import { mainNav } from "@/shared/config/navigation";
import { ButtonLink } from "@/shared/ui";

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const close = () => setIsOpen(false);

  return (
    <nav className="flex justify-between items-center px-5 py-3 lg:px-20 bg-black/30 backdrop-blur-md shadow sticky top-0 z-50">
      <Logo />

      <ul className="hidden md:flex gap-6">
        {mainNav.map((link) => (
          <li key={link.href}>
            <Link className="nav-link" href={link.href}>
              {link.label}
            </Link>
          </li>
        ))}
      </ul>

      <ButtonLink href="/#contact" className="hidden text-sm md:block">
        احجز استشارتك
      </ButtonLink>

      <button
        className="md:hidden text-white text-2xl"
        onClick={() => setIsOpen(!isOpen)}
        aria-expanded={isOpen}
        aria-label="القائمة"
      >
        ☰
      </button>

      {isOpen && (
        <div className="absolute top-full right-0 w-full bg-black/90 p-6 flex flex-col gap-4 md:hidden">
          {mainNav.map((link) => (
            <Link key={link.href} className="nav-link" href={link.href} onClick={close}>
              {link.label}
            </Link>
          ))}
          <ButtonLink href="/#contact" className="w-full text-center" onClick={close}>
            احجز استشارتك
          </ButtonLink>
        </div>
      )}
    </nav>
  );
}
