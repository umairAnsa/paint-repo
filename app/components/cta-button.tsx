import Link from "next/link";

type CTAVariant = "primary" | "outline" | "ghost";

interface CTAButtonProps {
  href: string;
  children: React.ReactNode;
  variant?: CTAVariant;
  className?: string;
  external?: boolean;
}

const variantClasses: Record<CTAVariant, string> = {
  primary:
    "bg-[#F97316] text-white shadow-lg shadow-orange-200 hover:bg-[#EA6C07] hover:-translate-y-0.5",
  outline:
    "border-2 border-[#1E3A8A] text-[#1E3A8A] hover:bg-[#1E3A8A] hover:text-white",
  ghost:
    "border-2 border-white/30 text-white hover:border-white/60 hover:bg-white/10",
};

/**
 * Reusable CTA button used across all pages.
 * Renders a Next.js Link for internal hrefs, or an <a> for external/tel/mailto.
 */
export function CTAButton({
  href,
  children,
  variant = "primary",
  className = "",
  external = false,
}: CTAButtonProps) {
  const base =
    "inline-flex min-h-12 items-center justify-center rounded-full px-7 text-sm font-bold transition";
  const classes = `${base} ${variantClasses[variant]} ${className}`;

  if (external || href.startsWith("tel:") || href.startsWith("mailto:")) {
    return (
      <a className={classes} href={href}>
        {children}
      </a>
    );
  }

  return (
    <Link className={classes} href={href}>
      {children}
    </Link>
  );
}
