import { debug } from '@actions/core';
import { IssueForm } from './issue-form';
export class Labeler {
    constructor(config, inputs) {
        this.config = config;
        this.inputs = inputs;
        this.issueForm = new IssueForm(inputs.issueForm);
    }
    get isInputBased() {
        var _a, _b;
        return !!((_a = this.inputs) === null || _a === void 0 ? void 0 : _a.section) && ((_b = this.inputs) === null || _b === void 0 ? void 0 : _b.section) !== '';
    }
    gatherLabels() {
        if (this.isInputBased) {
            return this.inputBasedLabels();
        }
        return this.configBasedLabels();
    }
    // Expects that validation method was called in advance
    inputBasedLabels() {
        var _a, _b, _c, _d;
        const keywords = this.issueForm.listKeywords((_b = (_a = this.inputs) === null || _a === void 0 ? void 0 : _a.section) !== null && _b !== void 0 ? _b : '', (_d = (_c = this.inputs) === null || _c === void 0 ? void 0 : _c.blockList) !== null && _d !== void 0 ? _d : ['']);
        if (!keywords || (keywords === null || keywords === void 0 ? void 0 : keywords.length) === 0) {
            debug(`Section field is empty.`);
            return;
        }
        if (!keywords[0]) {
            debug(`Section field is empty.`);
            return;
        }
        return keywords;
    }
    configBasedLabels() {
        var _a, _b;
        const labels = [];
        // Pick correct policy from config based on template input
        const selectedPolicy = (_a = this.config) === null || _a === void 0 ? void 0 : _a.getTemplatePolicy((_b = this.inputs) === null || _b === void 0 ? void 0 : _b.template);
        if (!selectedPolicy) {
            debug(`Policy wasn't provided!`);
            return;
        }
        // For each section of policy
        for (const sectionItem of selectedPolicy.section) {
            // For each id of policy
            for (const singleID of sectionItem.id) {
                if (!this.issueForm.isProperty(singleID)) {
                    debug(`Issue form doesn't contain section: ${singleID}`);
                    continue;
                }
                const keywords = this.issueForm.listKeywords(singleID, sectionItem.blockList);
                if (!keywords || (keywords === null || keywords === void 0 ? void 0 : keywords.length) === 0) {
                    debug(`Section field is empty.`);
                    continue;
                }
                if (!keywords[0]) {
                    debug(`Section field is empty.`);
                    continue;
                }
                // Apply policy on provided data via issue
                for (const rule of sectionItem.label) {
                    if (keywords.find(keyword => rule.keys.find(key => keyword === key))) {
                        labels.push(rule.name);
                    }
                }
            }
        }
        return labels;
    }
}
//# sourceMappingURL=labeler.js.map