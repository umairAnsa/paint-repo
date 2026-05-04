import { z } from 'zod';

export const leadSchema = z.object({
  name: z
    .string()
    .trim()
    .min(2, 'Name must be at least 2 characters.')
    .max(100, 'Name must be under 100 characters.'),

  email: z
    .email('Please enter a valid email address.')
    .trim()
    .max(200, 'Email address is too long.'),

  phone: z
    .string()
    .trim()
    .max(30, 'Phone number is too long.')
    .optional()
    .default(''),

  description: z
    .string()
    .trim()
    .min(5, 'Message must be at least 5 characters.')
    .max(2000, 'Message must be under 2000 characters.'),
});

export type LeadInput = z.infer<typeof leadSchema>;
