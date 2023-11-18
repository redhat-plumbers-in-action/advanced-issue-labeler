import { CustomOctokit } from './octokit';
import { ConfigPolicy } from './schema/config';
export declare class Config {
    path: string;
    policy: ConfigPolicy[] | undefined | null;
    constructor(config: unknown, path: string);
    getTemplatePolicy(template: string | undefined): {
        template: string[];
        section: {
            id: string[];
            blockList: string[];
            label: {
                name: string;
                keys: string[];
            }[];
        }[];
    } | undefined;
    static getConfig(octokit: CustomOctokit): Promise<Config>;
    isPolicyEmpty(): boolean;
}
