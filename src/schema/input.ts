import { z } from 'zod';

export const issueFormSchema = z.record(z.string().or(z.array(z.string())));

export type IssueFormType = z.infer<typeof issueFormSchema>;

export const sectionSchema = z.string().min(1);

export type Section = z.infer<typeof sectionSchema>;

export const blockListSchema = z.array(z.string().min(1)).default([]);

export type BlockList = z.infer<typeof blockListSchema>;

export const templateSchema = z.string().min(1).optional();

export type Template = z.infer<typeof templateSchema>;
