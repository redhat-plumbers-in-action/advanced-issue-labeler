import { z } from 'zod';
export const issueFormSchema = z.record(z.string(), z
    .string()
    .or(z.array(z.string()))
    .or(z.array(z.array(z.unknown())))
    .transform(value => {
    // ?NOTE: This is just a workaround for issue in github issue parser: https://github.com/stefanbuck/github-issue-parser/issues/90
    // Transform array of arrays into simple array
    if (Array.isArray(value)) {
        return value.map(item => Array.isArray(item) ? item.join(', ') : item);
    }
    return value;
}));
export const sectionSchema = z.string().min(1);
export const blockListSchema = z.array(z.string().min(1)).default([]);
export const templateSchema = z.string().min(1).optional();
//# sourceMappingURL=input.js.map