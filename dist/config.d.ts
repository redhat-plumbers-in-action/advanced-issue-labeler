import { Context } from 'probot';
import { events } from './events';
import { TConfigObject, TPolicyItem, TSectionItem, TLabelItem } from './types.d';
export declare class Config {
    private _policy;
    constructor(config: TConfigObject);
    get policy(): PolicyItem[];
    getTemplatePolicy(template: string | undefined): PolicyItem | undefined;
    static getConfig(context: {
        [K in keyof typeof events]: Context<typeof events[K][number]>;
    }[keyof typeof events]): Promise<Config | null>;
    static isConfigEmpty(config: TConfigObject | null | unknown): boolean;
    static validate(instance: Config): Promise<{
        property: string;
        value: any;
        notes: {
            [type: string]: string;
        } | undefined;
    }[]>;
}
declare class PolicyItem {
    private _template?;
    private _section;
    constructor(item: TPolicyItem);
    get template(): string[] | undefined;
    get section(): SectionItem[];
}
declare class SectionItem {
    private _id;
    private _blockList;
    private _label;
    constructor(item: TSectionItem);
    get id(): string[];
    get blockList(): string[];
    get label(): TLabelItem[];
}
export {};
