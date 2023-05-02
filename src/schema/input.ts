import { z } from 'zod';

// From Zod's documentation: https://zod.dev/?id=json-type
const literalSchema = z.union([z.string(), z.number(), z.boolean(), z.null()]);

type Literal = z.infer<typeof literalSchema>;
type Json = { [key: string]: Json | Literal };

export const jsonSchema: z.ZodType<Json> = z.record(
  z.union([literalSchema, z.lazy(() => jsonSchema)])
);

export const inputSchema = z.object({
  issueForm: jsonSchema,
  template: z.string().min(1).optional(),
  section: z.string().min(1),
  blockList: z.array(z.string().min(1)).default([]),
});

export type InputType = z.infer<typeof inputSchema>;
