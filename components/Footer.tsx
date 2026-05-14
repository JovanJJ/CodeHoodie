import { NAV_LINKS, SITE_NAME } from "./siteConfig";

export default function Footer() {
  return (
    <footer className="border-t border-[#6B403C]/10 bg-[#6B403C] px-6 py-12 text-[#fafafa] md:px-12">
      <div className="mx-auto grid max-w-7xl gap-10 md:grid-cols-[1fr_auto] md:items-start">
        <div>
          <p className="text-xl font-extrabold uppercase tracking-widest">
            {SITE_NAME}
          </p>
        </div>

        <nav
          aria-label="Footer navigation"
          className="flex flex-wrap gap-x-6 gap-y-3 md:justify-end"
        >
          {NAV_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-sm font-bold uppercase tracking-wide text-white/75 transition-colors hover:text-[#ADEBB3]"
            >
              {link.label}
            </a>
          ))}
        </nav>
      </div>


    </footer>
  );
}
