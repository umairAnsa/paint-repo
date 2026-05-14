'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const PHONE = '0406342731';
const PHONE_INTL = '61406342731';
const WHATSAPP_MESSAGE = encodeURIComponent('Hello! I would like to get a free quote for painting services.');

export default function FloatingContactButton() {
  const [expanded, setExpanded] = useState(false);

  return (
    <div className="fixed bottom-6 right-5 z-40 flex flex-col items-end gap-3">
      {/* Action buttons — appear above main button */}
      <AnimatePresence>
        {expanded && (
          <>
            {/* WhatsApp */}
            <motion.a
              key="whatsapp"
              href={`https://wa.me/${PHONE_INTL}?text=${WHATSAPP_MESSAGE}`}
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, y: 12, scale: 0.85 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 12, scale: 0.85 }}
              transition={{ duration: 0.22, delay: 0.05 }}
              className="group flex items-center gap-3"
              aria-label="Chat on WhatsApp"
            >
              <span className="hidden rounded-xl bg-white px-3 py-1.5 text-xs font-bold text-[#111827] shadow-lg shadow-black/10 ring-1 ring-black/5 sm:block">
                WhatsApp Us
              </span>
              <span className="flex h-12 w-12 items-center justify-center rounded-full bg-[#25D366] shadow-xl shadow-[#25D366]/35 transition group-hover:scale-110 group-hover:shadow-[#25D366]/50">
                <WhatsAppIcon />
              </span>
            </motion.a>

            {/* Phone Call */}
            <motion.a
              key="phone"
              href={`tel:${PHONE}`}
              initial={{ opacity: 0, y: 12, scale: 0.85 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 12, scale: 0.85 }}
              transition={{ duration: 0.22, delay: 0 }}
              className="group flex items-center gap-3"
              aria-label={`Call ${PHONE}`}
            >
              <span className="hidden rounded-xl bg-white px-3 py-1.5 text-xs font-bold text-[#111827] shadow-lg shadow-black/10 ring-1 ring-black/5 sm:block">
                Call Now
              </span>
              <span className="flex h-12 w-12 items-center justify-center rounded-full bg-[#1e3a8a] shadow-xl shadow-blue-900/35 transition group-hover:scale-110 group-hover:shadow-blue-900/50">
                <PhoneIcon />
              </span>
            </motion.a>
          </>
        )}
      </AnimatePresence>

      {/* Main toggle button */}
      <motion.button
        onClick={() => setExpanded((v) => !v)}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.0, duration: 0.4 }}
        whileTap={{ scale: 0.92 }}
        className="relative flex h-14 w-14 items-center justify-center rounded-full bg-[#f97316] text-white shadow-xl shadow-orange-500/40 transition hover:bg-[#ea6c07] hover:shadow-orange-500/55"
        aria-label={expanded ? 'Close contact options' : 'Contact us'}
      >
        <motion.div
          animate={{ rotate: expanded ? 45 : 0 }}
          transition={{ duration: 0.25, ease: 'easeInOut' }}
        >
          {expanded ? <CloseIcon /> : <PhoneIcon />}
        </motion.div>
      </motion.button>
    </div>
  );
}

function PhoneIcon() {
  return (
    <svg className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12a19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 3.6 1.27h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.91 8.84a16 16 0 0 0 6 6l1.27-.91a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z"
      />
    </svg>
  );
}

function CloseIcon() {
  return (
    <svg className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
    </svg>
  );
}

function WhatsAppIcon() {
  return (
    <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
    </svg>
  );
}
