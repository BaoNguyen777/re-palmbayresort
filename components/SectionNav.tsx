"use client";

import { useEffect, useState } from "react";
import { ArrowUpRight } from "lucide-react";

const sections = [
  { id: "top", label: "Home", number: "01" },
  { id: "stay", label: "Stay", number: "02" },
  { id: "experience", label: "Experience", number: "03" },
  { id: "rooms", label: "Rooms", number: "04" },
  { id: "gallery", label: "Gallery", number: "05" },
  { id: "location", label: "Location", number: "06" },
];

export default function SectionNav() {
  const [active, setActive] = useState("top");

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (visible) setActive(visible.target.id);
      },
      { rootMargin: "-35% 0px -50% 0px", threshold: [0.05, 0.2, 0.5] }
    );

    sections.forEach(({ id }) => {
      const element = document.getElementById(id);
      if (element) observer.observe(element);
    });

    return () => observer.disconnect();
  }, []);

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <aside className="fixed right-5 top-1/2 z-[60] hidden -translate-y-1/2 lg:block">
      <div className="group/nav rounded-full border border-white/15 bg-[#0c2b27]/80 p-2 shadow-2xl backdrop-blur-xl">
        <div className="flex flex-col items-center gap-1">
          {sections.map((section) => {
            const isActive = active === section.id;
            return (
              <button
                key={section.id}
                type="button"
                onClick={() => scrollTo(section.id)}
                aria-label={`Go to ${section.label}`}
                className="group relative flex h-10 w-10 items-center justify-center rounded-full transition-all duration-300"
              >
                <span
                  className={`absolute inset-0 rounded-full transition-all duration-300 ${
                    isActive ? "scale-100 bg-[#e8cc91]" : "scale-0 bg-white/10 group-hover:scale-100"
                  }`}
                />
                <span
                  className={`relative z-10 text-[8px] font-semibold tracking-[.12em] transition-colors ${
                    isActive ? "text-[#173b35]" : "text-white/55 group-hover:text-white"
                  }`}
                >
                  {section.number}
                </span>
                <span className="pointer-events-none absolute right-14 hidden whitespace-nowrap rounded-full border border-white/10 bg-[#0c2b27] px-3 py-2 text-[9px] uppercase tracking-[.18em] text-white shadow-xl group-hover:block">
                  {section.label}
                </span>
              </button>
            );
          })}
          <span className="my-1 h-px w-4 bg-white/15" />
          <button
            type="button"
            onClick={() => window.open("https://www.booking.com/hotel/vn/palm-bay-resort-amp-spa-phu-quoc.en-gb.html", "_blank", "noopener,noreferrer")}
            aria-label="Book your stay"
            className="group relative flex h-10 w-10 items-center justify-center rounded-full bg-[#e8cc91] text-[#173b35] transition hover:scale-105"
          >
            <ArrowUpRight size={15} />
            <span className="pointer-events-none absolute right-14 hidden whitespace-nowrap rounded-full bg-[#e8cc91] px-3 py-2 text-[9px] font-bold uppercase tracking-[.18em] text-[#173b35] shadow-xl group-hover:block">
              Book your stay
            </span>
          </button>
        </div>
      </div>
    </aside>
  );
}
