import { debug, getInput } from '@actions/core';
import { context } from '@actions/github';
import { configSchema } from './schema/config';
export class Config {
    constructor(config, path) {
        this.path = path;
        const parsedConfig = configSchema.parse(config);
        this.policy = parsedConfig === null || parsedConfig === void 0 ? void 0 : parsedConfig.policy;
    }
    getTemplatePolicy(template) {
        var _a, _b;
        if (this.isPolicyEmpty()) {
            throw new Error(`Missing configuration. Please setup 'Advanced Issue Labeler' Action using '${this.path}' file.`);
        }
        // ?: When template name is provided look for section that match the template name
        const templatePolicy = (_a = this.policy) === null || _a === void 0 ? void 0 : _a.find(pItem => { var _a; return (_a = pItem.template) === null || _a === void 0 ? void 0 : _a.find(tItem => tItem === template); });
        // If exact policy for template exists ; return it
        if (templatePolicy)
            return templatePolicy;
        // ?: When template name is undefined look for section that undefined template field
        debug(`Looking for default policy ...`);
        return (_b = this.policy) === null || _b === void 0 ? void 0 : _b.find(pItem => !(pItem === null || pItem === void 0 ? void 0 : pItem.template) ||
            (Array.isArray(pItem === null || pItem === void 0 ? void 0 : pItem.template) && (pItem === null || pItem === void 0 ? void 0 : pItem.template.length) === 0));
    }
    static async getConfig(octokit) {
        const path = getInput('config-path', { required: true });
        const retrievedConfig = (await octokit.config.get(Object.assign(Object.assign({}, context.repo), { path }))).config;
        debug(`Configuration '${path}': ${JSON.stringify(retrievedConfig)}`);
        return new this(retrievedConfig, path);
    }
    isPolicyEmpty() {
        return this.policy === null || this.policy === undefined;
    }
}
//# sourceMappingURL=config.js.map