import type { FormEvent } from "react";

export type ContactFormErrors = Partial<Record<"name" | "email" | "message", string>>;

export type NewsletterProps = {
  email: string;
  message: string;
  onEmailChange: (value: string) => void;
  onSubmit: (event: FormEvent<HTMLFormElement>) => void;
};

export type ContactProps = {
  errors: ContactFormErrors;
  prefill?: {
    name?: string;
    email?: string;
    message?: string;
  };
  formVersion?: number;
  sent: boolean;
  onSubmit: (event: FormEvent<HTMLFormElement>) => void;
};

export type HeroLeadPayload = {
  name: string;
  email: string;
  phone: string;
  message: string;
};

export type HeroProps = {
  onLeadSubmit: (payload: HeroLeadPayload) => void;
};
