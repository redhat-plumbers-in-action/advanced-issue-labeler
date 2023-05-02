import { z } from 'zod';
declare const literalSchema: z.ZodUnion<[z.ZodString, z.ZodNumber, z.ZodBoolean, z.ZodNull]>;
type Literal = z.infer<typeof literalSchema>;
type Json = {
    [key: string]: Json | Literal;
};
export declare const jsonSchema: z.ZodType<Json>;
export declare const inputSchema: z.ZodObject<{
    issueForm: z.ZodType<Json, z.ZodTypeDef, Json>;
    template: z.ZodOptional<z.ZodString>;
    section: z.ZodString;
    blockList: z.ZodDefault<z.ZodArray<z.ZodString, "many">>;
}, "strip", z.ZodTypeAny, {
    blockList: string[];
    section: string;
    issueForm: Json;
    template?: string | undefined;
}, {
    section: string;
    issueForm: Json;
    template?: string | undefined;
    blockList?: string[] | undefined;
}>;
export type InputType = z.infer<typeof inputSchema>;
export {};
