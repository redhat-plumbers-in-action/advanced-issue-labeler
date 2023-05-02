import { Config } from './config';
import { IssueForm } from './issue-form';
import { Input } from './input';
export declare class Labeler {
    readonly config: Config | undefined | null;
    readonly inputs: Input;
    readonly issueForm: IssueForm;
    constructor(config: Config | undefined | null, inputs: Input);
    get isInputBased(): boolean;
    gatherLabels(): string[] | undefined;
    private inputBasedLabels;
    private configBasedLabels;
}
