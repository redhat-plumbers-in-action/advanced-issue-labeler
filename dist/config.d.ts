import { Context } from 'probot';
import { events } from './events';
import { ConfigPolicy } from './schema/config';
export declare class Config {
    policy: ConfigPolicy[];
    constructor(config: unknown);
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
    static getConfig(context: {
        [K in keyof typeof events]: Context<(typeof events)[K][number]>;
    }[keyof typeof events]): Promise<Config | null>;
    static isConfigEmpty(config: unknown): boolean;
}
