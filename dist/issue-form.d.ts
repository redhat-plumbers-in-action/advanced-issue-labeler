export declare class IssueForm {
    private _parsed;
    constructor(parsedIssue: {});
    private get parsed();
    isProperty(key: string): boolean;
    getProperty(key: string): string;
    getSafeProperty(key: string): string | undefined;
    listKeywords(key: string, blockList: string[]): string[] | undefined;
    isCompliant(policy: string[], keyword: string): boolean;
}
