import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Privacy Policy',
  description:
    'Privacy Policy for Norm Painting, including information collection, website usage, cookies, contact forms, user data protection, and Australian privacy compliance.',
};

const sections = [
  {
    title: 'Information Collection',
    text:
      'Norm Painting may collect personal information you provide directly, including your name, phone number, email address, property details, service requirements, and any message submitted through our website forms.',
  },
  {
    title: 'Website Usage',
    text:
      'We may collect general website usage information such as pages visited, browser type, device information, referring pages, and approximate location data to help maintain, secure, and improve the website.',
  },
  {
    title: 'Cookies',
    text:
      'Our website may use cookies and similar technologies to support basic website functionality, analyse website performance, and improve the visitor experience. You can manage cookies through your browser settings.',
  },
  {
    title: 'Contact Forms',
    text:
      'Information submitted through contact, quote, or estimate forms is used to respond to enquiries, prepare quotes, communicate about services, and manage customer requests.',
  },
  {
    title: 'User Data Protection',
    text:
      'We take reasonable steps to protect personal information from misuse, interference, loss, unauthorised access, modification, or disclosure. Access to personal information is limited to people who need it for business purposes.',
  },
  {
    title: 'Australian Privacy Compliance',
    text:
      'Norm Painting handles personal information in accordance with applicable Australian privacy requirements, including the Australian Privacy Principles where relevant. You may contact us to request access to or correction of your personal information.',
  },
];

export default function PrivacyPolicyPage() {
  return (
    <main>
      <section className="bg-[#0c1f3d] px-5 pb-16 pt-32 text-white sm:px-8 sm:pt-40">
        <div className="mx-auto max-w-4xl">
          <p className="text-xs font-black uppercase tracking-[0.28em] text-[#f97316]">Legal</p>
          <h1 className="mt-4 text-4xl font-black tracking-tight sm:text-5xl">Privacy Policy</h1>
          <p className="mt-5 max-w-2xl text-base leading-7 text-white/65">
            This Privacy Policy explains how Norm Painting collects, uses, protects, and manages information submitted through this website.
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
