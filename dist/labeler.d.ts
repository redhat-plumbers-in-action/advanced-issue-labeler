import { Config } from './config';
import { IssueForm } from './issue-form';
import { BlockList, Section, Template } from './schema/input';
export declare class Labeler {
    issueForm: IssueForm;
    config: Config;
    section: Section | undefined;
    blockList: BlockList | undefined;
    template: Template;
    isConfig: boolean;
    isInputs: boolean;
    constructor(issueForm: IssueForm, config: Config);
    gatherLabels(): string[] | undefined;
    inputBasedLabels(): string[] | undefined;
    configBasedLabels(): string[] | undefined;
}
