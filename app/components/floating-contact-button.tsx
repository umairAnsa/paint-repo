"use client";

import { useEffect, useRef, useState, useSyncExternalStore } from "react";

const PHONE_NUMBER = "61406342731";
const PHONE_DISPLAY = "0406 342 731";

// useSyncExternalStore snapshots — proper SSR-safe client detection
function subscribe() {
  return () => {};
}
function getMobileSnapshot() {
  return /Android|iPhone|iPad|iPod|webOS|BlackBerry|IEMobile|Opera Mini/i.test(
    navigator.userAgent,
  );
}
function getServerSnapshot() {
  return false;
}

function PhoneIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="currentColor"
      width="22"
      height="22"
      aria-hidden="true"
    >
      <path d="M6.62 10.79a15.05 15.05 0 006.59 6.59l2.2-2.2a1 1 0 011.01-.24c1.12.37 2.33.57 3.58.57a1 1 0 011 1V20a1 1 0 01-1 1C10.61 21 3 13.39 3 4a1 1 0 011-1h3.5a1 1 0 011 1c0 1.25.2 2.46.57 3.58a1 1 0 01-.25 1.01l-2.2 2.2z" />
    </svg>
  );
}

function WhatsAppIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="currentColor"
      width="20"
      height="20"
      aria-hidden="true"
    >
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z" />
      <path d="M12 2C6.477 2 2 6.477 2 12c0 1.89.525 3.66 1.438 5.168L2.046 21.6a.5.5 0 00.61.61l4.432-1.392A9.96 9.96 0 0012 22c5.523 0 10-4.477 10-10S17.523 2 12 2zm0 18a7.95 7.95 0 01-4.076-1.119l-.29-.173-3.007.944.96-2.921-.19-.3A7.96 7.96 0 014 12c0-4.411 3.589-8 8-8s8 3.589 8 8-3.589 8-8 8z" />
    </svg>
  );
}

interface ActionButtonProps {
  href: string;
  label: string;
  tooltip: string;
  icon: React.ReactNode;
  bgClass: string;
  shadowClass: string;
  visible: boolean;
  delay: string;
}

function ActionButton({
  href,
  label,
  tooltip,
  icon,
  bgClass,
  shadowClass,
  visible,
  delay,
}: ActionButtonProps) {
  return (
    <div className="group/action relative flex items-center justify-end">
      <span
        className={[
          "pointer-events-none absolute right-16 whitespace-nowrap rounded-lg bg-gray-900 px-2.5 py-1 text-xs font-medium text-white shadow",
          "opacity-0 transition-opacity duration-150 group-hover/action:opacity-100",
        ].join(" ")}
      >
        {tooltip}
        <span className="absolute -right-1 top-1/2 -translate-y-1/2 border-4 border-transparent border-l-gray-900" />
      </span>
      <a
        href={href}
        target={href.startsWith("https") ? "_blank" : undefined}
        rel={href.startsWith("https") ? "noopener noreferrer" : undefined}
        aria-label={label}
        className={[
          "flex h-12 w-12 items-center justify-center rounded-full text-white shadow-lg",
          bgClass,
          shadowClass,
          "transition-all duration-200 hover:scale-110 active:scale-95",
          visible
            ? "translate-y-0 scale-100 opacity-100"
            : "pointer-events-none translate-y-4 scale-75 opacity-0",
        ].join(" ")}
        style={{ transitionDelay: visible ? delay : "0ms" }}
      >
        {icon}
      </a>
    </div>
  );
}

export default function FloatingContactButton() {
  const [open, setOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  // useSyncExternalStore gives false on server, real value on client — no hydration mismatch
  const isMobile = useSyncExternalStore(
    subscribe,
    getMobileSnapshot,
    getServerSnapshot,
  );

  // Close panel when user clicks/taps outside
  useEffect(() => {
    if (!open) return;
    function handleOutside(e: MouseEvent | TouchEvent) {
      if (
        containerRef.current &&
        !containerRef.current.contains(e.target as Node)
      ) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handleOutside);
    document.addEventListener("touchstart", handleOutside);
    return () => {
      document.removeEventListener("mousedown", handleOutside);
      document.removeEventListener("touchstart", handleOutside);
    };
  }, [open]);

  const telHref = "tel:+" + PHONE_NUMBER;
  const waHref = "https://wa.me/" + PHONE_NUMBER;
  const mainLabel = isMobile
    ? "Call " + PHONE_DISPLAY
    : "Chat on WhatsApp – " + PHONE_DISPLAY;

  return (
    <div
      ref={containerRef}
      className="fixed bottom-28 right-6 z-50 flex flex-col items-end gap-3"
    >
      <div className="flex flex-col items-end gap-3">
        <ActionButton
          href={waHref}
          label={"Open WhatsApp – " + PHONE_DISPLAY}
          tooltip="WhatsApp"
          icon={<WhatsAppIcon />}
          bgClass="bg-[#25D366]"
          shadowClass="shadow-green-500/40"
          visible={open}
          delay="60ms"
        />
        <ActionButton
          href={telHref}
          label={"Call " + PHONE_DISPLAY}
          tooltip="Call Now"
          icon={<PhoneIcon />}
          bgClass="bg-[#2563EB]"
          shadowClass="shadow-blue-500/40"
          visible={open}
          delay="0ms"
        />
      </div>
      <div className="group relative flex items-center justify-end">
        <span
          className={[
            "pointer-events-none absolute right-16 whitespace-nowrap rounded-lg bg-gray-900 px-2.5 py-1 text-xs font-medium text-white shadow",
            "opacity-0 transition-opacity duration-150 group-hover:opacity-100",
          ].join(" ")}
        >
          Contact Us
          <span className="absolute -right-1 top-1/2 -translate-y-1/2 border-4 border-transparent border-l-gray-900" />
        </span>
        {isMobile ? (
          <button
            type="button"
            onClick={() => setOpen((prev) => !prev)}
            aria-label="Open contact options"
            aria-expanded={open}
            className={[
              "flex h-14 w-14 items-center justify-center rounded-full bg-[#2563EB] text-white",
              "shadow-lg shadow-blue-500/40",
              "transition-all duration-200 hover:bg-[#1D4ED8] hover:scale-110 active:scale-95",
              open ? "rotate-135" : "rotate-0",
            ].join(" ")}
          >
            <PhoneIcon />
          </button>
        ) : (
          <a
            href={waHref}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={mainLabel}
            onClick={() => setOpen((prev) => !prev)}
            className="flex h-14 w-14 items-center justify-center rounded-full bg-[#2563EB] text-white shadow-lg shadow-blue-500/40 transition-all duration-200 hover:bg-[#1D4ED8] hover:scale-110 active:scale-95"
          >
            <PhoneIcon />
          </a>
        )}
      </div>
    </div>
  );
}
