import { z } from 'zod';
export declare const configLabelSchema: z.ZodObject<{
    name: z.ZodString;
    keys: z.ZodArray<z.ZodString>;
}, z.core.$strip>;
export type ConfigLabel = z.infer<typeof configLabelSchema>;
export declare const configSectionSchema: z.ZodObject<{
    id: z.ZodArray<z.ZodString>;
    'block-list': z.ZodDefault<z.ZodArray<z.ZodString>>;
    label: z.ZodDefault<z.ZodArray<z.ZodObject<{
        name: z.ZodString;
        keys: z.ZodArray<z.ZodString>;
    }, z.core.$strip>>>;
}, z.core.$strip>;
export type ConfigSection = z.infer<typeof configSectionSchema>;
export declare const configPolicySchema: z.ZodObject<{
    template: z.ZodDefault<z.ZodArray<z.ZodString>>;
    section: z.ZodDefault<z.ZodArray<z.ZodObject<{
        id: z.ZodArray<z.ZodString>;
        'block-list': z.ZodDefault<z.ZodArray<z.ZodString>>;
        label: z.ZodDefault<z.ZodArray<z.ZodObject<{
            name: z.ZodString;
            keys: z.ZodArray<z.ZodString>;
        }, z.core.$strip>>>;
    }, z.core.$strip>>>;
}, z.core.$strip>;
export type ConfigPolicy = z.infer<typeof configPolicySchema>;
export declare const configSchema: z.ZodNullable<z.ZodOptional<z.ZodObject<{
    policy: z.ZodNullable<z.ZodOptional<z.ZodArray<z.ZodObject<{
        template: z.ZodDefault<z.ZodArray<z.ZodString>>;
        section: z.ZodDefault<z.ZodArray<z.ZodObject<{
            id: z.ZodArray<z.ZodString>;
            'block-list': z.ZodDefault<z.ZodArray<z.ZodString>>;
            label: z.ZodDefault<z.ZodArray<z.ZodObject<{
                name: z.ZodString;
                keys: z.ZodArray<z.ZodString>;
            }, z.core.$strip>>>;
        }, z.core.$strip>>>;
    }, z.core.$strip>>>>;
}, z.core.$strip>>>;
export type ConfigType = z.infer<typeof configSchema>;
