import { z } from 'zod';
const outputPolicySchema = z.object({
    template: z.string(),
    section: z.record(z.array(z.string())),
});
//# sourceMappingURL=output.js.map