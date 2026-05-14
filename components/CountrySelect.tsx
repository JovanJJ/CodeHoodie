"use client";

import { useState, useEffect, useRef } from "react";

const COUNTRIES = [
  { name: "United States", code: "US" },
  { name: "Canada", code: "CA" },
  { name: "United Kingdom", code: "GB" },
  { name: "Australia", code: "AU" },
  { name: "Israel", code: "ISR" },
  { name: "Serbia", code: "RS" },
  { name: "France", code: "FR" },
  { name: "Spain", code: "ES" },
  { name: "Italy", code: "IT" },
  { name: "Netherlands", code: "NL" },
  { name: "Norway", code: "NO" },
  { name: "Switzerland", code: "CH" },
  { name: "Austria", code: "AT" },
  { name: "New Zealand", code: "NZ" },
  { name: "Japan", code: "JP" },
  { name: "Brazil", code: "BR" },
  { name: "Mexico", code: "MX" },
  { name: "India", code: "IN" },
];

export default function CountrySelect({
  value,
  onChange,
}: {
  value: string;
  onChange: (code: string) => void;
}) {
  const [searchTerm, setSearchTerm] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [filteredCountries, setFilteredCountries] = useState(COUNTRIES);
  const wrapperRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const selected = COUNTRIES.find((c) => c.code === value);
    if (selected && !isOpen) {
      setSearchTerm(selected.name);
    } else if (!value && !isOpen) {
      setSearchTerm("");
    }
  }, [value, isOpen]);

  useEffect(() => {
    if (isOpen) {
      setFilteredCountries(
        COUNTRIES.filter((country) =>
          country.name.toLowerCase().includes(searchTerm.toLowerCase())
        )
      );
    }
  }, [searchTerm, isOpen]);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.addEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="relative mt-2" ref={wrapperRef}>
      <input
        type="text"
        value={searchTerm}
        onChange={(e) => {
          setSearchTerm(e.target.value);
          setIsOpen(true);
          onChange(""); // Clear the value if user is typing
        }}
        onFocus={() => {
          setIsOpen(true);
          setSearchTerm("");
        }}
        placeholder="Search for a country..."
        className="w-full rounded-2xl border border-[#6B403C]/15 bg-white px-4 py-3 text-base font-semibold outline-none transition focus:border-[#6B403C]"
        required
      />
      {isOpen && (
        <ul className="absolute z-10 mt-2 max-h-48 w-full overflow-y-auto rounded-xl border border-[#6B403C]/15 bg-white py-1 shadow-lg">
          {filteredCountries.length > 0 ? (
            filteredCountries.map((country) => (
              <li
                key={country.code}
                className="cursor-pointer px-4 py-2 text-sm font-semibold hover:bg-[#6B403C]/10"
                onMouseDown={(e) => {
                  e.preventDefault(); // Prevent input from losing focus immediately
                  onChange(country.code);
                  setSearchTerm(country.name);
                  setIsOpen(false);
                }}
              >
                {country.name}
              </li>
            ))
          ) : (
            <li className="px-4 py-2 text-sm text-[#6B403C]/60">No countries found</li>
          )}
        </ul>
      )}
    </div>
  );
}
