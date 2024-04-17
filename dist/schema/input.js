import { z } from 'zod';
export const issueFormSchema = z.record(z.string().or(z.array(z.string())));
export const sectionSchema = z.string().min(1);
export const blockListSchema = z.array(z.string().min(1)).default([]);
export const templateSchema = z.string().min(1).optional();
//# sourceMappingURL=input.js.map