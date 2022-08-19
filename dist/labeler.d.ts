import { Config } from './config';
import { IssueForm } from './issue-form';
import { TInputs } from './types.d';
export declare class Labeler {
    private _config?;
    private _inputs?;
    private _issueForm;
    private _isConfig?;
    private _isInputs?;
    constructor(issueForm: IssueForm);
    get config(): Config | undefined | null;
    set config(config: Config | undefined | null);
    get inputs(): TInputs | undefined;
    set inputs(inputs: TInputs | undefined);
    get isConfig(): boolean | undefined;
    set isConfig(value: boolean | undefined);
    get isInputs(): boolean | undefined;
    set isInputs(value: boolean | undefined);
    private get issueForm();
    private set issueForm(value);
    gatherLabels(): string[] | undefined;
    private inputBasedLabels;
    private configBasedLabels;
    static validate(instance: Labeler): Promise<{
        property: string;
        value: any;
        notes: {
            [type: string]: string;
        } | undefined;
    }[]>;
}
