import { TConfigObject, TPolicyItem, TSectionItem, TLabelItem } from './types.d';
import { CustomOctokit } from './octokit';
export declare class Config {
    private _policy;
    constructor(config: TConfigObject);
    get policy(): PolicyItem[];
    getTemplatePolicy(template: string | undefined): PolicyItem | undefined;
    static getConfig(octokit: CustomOctokit): Promise<Config>;
    static isConfigEmpty(config: TConfigObject | null | unknown): boolean;
    static validate(instance: Config): Promise<{
        property: string;
        value: any;
        notes: {
            [type: string]: string;
        } | undefined;
    }[]>;
}
export declare class PolicyItem {
    private _template?;
    private _section;
    constructor(item: TPolicyItem);
    get template(): string[] | undefined;
    get section(): SectionItem[];
}
export declare class SectionItem {
    private _id;
    private _blockList;
    private _label;
    constructor(item: TSectionItem);
    get id(): string[];
    get blockList(): string[];
    get label(): TLabelItem[];
}
export declare class Label {
    private _name;
    private _keys;
    constructor(item: TLabelItem);
    get name(): string;
    get keys(): string[];
}
