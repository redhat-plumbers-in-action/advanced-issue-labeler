var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { debug, error } from '@actions/core';
import { ValidateIf, validate, ValidateNested, Allow } from 'class-validator';
import { ValidationFeedback } from './validation-feedback';
import { Inputs } from './inputs';
export class Labeler {
    constructor(issueForm) {
        // State holders
        this._isConfig = undefined;
        this._isInputs = undefined;
        this._issueForm = issueForm;
        this._inputs = new Inputs({});
    }
    get config() {
        return this._config;
    }
    set config(config) {
        this._config = config;
    }
    get inputs() {
        return this._inputs;
    }
    set inputs(inputs) {
        this._inputs = inputs;
    }
    //? FIXME: This should be done better...
    setInputs(inputs) {
        var _a, _b, _c;
        if (inputs.template)
            this._inputs.template =
                ((_a = inputs.template) === null || _a === void 0 ? void 0 : _a.length) === 0 ? undefined : inputs.template;
        if (inputs.section)
            this._inputs.section =
                ((_b = inputs.section) === null || _b === void 0 ? void 0 : _b.length) === 0 ? undefined : inputs.section;
        if (inputs.blockList)
            this._inputs.blockList =
                ((_c = inputs.blockList) === null || _c === void 0 ? void 0 : _c.length) === 0 ? undefined : inputs.blockList;
    }
    get isConfig() {
        if (this._isConfig === undefined)
            this.isConfig = !!this.config;
        return this._isConfig;
    }
    set isConfig(value) {
        this._isConfig = value;
    }
    get isInputs() {
        var _a;
        if (this._isInputs === undefined) {
            // TODO: This needs rework!
            // template is required
            this.isInputs = !!((_a = this.inputs) === null || _a === void 0 ? void 0 : _a.section) && this.inputs.section !== '';
        }
        return this._isInputs;
    }
    set isInputs(value) {
        this._isInputs = value;
    }
    get issueForm() {
        return this._issueForm;
    }
    set issueForm(issueForm) {
        this._issueForm = issueForm;
    }
    gatherLabels() {
        if (this.isInputs) {
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
    static async validate(instance) {
        const validationResult = await validate(instance, {
            whitelist: true,
            forbidNonWhitelisted: true,
        });
        error(validationResult.toString());
        const results = validationResult.map(e => {
            return ValidationFeedback.composeFeedbackObject(e);
        });
        return results;
    }
}
__decorate([
    ValidateIf(instance => !instance._inputs),
    ValidateNested()
], Labeler.prototype, "_config", void 0);
__decorate([
    ValidateIf(instance => !instance._config),
    ValidateNested()
], Labeler.prototype, "_inputs", void 0);
__decorate([
    Allow()
], Labeler.prototype, "_issueForm", void 0);
__decorate([
    Allow()
], Labeler.prototype, "_isConfig", void 0);
__decorate([
    Allow()
], Labeler.prototype, "_isInputs", void 0);
//# sourceMappingURL=labeler.js.map