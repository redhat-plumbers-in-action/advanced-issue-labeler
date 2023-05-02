import { inputSchema } from './schema/input';
export class Input {
    constructor(input) {
        const parsedInput = inputSchema.parse(input);
        this.issueForm = parsedInput.issueForm;
        this.template = parsedInput.template;
        this.section = parsedInput.section;
        this.blockList = parsedInput.blockList;
    }
}
//# sourceMappingURL=input.js.map