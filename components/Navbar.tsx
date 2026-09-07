"use client";
import Link from "next/link";
import { useState } from "react";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className=" flex justify-between  items-center px-5 py-3 lg:px-20 bg-black/30 backdrop-blur-md shadow sticky top-0 z-50">
      {/* logo */}
      <div>
        <Link className="flex items-center gap-3" href="/">
          <span className="grid place-items-center size-10 rounded-md bg-gradient-gold text-primary-foreground shadow-gold">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="lucide lucide-scale size-5"
              aria-hidden="true"
            >
              <path d="M12 3v18"></path>
              <path d="m19 8 3 8a5 5 0 0 1-6 0zV7"></path>
              <path d="M3 7h1a17 17 0 0 0 8-2 17 17 0 0 0 8 2h1"></path>
              <path d="m5 8 3 8a5 5 0 0 1-6 0zV7"></path>
              <path d="M7 21h10"></path>
            </svg>
          </span>{" "}
          <div className="leading-tight">
            <div className="text-base font-semibold tracking-wide text-white">محمود حسن</div>
            <div className="text-[11px] text-gold tracking-[0.3em]">مستشار قانوني</div>
          </div>
        </Link>
      </div>

      {/* links - desktop */}
      <ul className="hidden md:flex gap-6">
        <li>
          <Link className="nav-link" href="/">
            الرئيسية
          </Link>
        </li>
        <li>
          <Link className="nav-link" href="/about">
            عن المحامي
          </Link>
        </li>
        <li>
          <Link className="nav-link" href="/services">
            الخدمات
          </Link>
        </li>
        <li>
          <Link className="nav-link" href="/contact">
            تواصل معنا
          </Link>
        </li>
      </ul>

      {/* button - desktop */}
      <button className="hidden text-sm md:block btn-gold">احجز استشارتك</button>

      {/* hamburger - mobile */}
      <button className="md:hidden text-white text-2xl" onClick={() => setIsOpen(!isOpen)}>
        ☰
      </button>

      {/* mobile menu */}
      {isOpen && (
        <div className="absolute top-full right-0 w-full bg-black/90 p-6 flex flex-col gap-4 md:hidden">
          <Link className="nav-link" href="/">
            الرئيسية
          </Link>
          <Link className="nav-link" href="/about">
            عن المحامي
          </Link>
          <Link className="nav-link" href="/services">
            الخدمات
          </Link>
          <Link className="nav-link" href="/contact">
            تواصل معنا
          </Link>
          <button className="btn-gold w-full">احجز استشارتك</button>
        </div>
      )}
    </nav>
  );
}
