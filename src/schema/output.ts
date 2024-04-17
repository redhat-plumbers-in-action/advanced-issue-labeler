import { z } from 'zod';

const outputPolicySchema = z.object({
  template: z.string(),
  section: z.record(z.array(z.string())),
});

export type OutputPolicy = z.infer<typeof outputPolicySchema>;
