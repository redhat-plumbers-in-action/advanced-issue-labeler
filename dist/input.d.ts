import { InputType } from './schema/input';
export declare class Input {
    readonly issueForm: InputType['issueForm'];
    readonly template: InputType['template'];
    readonly section: InputType['section'];
    readonly blockList: InputType['blockList'];
    constructor(input: unknown);
}
