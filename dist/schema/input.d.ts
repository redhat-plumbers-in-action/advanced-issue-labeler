import { z } from 'zod';
export declare const issueFormSchema: z.ZodRecord<z.ZodString, z.ZodPipe<z.ZodUnion<[z.ZodUnion<[z.ZodString, z.ZodArray<z.ZodString>]>, z.ZodArray<z.ZodArray<z.ZodUnknown>>]>, z.ZodTransform<string | string[], string | string[] | unknown[][]>>>;
export type IssueFormType = z.infer<typeof issueFormSchema>;
export declare const sectionSchema: z.ZodString;
export type Section = z.infer<typeof sectionSchema>;
export declare const blockListSchema: z.ZodDefault<z.ZodArray<z.ZodString>>;
export type BlockList = z.infer<typeof blockListSchema>;
export declare const templateSchema: z.ZodOptional<z.ZodString>;
export type Template = z.infer<typeof templateSchema>;
