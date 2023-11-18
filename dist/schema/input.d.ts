import { z } from 'zod';
export declare const issueFormSchema: z.ZodRecord<z.ZodString, z.ZodUnion<[z.ZodString, z.ZodArray<z.ZodString, "many">]>>;
export type IssueFormType = z.infer<typeof issueFormSchema>;
export declare const sectionSchema: z.ZodString;
export type Section = z.infer<typeof sectionSchema>;
export declare const blockListSchema: z.ZodDefault<z.ZodArray<z.ZodString, "many">>;
export type BlockList = z.infer<typeof blockListSchema>;
export declare const templateSchema: z.ZodOptional<z.ZodString>;
export type Template = z.infer<typeof templateSchema>;
