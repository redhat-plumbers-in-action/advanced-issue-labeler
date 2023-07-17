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
    blockList: z.ZodDefault<z.ZodArray<z.ZodString, "many">>;
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
    blockList: string[];
    label: {
        name: string;
        keys: string[];
    }[];
}, {
    id: string[];
    blockList?: string[] | undefined;
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
        blockList: z.ZodDefault<z.ZodArray<z.ZodString, "many">>;
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
        blockList: string[];
        label: {
            name: string;
            keys: string[];
        }[];
    }, {
        id: string[];
        blockList?: string[] | undefined;
        label?: {
            name: string;
            keys: string[];
        }[] | undefined;
    }>, "many">>;
}, "strip", z.ZodTypeAny, {
    template: string[];
    section: {
        id: string[];
        blockList: string[];
        label: {
            name: string;
            keys: string[];
        }[];
    }[];
}, {
    template?: string[] | undefined;
    section?: {
        id: string[];
        blockList?: string[] | undefined;
        label?: {
            name: string;
            keys: string[];
        }[] | undefined;
    }[] | undefined;
}>;
export type ConfigPolicy = z.infer<typeof configPolicySchema>;
export declare const configSchema: z.ZodObject<{
    policy: z.ZodArray<z.ZodObject<{
        template: z.ZodDefault<z.ZodArray<z.ZodString, "many">>;
        section: z.ZodDefault<z.ZodArray<z.ZodObject<{
            id: z.ZodArray<z.ZodString, "many">;
            blockList: z.ZodDefault<z.ZodArray<z.ZodString, "many">>;
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
            blockList: string[];
            label: {
                name: string;
                keys: string[];
            }[];
        }, {
            id: string[];
            blockList?: string[] | undefined;
            label?: {
                name: string;
                keys: string[];
            }[] | undefined;
        }>, "many">>;
    }, "strip", z.ZodTypeAny, {
        template: string[];
        section: {
            id: string[];
            blockList: string[];
            label: {
                name: string;
                keys: string[];
            }[];
        }[];
    }, {
        template?: string[] | undefined;
        section?: {
            id: string[];
            blockList?: string[] | undefined;
            label?: {
                name: string;
                keys: string[];
            }[] | undefined;
        }[] | undefined;
    }>, "many">;
}, "strip", z.ZodTypeAny, {
    policy: {
        template: string[];
        section: {
            id: string[];
            blockList: string[];
            label: {
                name: string;
                keys: string[];
            }[];
        }[];
    }[];
}, {
    policy: {
        template?: string[] | undefined;
        section?: {
            id: string[];
            blockList?: string[] | undefined;
            label?: {
                name: string;
                keys: string[];
            }[] | undefined;
        }[] | undefined;
    }[];
}>;
export type Config = z.infer<typeof configSchema>;
