type PBlock   = { type: 'p';   text: string };
type H2Block  = { type: 'h2';  text: string };
type H3Block  = { type: 'h3';  text: string };
type UlBlock  = { type: 'ul';  items: string[] };
type OlBlock  = { type: 'ol';  items: string[] };
type FaqBlock = { type: 'faq'; question: string; answer: string };

export type ContentBlock = PBlock | H2Block | H3Block | UlBlock | OlBlock | FaqBlock;

export interface BlogPost {
  _id?: string;
  slug: string;
  title: string;
  date: string;
  excerpt: string;
  image: string;
  content: ContentBlock[] | string;
  published?: boolean;
}

const API = process.env.NEXT_PUBLIC_API_URL || 'https://norm-painting-backend.onrender.com';

export async function fetchPosts(): Promise<BlogPost[]> {
  try {
    const r = await fetch(`${API}/api/blog`, { next: { revalidate: 60 } });
    if (!r.ok) return [];
    const data = await r.json();
    return (data.posts ?? []) as BlogPost[];
  } catch { return []; }
}

export async function fetchPost(slug: string): Promise<BlogPost | null> {
  try {
    const r = await fetch(`${API}/api/blog/${slug}`, { next: { revalidate: 60 } });
    if (!r.ok) return null;
    const data = await r.json();
    return (data.post ?? null) as BlogPost | null;
  } catch { return null; }
}
