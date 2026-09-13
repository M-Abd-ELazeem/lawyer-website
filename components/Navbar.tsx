"use client";
import Link from "next/link";
import { useState } from "react";
import { mainNav } from "@/config/navigation";
import { siteConfig } from "@/config/site";
import { ScaleIcon } from "@/components/icons";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className=" flex justify-between  items-center px-5 py-3 lg:px-20 bg-black/30 backdrop-blur-md shadow sticky top-0 z-50">
      {/* logo */}
      <div>
        <Link className="flex items-center gap-3" href="/">
          <span className="grid place-items-center size-10 rounded-md bg-gradient-gold text-primary-foreground shadow-gold">
            <ScaleIcon className="size-5" />
          </span>{" "}
          <div className="leading-tight">
            <div className="text-base font-semibold tracking-wide text-white">{siteConfig.name}</div>
            <div className="text-[11px] text-gold tracking-[0.3em]">{siteConfig.title}</div>
          </div>
        </Link>
      </div>

      {/* links - desktop */}
      <ul className="hidden md:flex gap-6">
        {mainNav.map((link) => (
          <li key={link.href}>
            <Link className="nav-link" href={link.href}>
              {link.label}
            </Link>
          </li>
        ))}
      </ul>

      {/* button - desktop */}
      <Link href="/#contact" className="hidden text-sm md:block btn-gold">
        احجز استشارتك
      </Link>

      {/* hamburger - mobile */}
      <button
        className="md:hidden text-white text-2xl"
        onClick={() => setIsOpen(!isOpen)}
        aria-expanded={isOpen}
        aria-label="القائمة"
      >
        ☰
      </button>

      {/* mobile menu */}
      {isOpen && (
        <div className="absolute top-full right-0 w-full bg-black/90 p-6 flex flex-col gap-4 md:hidden">
          {mainNav.map((link) => (
            <Link key={link.href} className="nav-link" href={link.href} onClick={() => setIsOpen(false)}>
              {link.label}
            </Link>
          ))}
          <Link href="/#contact" className="btn-gold w-full text-center" onClick={() => setIsOpen(false)}>
            احجز استشارتك
          </Link>
        </div>
      )}
    </nav>
  );
}
