"use client";

import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from "react";
import { Phone } from "lucide-react";
import { company, contact, images, navigation } from "@/lib/site";

const navItems = navigation.main;
const ctaButton = navigation.cta;

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isMenuOpen]);

  return (
    <>
      {/* PC Header */}
      <header
        className={`hidden lg:block fixed top-0 left-0 right-0 z-[1000] h-20 transition-all duration-300 ${
          isScrolled ? "bg-white shadow-header" : "bg-transparent"
        }`}
      >
        <div className="flex items-center justify-between h-full px-12 max-w-[1400px] mx-auto">
          {/* Logo */}
          <Link href="/" className="flex items-center">
            <Image
              src={isScrolled ? images.logo : (images.logoWhite || images.logo)}
              alt={company.name || "会社ロゴ"}
              width={200}
              height={50}
              className={`transition-all duration-300 ${
                isScrolled ? "" : images.logoWhite ? "" : "brightness-0 invert"
              }`}
            />
          </Link>

          {/* PC Navigation + Phone + CTA */}
          <div className="flex items-center gap-8">
            <nav className="flex items-center gap-8">
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`text-[15px] font-medium transition-colors duration-200 hover:text-accent ${
                    isScrolled ? "text-primary" : "text-white"
                  }`}
                >
                  {item.label}
                </Link>
              ))}
            </nav>

            {/* Phone Number */}
            {contact.phone && (
              <a
                href={contact.phoneTel}
                className="flex items-center gap-2"
                aria-label={`電話でお問い合わせ ${contact.phoneFormatted}`}
              >
                <Phone
                  className={`w-5 h-5 ${isScrolled ? "text-accent" : "text-white"}`}
                />
                <div className="flex flex-col">
                  <span
                    className={`text-2xl font-bold tracking-wide ${
                      isScrolled ? "text-accent" : "text-white"
                    }`}
                  >
                    {contact.phoneFormatted}
                  </span>
                  <span
                    className={`text-[11px] ${
                      isScrolled ? "text-text-muted" : "text-white/70"
                    }`}
                  >
                    {contact.hours}
                  </span>
                </div>
              </a>
            )}

            {/* CTA Button */}
            {ctaButton.label && (
              <Link
                href={ctaButton.href}
                className="bg-accent text-white px-6 py-3 rounded-btn text-sm font-semibold transition-all duration-200 hover:bg-[#d35400] hover:scale-[1.02]"
              >
                {ctaButton.label}
              </Link>
            )}
          </div>
        </div>
      </header>

      {/* SP Header (fixed) */}
      <header className="lg:hidden fixed top-0 left-0 right-0 z-[1000] h-[60px] bg-white shadow-header">
        <div className="flex items-center justify-between h-full px-4">
          <Link href="/" className="flex items-center">
            <Image
              src={images.logo}
              alt={company.name || "会社ロゴ"}
              width={140}
              height={35}
            />
          </Link>

          <div className="flex items-center gap-2">
            {/* Phone Icon Button (SP) */}
            {contact.phone && (
              <a
                href={contact.phoneTel}
                className="w-10 h-10 flex items-center justify-center bg-accent rounded-full"
                aria-label="電話をかける"
              >
                <Phone className="w-5 h-5 text-white" />
              </a>
            )}

            <button
              className="w-11 h-11 flex items-center justify-center"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              aria-expanded={isMenuOpen}
              aria-label={isMenuOpen ? "メニューを閉じる" : "メニューを開く"}
            >
              <div className="relative w-6 h-6">
                <span
                  className={`absolute left-0 w-6 h-0.5 bg-primary transition-all duration-300 ${
                    isMenuOpen ? "top-[11px] rotate-45" : "top-1"
                  }`}
                />
                <span
                  className={`absolute left-0 top-[11px] w-6 h-0.5 bg-primary transition-all duration-300 ${
                    isMenuOpen ? "opacity-0" : "opacity-100"
                  }`}
                />
                <span
                  className={`absolute left-0 w-6 h-0.5 bg-primary transition-all duration-300 ${
                    isMenuOpen ? "top-[11px] -rotate-45" : "top-[19px]"
                  }`}
                />
              </div>
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Menu Overlay */}
      <div
        className={`lg:hidden fixed inset-0 z-[999] bg-black/50 transition-opacity duration-300 ${
          isMenuOpen ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
        onClick={() => setIsMenuOpen(false)}
      />

      {/* Mobile Drawer Menu */}
      <nav
        className={`lg:hidden fixed top-0 right-0 z-[999] w-[80vw] max-w-[300px] h-full bg-white transition-transform duration-300 ease-out ${
          isMenuOpen ? "translate-x-0" : "translate-x-full"
        }`}
        aria-label="モバイルナビゲーション"
      >
        <div className="pt-16">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="block h-14 leading-[56px] px-6 text-lg text-primary border-b border-gray-100 transition-colors hover:text-accent"
              onClick={() => setIsMenuOpen(false)}
            >
              {item.label}
            </Link>
          ))}
          {ctaButton.label && (
            <div className="px-6 py-6">
              <Link
                href={ctaButton.href}
                className="block w-full h-12 leading-[48px] text-center bg-accent text-white rounded-btn font-semibold transition-colors hover:bg-[#d35400]"
                onClick={() => setIsMenuOpen(false)}
              >
                {ctaButton.label}
              </Link>
            </div>
          )}

          {/* Phone in drawer */}
          {contact.phone && (
            <div className="px-6 pt-4 border-t border-gray-100">
              <a
                href={contact.phoneTel}
                className="flex items-center gap-3 py-4"
              >
                <Phone className="w-5 h-5 text-accent" />
                <div>
                  <p className="text-xl font-bold text-accent">
                    {contact.phoneFormatted}
                  </p>
                  <p className="text-xs text-text-muted">{contact.hours}</p>
                </div>
              </a>
            </div>
          )}
        </div>
      </nav>
    </>
  );
}
