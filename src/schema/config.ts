import { z } from 'zod';

export const configLabelSchema = z.object({
  name: z.string().min(1),
  keys: z.array(z.string().min(1)),
});

export type ConfigLabel = z.infer<typeof configLabelSchema>;

export const configSectionSchema = z.object({
  id: z.array(z.string().min(1)),
  'block-list': z.array(z.string().min(1)).default([]),
  label: z.array(configLabelSchema).default([]),
});

export type ConfigSection = z.infer<typeof configSectionSchema>;

export const configPolicySchema = z.object({
  template: z.array(z.string()).default([]),
  section: z.array(configSectionSchema).default([]),
});

export type ConfigPolicy = z.infer<typeof configPolicySchema>;

export const configSchema = z
  .object({
    policy: z.array(configPolicySchema).min(1).optional().nullable(),
  })
  .optional()
  .nullable();

export type ConfigType = z.infer<typeof configSchema>;
