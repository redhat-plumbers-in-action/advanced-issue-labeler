import { Config } from './config';
import { IssueForm } from './issue-form';
import { BlockList, Section, Template } from './schema/input';
import { OutputPolicy } from './schema/output';
export declare class Labeler {
    issueForm: IssueForm;
    config: Config;
    section: Section | undefined;
    blockList: BlockList | undefined;
    template: Template;
    isConfig: boolean;
    isInputs: boolean;
    outputPolicy: OutputPolicy;
    constructor(issueForm: IssueForm, config: Config);
    gatherLabels(): string[] | undefined;
    inputBasedLabels(): string[] | undefined;
    configBasedLabels(): string[] | undefined;
}
