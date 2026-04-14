"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function FloatingContactButton() {
  const [visible, setVisible] = useState(false);
  const [pulse, setPulse] = useState(true);
  const pathname = usePathname();

  useEffect(() => {
    const showTimer = setTimeout(() => setVisible(true), 800);

    const pulseTimer = setTimeout(() => setPulse(false), 6000);
    return () => {
      clearTimeout(showTimer);
      clearTimeout(pulseTimer);
    };
  }, []);

  if (pathname === "/contact") return null;

  return (
    <>
      <style>{`
        @keyframes fadeSlideIn {
          from { opacity: 0; transform: translateY(20px) scale(0.9); }
          to   { opacity: 1; transform: translateY(0)   scale(1);   }
        }
        @keyframes gentlePulse {
          0%, 100% { box-shadow: 0 0 0 0 rgba(var(--pulse-color), 0.4); }
          50%       { box-shadow: 0 0 0 12px rgba(var(--pulse-color), 0); }
        }
        .floating-contact {
          animation: fadeSlideIn 0.6s cubic-bezier(0.34, 1.56, 0.64, 1) forwards;
        }
        .floating-contact.pulsing {
          --pulse-color: 161, 136, 107;
          animation: fadeSlideIn 0.6s cubic-bezier(0.34, 1.56, 0.64, 1) forwards,
                     gentlePulse 2s ease-in-out 1s infinite;
        }
        .floating-contact:hover .contact-label {
          max-width: 120px;
          opacity: 1;
          margin-left: 10px;
        }
        .contact-label {
          max-width: 0;
          opacity: 0;
          overflow: hidden;
          transition: max-width 0.4s ease, opacity 0.3s ease, margin-left 0.4s ease;
          white-space: nowrap;
        }
        .floating-contact .flower-ring {
          transition: transform 0.5s ease;
        }
        .floating-contact:hover .flower-ring {
          transform: rotate(45deg);
        }
      `}</style>

      {visible && (
        <Link
          href="/contact"
          aria-label="Contact Us"
          className={`floating-contact ${pulse ? "pulsing" : ""} fixed bottom-8 right-6 z-50 flex items-center bg-primary hover:bg-primary/80 text-white rounded-full shadow-2xl px-4 py-4 transition-colors duration-300 group`}
          style={{ textDecoration: "none" }}
        >
          <span className="flower-ring flex items-center justify-center w-6 h-6 shrink-0">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="w-5 h-5"
            >
              <path d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25H4.5a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5H4.5a2.25 2.25 0 00-2.25 2.25m19.5 0l-9.75 6.75L2.25 6.75" />
            </svg>
          </span>

          <span className="contact-label text-sm tracking-[0.18em] font-light uppercase">
            Contact Us
          </span>
        </Link>
      )}
    </>
  );
}
