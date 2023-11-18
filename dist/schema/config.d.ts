import { z } from 'zod';
export declare const configLabelSchema: z.ZodObject<{
    name: z.ZodString;
    keys: z.ZodArray<z.ZodString, "many">;
}, "strip", z.ZodTypeAny, {
    name: string;
    keys: string[];
}, {
    name: string;
    keys: string[];
}>;
export type ConfigLabel = z.infer<typeof configLabelSchema>;
export declare const configSectionSchema: z.ZodObject<{
    id: z.ZodArray<z.ZodString, "many">;
    'block-list': z.ZodDefault<z.ZodArray<z.ZodString, "many">>;
    label: z.ZodDefault<z.ZodArray<z.ZodObject<{
        name: z.ZodString;
        keys: z.ZodArray<z.ZodString, "many">;
    }, "strip", z.ZodTypeAny, {
        name: string;
        keys: string[];
    }, {
        name: string;
        keys: string[];
    }>, "many">>;
}, "strip", z.ZodTypeAny, {
    id: string[];
    'block-list': string[];
    label: {
        name: string;
        keys: string[];
    }[];
}, {
    id: string[];
    'block-list'?: string[] | undefined;
    label?: {
        name: string;
        keys: string[];
    }[] | undefined;
}>;
export type ConfigSection = z.infer<typeof configSectionSchema>;
export declare const configPolicySchema: z.ZodObject<{
    template: z.ZodDefault<z.ZodArray<z.ZodString, "many">>;
    section: z.ZodDefault<z.ZodArray<z.ZodObject<{
        id: z.ZodArray<z.ZodString, "many">;
        'block-list': z.ZodDefault<z.ZodArray<z.ZodString, "many">>;
        label: z.ZodDefault<z.ZodArray<z.ZodObject<{
            name: z.ZodString;
            keys: z.ZodArray<z.ZodString, "many">;
        }, "strip", z.ZodTypeAny, {
            name: string;
            keys: string[];
        }, {
            name: string;
            keys: string[];
        }>, "many">>;
    }, "strip", z.ZodTypeAny, {
        id: string[];
        'block-list': string[];
        label: {
            name: string;
            keys: string[];
        }[];
    }, {
        id: string[];
        'block-list'?: string[] | undefined;
        label?: {
            name: string;
            keys: string[];
        }[] | undefined;
    }>, "many">>;
}, "strip", z.ZodTypeAny, {
    template: string[];
    section: {
        id: string[];
        'block-list': string[];
        label: {
            name: string;
            keys: string[];
        }[];
    }[];
}, {
    template?: string[] | undefined;
    section?: {
        id: string[];
        'block-list'?: string[] | undefined;
        label?: {
            name: string;
            keys: string[];
        }[] | undefined;
    }[] | undefined;
}>;
export type ConfigPolicy = z.infer<typeof configPolicySchema>;
export declare const configSchema: z.ZodNullable<z.ZodOptional<z.ZodObject<{
    policy: z.ZodNullable<z.ZodOptional<z.ZodArray<z.ZodObject<{
        template: z.ZodDefault<z.ZodArray<z.ZodString, "many">>;
        section: z.ZodDefault<z.ZodArray<z.ZodObject<{
            id: z.ZodArray<z.ZodString, "many">;
            'block-list': z.ZodDefault<z.ZodArray<z.ZodString, "many">>;
            label: z.ZodDefault<z.ZodArray<z.ZodObject<{
                name: z.ZodString;
                keys: z.ZodArray<z.ZodString, "many">;
            }, "strip", z.ZodTypeAny, {
                name: string;
                keys: string[];
            }, {
                name: string;
                keys: string[];
            }>, "many">>;
        }, "strip", z.ZodTypeAny, {
            id: string[];
            'block-list': string[];
            label: {
                name: string;
                keys: string[];
            }[];
        }, {
            id: string[];
            'block-list'?: string[] | undefined;
            label?: {
                name: string;
                keys: string[];
            }[] | undefined;
        }>, "many">>;
    }, "strip", z.ZodTypeAny, {
        template: string[];
        section: {
            id: string[];
            'block-list': string[];
            label: {
                name: string;
                keys: string[];
            }[];
        }[];
    }, {
        template?: string[] | undefined;
        section?: {
            id: string[];
            'block-list'?: string[] | undefined;
            label?: {
                name: string;
                keys: string[];
            }[] | undefined;
        }[] | undefined;
    }>, "many">>>;
}, "strip", z.ZodTypeAny, {
    policy?: {
        template: string[];
        section: {
            id: string[];
            'block-list': string[];
            label: {
                name: string;
                keys: string[];
            }[];
        }[];
    }[] | null | undefined;
}, {
    policy?: {
        template?: string[] | undefined;
        section?: {
            id: string[];
            'block-list'?: string[] | undefined;
            label?: {
                name: string;
                keys: string[];
            }[] | undefined;
        }[] | undefined;
    }[] | null | undefined;
}>>>;
export type ConfigType = z.infer<typeof configSchema>;
