import { IssueFormType } from './schema/input';
export declare class IssueForm {
    parsed: IssueFormType;
    constructor(parsed: IssueFormType);
    isProperty(key: string): boolean;
    getSafeProperty(key: string): string | string[] | undefined;
    listKeywords(key: string, blockList: string[]): string[] | undefined;
    isCompliant(policy: string[], keyword: string): boolean;
}
