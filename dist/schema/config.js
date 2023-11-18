import { z } from 'zod';
export const configLabelSchema = z.object({
    name: z.string().min(1),
    keys: z.array(z.string().min(1)),
});
export const configSectionSchema = z.object({
    id: z.array(z.string().min(1)),
    'block-list': z.array(z.string().min(1)).default([]),
    label: z.array(configLabelSchema).default([]),
});
export const configPolicySchema = z.object({
    template: z.array(z.string()).default([]),
    section: z.array(configSectionSchema).default([]),
});
export const configSchema = z
    .object({
    policy: z.array(configPolicySchema).min(1).optional().nullable(),
})
    .optional()
    .nullable();
//# sourceMappingURL=config.js.map