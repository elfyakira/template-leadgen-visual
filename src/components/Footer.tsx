import Image from "next/image";
import Link from "next/link";
import { Phone, Mail, MapPin, Clock } from "lucide-react";
import { company, contact, locations, images, site, navigation } from "@/lib/site";

const navLinks = navigation.footer;

export default function Footer() {
  const hq = locations.headquarters;
  const currentYear = new Date().getFullYear();
  const fullAddress = hq.fullAddress || `${hq.zipCode ? `〒${hq.zipCode} ` : ""}${hq.address}`;

  return (
    <footer className="bg-primary text-white">
      <div className="max-w-container mx-auto px-6 lg:px-12 pt-12 lg:pt-20 pb-6 lg:pb-10">
        {/* PC: 4 columns */}
        <div className="hidden lg:grid lg:grid-cols-4 lg:gap-12 mb-16">
          {/* 1. Logo & Company */}
          <div>
            <Link href="/" className="inline-block mb-6">
              <Image
                src={images.logoWhite || images.logoSquare}
                alt={company.name}
                width={160}
                height={50}
                className={images.logoWhite ? "" : "brightness-0 invert"}
              />
            </Link>
            <p className="text-sm text-white/70 leading-relaxed">
              {company.catchphrase}
            </p>
          </div>

          {/* 2. Contact Info */}
          <div className="pt-2">
            <h3 className="text-sm font-semibold mb-4 text-white/90">お問い合わせ</h3>
            <div className="space-y-3">
              {contact.phone && (
                <a
                  href={contact.phoneTel}
                  className="flex items-start gap-2 text-sm text-white/80 hover:text-white transition-colors"
                >
                  <Phone className="w-4 h-4 mt-0.5 shrink-0" />
                  <div>
                    <span className="text-lg font-bold text-accent">
                      {contact.phoneFormatted}
                    </span>
                    <p className="text-xs text-white/60 mt-0.5">{contact.hours}</p>
                  </div>
                </a>
              )}
              {contact.email && (
                <a
                  href={`mailto:${contact.email}`}
                  className="flex items-center gap-2 text-sm text-white/80 hover:text-white transition-colors"
                >
                  <Mail className="w-4 h-4 shrink-0" />
                  <span>{contact.email}</span>
                </a>
              )}
            </div>
          </div>

          {/* 3. Address */}
          <div className="pt-2">
            <h3 className="text-sm font-semibold mb-4 text-white/90">所在地</h3>
            <div className="space-y-3">
              <div className="flex items-start gap-2 text-sm text-white/80">
                <MapPin className="w-4 h-4 mt-0.5 shrink-0" />
                <div>
                  <p>{fullAddress}</p>
                  {hq.parking && (
                    <p className="text-xs text-white/60 mt-1">{hq.parking}</p>
                  )}
                </div>
              </div>
              {hq.access && (
                <div className="flex items-start gap-2 text-sm text-white/80">
                  <Clock className="w-4 h-4 mt-0.5 shrink-0" />
                  <div className="text-xs text-white/60">
                    {Array.isArray(hq.access) ? (
                      hq.access.map((a, i) => <p key={i}>{a}</p>)
                    ) : (
                      <p>{hq.access}</p>
                    )}
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* 4. Navigation */}
          <div className="pt-2">
            <h3 className="text-sm font-semibold mb-4 text-white/90">メニュー</h3>
            {navLinks.length > 0 && (
              <ul className="space-y-2">
                {navLinks.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-sm text-white/80 hover:text-white transition-colors"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>

        {/* SP: Stacked layout */}
        <div className="lg:hidden text-center mb-8">
          <Link href="/" className="inline-block mb-6">
            <Image
              src={images.logoWhite || images.logoSquare}
              alt={company.name}
              width={140}
              height={45}
              className={images.logoWhite ? "" : "brightness-0 invert"}
            />
          </Link>

          {/* Phone CTA */}
          {contact.phone && (
            <a
              href={contact.phoneTel}
              className="flex items-center justify-center gap-2 mb-6"
            >
              <Phone className="w-5 h-5 text-accent" />
              <span className="text-xl font-bold text-accent">
                {contact.phoneFormatted}
              </span>
            </a>
          )}

          <div className="text-sm text-white/80 leading-relaxed mb-6">
            <p>{fullAddress}</p>
            {contact.hours && <p className="mt-1 text-xs text-white/60">{contact.hours}</p>}
          </div>

          {navLinks.length > 0 && (
            <ul className="space-y-2 mb-6">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-white/80 hover:text-white transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          )}

          {/* SNS */}
          <div className="flex items-center justify-center gap-4">
            {site.social?.instagram && (
              <a
                href={site.social.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="text-white/80 hover:text-white transition-colors"
                aria-label="Instagram"
              >
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
                >
                  <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
                  <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                  <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
                </svg>
              </a>
            )}
            {site.social?.line && (
              <a
                href={site.social.line}
                target="_blank"
                rel="noopener noreferrer"
                className="text-white/80 hover:text-white transition-colors"
                aria-label="LINE"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                >
                  <path d="M12 2C6.48 2 2 5.82 2 10.5c0 3.12 2.11 5.88 5.26 7.39-.02.6-.14 2.19-.16 2.55 0 0-.03.32.14.44.17.12.42.05.42.05 2.55-.37 4.06-1.33 4.78-1.9.52.08 1.06.12 1.56.12 5.52 0 10-3.82 10-8.5S17.52 2 12 2z" />
                </svg>
              </a>
            )}
          </div>
        </div>

        {/* Copyright */}
        <div className="border-t border-white/10 pt-6 text-center">
          <p className="text-xs text-white/50">
            © {currentYear} {company.nameEn || company.name}. All Rights Reserved.
          </p>
          {company.license && (
            <p className="text-[11px] text-white/40 mt-2">{company.license}</p>
          )}
        </div>
      </div>
    </footer>
  );
}
