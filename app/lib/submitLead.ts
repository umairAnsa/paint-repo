const BACKEND_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";

export interface LeadPayload {
  name: string;
  email: string;
  phone?: string;
  description: string;
  source: 'hero' | 'contact' | 'estimate';
}

export async function submitLead(payload: LeadPayload): Promise<void> {
  const res = await fetch(`${BACKEND_URL}/api/lead`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      name: payload.name,
      email: payload.email,
      phone: payload.phone ?? "",
      description: payload.description,
      source: payload.source,
    }),
  });

  const json = await res.json();
  if (!res.ok) {
    throw new Error(json.error ?? "Submission failed. Please try again.");
  }
}
