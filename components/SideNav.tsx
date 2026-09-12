"use client";

import { useEffect, useState } from "react";
import { ArrowUpRight, CalendarDays, Camera, Compass, Home, MapPin, Sparkles } from "lucide-react";

const items = [
  { id: "top", label: "Home", icon: Home },
  { id: "stay", label: "Stay", icon: Compass },
  { id: "experience", label: "Experience", icon: Sparkles },
  { id: "gallery", label: "Gallery", icon: Camera },
  { id: "location", label: "Location", icon: MapPin },
];

const booking = "https://www.booking.com/hotel/vn/palm-bay-resort-amp-spa-phu-quoc.en-gb.html";

export default function SideNav() {
  const [active, setActive] = useState("top");

  useEffect(() => {
    const sections = ["top", "stay", "experience", "gallery", "location"];
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (visible) setActive(visible.target.id);
      },
      { rootMargin: "-35% 0px -55% 0px", threshold: [0.05, 0.2, 0.5] }
    );

    sections.forEach((id) => {
      const element = document.getElementById(id);
      if (element) observer.observe(element);
    });
    return () => observer.disconnect();
  }, []);

  return (
    <>
      <nav aria-label="Section navigation" className="fixed left-5 top-1/2 z-40 hidden -translate-y-1/2 lg:block">
        <div className="flex flex-col items-center gap-2 rounded-full border border-white/15 bg-[#0c2b27]/80 p-2 shadow-2xl backdrop-blur-xl">
          {items.map(({ id, label, icon: Icon }) => (
            <a
              key={id}
              href={id === "top" ? "#" : `#${id}`}
              aria-label={label}
              className={`group relative grid size-10 place-items-center rounded-full transition-all duration-300 ${active === id ? "bg-[#e8cc91] text-[#173b35]" : "text-white/55 hover:bg-white/10 hover:text-white"}`}
            >
              <Icon size={16} strokeWidth={1.8} />
              <span className="pointer-events-none absolute left-12 rounded-full bg-[#0c2b27] px-3 py-1.5 text-[9px] uppercase tracking-[.18em] text-white opacity-0 shadow-xl transition-opacity group-hover:opacity-100 whitespace-nowrap">
                {label}
              </span>
            </a>
          ))}
        </div>
      </nav>

      <div className="fixed bottom-5 left-1/2 z-40 flex -translate-x-1/2 items-center gap-1 rounded-full border border-white/15 bg-[#0c2b27]/85 p-1.5 shadow-2xl backdrop-blur-xl lg:hidden">
        {items.map(({ id, label, icon: Icon }) => (
          <a
            key={id}
            href={id === "top" ? "#" : `#${id}`}
            aria-label={label}
            className={`grid size-10 place-items-center rounded-full transition ${active === id ? "bg-[#e8cc91] text-[#173b35]" : "text-white/60"}`}
          >
            <Icon size={15} />
          </a>
        ))}
      </div>

      <a
        href={booking}
        target="_blank"
        rel="noreferrer"
        className="group fixed right-5 top-1/2 z-40 hidden -translate-y-1/2 items-center gap-2 rounded-full bg-[#e8cc91] px-3 py-3 text-[#173b35] shadow-2xl transition hover:px-5 md:flex"
        aria-label="Book your stay"
      >
        <CalendarDays size={16} />
        <span className="max-w-0 overflow-hidden whitespace-nowrap text-[9px] font-bold uppercase tracking-[.16em] opacity-0 transition-all group-hover:max-w-28 group-hover:opacity-100">
          Book your stay
        </span>
        <ArrowUpRight size={15} />
      </a>
    </>
  );
}
