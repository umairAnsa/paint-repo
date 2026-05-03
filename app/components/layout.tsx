import { Header, Footer } from "./landing-page-sections";

/**
 * Shared page layout — wraps every page with the common Header and Footer.
 * Import this in any server or client page component.
 */
export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Header />
      <main>{children}</main>
      <Footer />
    </>
  );
}
