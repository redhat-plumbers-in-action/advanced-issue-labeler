var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { debug } from '@actions/core';
// import { Type } from 'class-transformer';
import { ArrayMinSize, IsArray, IsString, MinLength, validate, ValidateNested, } from 'class-validator';
import { ValidationFeedback } from './validation-feedback';
export class Config {
    constructor(config) {
        this._policy = Array.isArray(config === null || config === void 0 ? void 0 : config.policy)
            ? config.policy.map(item => new PolicyItem(item))
            : [];
    }
    get policy() {
        return this._policy;
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
        const config = new this(retrievedConfig);
        return config;
    }
    static isConfigEmpty(config) {
        return config === null;
    }
    static async validate(instance) {
        const validationResult = await validate(instance, {
            whitelist: true,
            forbidNonWhitelisted: true,
        });
        const results = validationResult.map(error => {
            return ValidationFeedback.composeFeedbackObject(error);
        });
        return results;
    }
}
__decorate([
    IsArray(),
    ValidateNested({ each: true }),
    ArrayMinSize(1)
    // @Type(() => SectionItem)
], Config.prototype, "_policy", void 0);
class PolicyItem {
    constructor(item) {
        var _a;
        this._template = (_a = item === null || item === void 0 ? void 0 : item.template) !== null && _a !== void 0 ? _a : [];
        this._section = Array.isArray(item === null || item === void 0 ? void 0 : item.section)
            ? item.section.map(sectionItem => new SectionItem(sectionItem))
            : [];
    }
    get template() {
        return this._template;
    }
    get section() {
        return this._section;
    }
}
__decorate([
    IsString({ each: true }),
    MinLength(0, { each: true })
], PolicyItem.prototype, "_template", void 0);
__decorate([
    IsArray(),
    ValidateNested({ each: true }),
    ArrayMinSize(1)
    // @Type(() => SectionItem)
], PolicyItem.prototype, "_section", void 0);
class SectionItem {
    constructor(item) {
        var _a;
        this._id = item === null || item === void 0 ? void 0 : item.id;
        this._blockList = (_a = item['block-list']) !== null && _a !== void 0 ? _a : [];
        this._label = Array.isArray(item === null || item === void 0 ? void 0 : item.label)
            ? item.label.map(labelItem => new Label(labelItem))
            : [];
    }
    get id() {
        return this._id;
    }
    get blockList() {
        return this._blockList;
    }
    get label() {
        return this._label;
    }
}
__decorate([
    IsString({ each: true }),
    MinLength(1, { each: true })
], SectionItem.prototype, "_id", void 0);
__decorate([
    IsString({ each: true }),
    MinLength(0, { each: true })
], SectionItem.prototype, "_blockList", void 0);
__decorate([
    IsArray(),
    ValidateNested({ each: true }),
    ArrayMinSize(1)
    // @Type(() => SectionItem)
], SectionItem.prototype, "_label", void 0);
class Label {
    constructor(item) {
        this._name = item === null || item === void 0 ? void 0 : item.name;
        this._keys = item === null || item === void 0 ? void 0 : item.keys;
    }
    get name() {
        return this._name;
    }
    get keys() {
        return this._keys;
    }
}
__decorate([
    IsString(),
    MinLength(1)
], Label.prototype, "_name", void 0);
__decorate([
    IsString({ each: true }),
    MinLength(1, { each: true })
], Label.prototype, "_keys", void 0);
//# sourceMappingURL=config.js.map