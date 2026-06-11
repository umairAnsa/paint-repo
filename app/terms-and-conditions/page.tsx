import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Terms & Conditions',
  description:
    'Terms and Conditions for Norm Painting, including website usage, service terms, liability limitations, payment terms, intellectual property, and legal disclaimers.',
};

const sections = [
  {
    title: 'Website Usage',
    text:
      'By using this website, you agree to use it only for lawful purposes and in a way that does not interfere with website security, availability, or the experience of other users.',
  },
  {
    title: 'Service Terms',
    text:
      'Quotes, project timelines, service inclusions, materials, and preparation requirements are confirmed in writing before work begins. Service availability may depend on location, project scope, weather, access, and scheduling.',
  },
  {
    title: 'Liability Limitations',
    text:
      'To the extent permitted by law, Norm Painting is not liable for indirect, incidental, or consequential loss arising from use of this website or from circumstances outside our reasonable control.',
  },
  {
    title: 'Payment Terms',
    text:
      'Payment terms are set out in the relevant quote or invoice. Where stated, a 30% advance payment may be required before work begins, with remaining balances payable according to the agreed invoice terms.',
  },
  {
    title: 'Intellectual Property',
    text:
      'Website content, branding, images, text, graphics, and other materials are owned by or licensed to Norm Painting and must not be copied, reproduced, or reused without permission.',
  },
  {
    title: 'General Legal Disclaimers',
    text:
      'Website information is provided for general guidance only and may be updated without notice. Nothing on this website replaces a written quote, formal agreement, or advice specific to your project.',
  },
];

export default function TermsAndConditionsPage() {
  return (
    <main>
      <section className="bg-[#0c1f3d] px-5 pb-16 pt-32 text-white sm:px-8 sm:pt-40">
        <div className="mx-auto max-w-4xl">
          <p className="text-xs font-black uppercase tracking-[0.28em] text-[#f97316]">Legal</p>
          <h1 className="mt-4 text-4xl font-black tracking-tight sm:text-5xl">Terms & Conditions</h1>
          <p className="mt-5 max-w-2xl text-base leading-7 text-white/65">
            These Terms & Conditions outline the general terms for using the Norm Painting website and engaging with our services.
          </p>
        </div>
      </section>

      <section className="px-5 py-16 sm:px-8">
        <div className="mx-auto max-w-4xl space-y-8">
          {sections.map((section) => (
            <article key={section.title} className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
              <h2 className="text-xl font-black text-[#111827]">{section.title}</h2>
              <p className="mt-3 text-sm leading-7 text-gray-600">{section.text}</p>
            </article>
          ))}
        </div>
      </section>
    </main>
  );
}
