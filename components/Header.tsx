import React from 'react';
import ScrollButton from './ScrollButton';
import { NAV_LINKS, SITE_NAME } from './siteConfig';

export default function Header() {
  return (
    <header className="fixed top-[20px] left-0 w-full flex items-center justify-between px-6 md:px-12 py-2 bg-white/70 backdrop-blur-md z-50 text-[#6B403C] border-b border-[#6B403C]/10">
      {/* Left: Logo Placeholder */}
      <div className="flex-1">
        <span className="text-xl font-bold tracking-widest uppercase">{SITE_NAME}</span>
      </div>

      {/* Center: Navigation Links */}
      <nav className="hidden md:flex gap-8 justify-center flex-1">
        {NAV_LINKS.map((link) => (
          <a
            key={link.href}
            href={link.href}
            className="text-sm font-bold hover:text-[#f21137] transition-colors uppercase tracking-wide"
          >
            {link.label}
          </a>
        ))}
      </nav>

      {/* Right: Buy Now Button */}
      <div className="flex-1 flex justify-end">
        <ScrollButton targetId="product" className="bg-[#f21137] text-white px-6 py-1.5 rounded-full font-semibold hover:bg-opacity-90 transition-all shadow-lg shadow-[#f21137]/30">
          Buy now
        </ScrollButton>
      </div>
    </header>
  );
}
