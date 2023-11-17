import { debug } from '@actions/core';
import {
  ArrayMinSize,
  IsArray,
  IsString,
  MinLength,
  validate,
  ValidateNested,
} from 'class-validator';

import {
  TConfigObject,
  TPolicyItem,
  TSectionItem,
  TLabelItem,
} from './types.d';
import { ValidationFeedback } from './validation-feedback';
import { context } from '@actions/github';
import { CustomOctokit } from './octokit';

export class Config {
  @IsArray()
  @ValidateNested({ each: true })
  @ArrayMinSize(1)
  private _policy: PolicyItem[];

  constructor(config: TConfigObject) {
    this._policy = Array.isArray(config?.policy)
      ? config.policy.map(item => new PolicyItem(item))
      : [];
  }

  get policy() {
    return this._policy;
  }

  getTemplatePolicy(template: string | undefined) {
    // ?: When template name is provided look for section that match the template name
    const templatePolicy = this.policy.find(
      pItem => pItem.template?.find(tItem => tItem === template)
    );

    // If exact policy for template exists ; return it
    if (templatePolicy) return templatePolicy;

    // ?: When template name is undefined look for section that undefined template field
    debug(`Looking for default policy ...`);
    return this.policy.find(
      pItem =>
        !pItem?.template ||
        (Array.isArray(pItem?.template) && pItem?.template.length === 0)
    );
  }

  static async getConfig(octokit: CustomOctokit): Promise<Config> {
    const path = 'advanced-issue-labeler.yml';

    const retrievedConfig = (
      await octokit.config.get({
        ...context.repo,
        path,
      })
    ).config;

    debug(`Configuration '${path}': ${JSON.stringify(retrievedConfig)}`);

    if (Config.isConfigEmpty(retrievedConfig)) {
      throw new Error(
        `Missing configuration. Please setup 'Tracker Validator' Action using 'tracker-validator.yml' file.`
      );
    }

    return new this(retrievedConfig as TConfigObject);
  }

  static isConfigEmpty(config: TConfigObject | null | unknown) {
    return config === null;
  }

  static async validate(instance: Config) {
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

export class PolicyItem {
  @IsString({ each: true })
  @MinLength(0, { each: true })
  private _template?: string[];

  @IsArray()
  @ValidateNested({ each: true })
  @ArrayMinSize(1)
  private _section: SectionItem[];

  constructor(item: TPolicyItem) {
    this._template = item?.template ?? [];
    this._section = Array.isArray(item?.section)
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

export class SectionItem {
  @IsString({ each: true })
  @MinLength(1, { each: true })
  private _id: string[];

  @IsString({ each: true })
  @MinLength(0, { each: true })
  private _blockList: string[];

  @IsArray()
  @ValidateNested({ each: true })
  @ArrayMinSize(1)
  private _label: TLabelItem[];

  constructor(item: TSectionItem) {
    this._id = item?.id;
    this._blockList = item?.hasOwnProperty('block-list')
      ? item['block-list'] ?? []
      : [];
    this._label = Array.isArray(item?.label)
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

export class Label {
  @IsString()
  @MinLength(1)
  private _name: string;

  @IsString({ each: true })
  @MinLength(1, { each: true })
  private _keys: string[];

  constructor(item: TLabelItem) {
    this._name = item?.name;
    this._keys = item?.keys;
  }

  get name() {
    return this._name;
  }

  get keys() {
    return this._keys;
  }
}
