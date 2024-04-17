import { z } from 'zod';
declare const outputPolicySchema: z.ZodObject<{
    template: z.ZodString;
    section: z.ZodRecord<z.ZodString, z.ZodArray<z.ZodString, "many">>;
}, "strip", z.ZodTypeAny, {
    template: string;
    section: Record<string, string[]>;
}, {
    template: string;
    section: Record<string, string[]>;
}>;
export type OutputPolicy = z.infer<typeof outputPolicySchema>;
export {};
