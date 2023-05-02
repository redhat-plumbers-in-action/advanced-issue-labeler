import { debug } from '@actions/core';
import { configSchema } from './schema/config';
export class Config {
    constructor(config) {
        this.policy = configSchema.parse(config).policy;
    }
    getTemplatePolicy(template) {
        // ?: When template name is provided look for section that match the template name
        const templatePolicy = this.policy.find(pItem => { var _a; return (_a = pItem.template) === null || _a === void 0 ? void 0 : _a.find(tItem => tItem === template); });
        // If exact policy for template exists ; return it
        if (templatePolicy)
            return templatePolicy;
        // ?: When template name is undefined look for section that undefined template field
        debug(`Looking for default policy ...`);
        return this.policy.find(pItem => !(pItem === null || pItem === void 0 ? void 0 : pItem.template) ||
            (Array.isArray(pItem === null || pItem === void 0 ? void 0 : pItem.template) && (pItem === null || pItem === void 0 ? void 0 : pItem.template.length) === 0));
    }
    static async getConfig(context) {
        const retrievedConfig = await context.config('advanced-issue-labeler.yml');
        if (Config.isConfigEmpty(retrievedConfig)) {
            return null;
        }
        return new Config(retrievedConfig);
    }
    static isConfigEmpty(config) {
        return config === null || config === undefined;
    }
}
//# sourceMappingURL=config.js.map