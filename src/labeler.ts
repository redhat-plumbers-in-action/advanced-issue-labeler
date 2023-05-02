import { debug, error } from '@actions/core';
import { ValidateIf, validate, ValidateNested, Allow } from 'class-validator';

import { Config } from './config';
import { IssueForm } from './issue-form';
import { ValidationFeedback } from './validation-feedback';
import { Inputs } from './inputs';
import { TInputs } from './types.d';

export class Labeler {
  @ValidateIf(instance => !instance._inputs)
  @ValidateNested()
  private _config?: Config | undefined | null;

  @ValidateIf(instance => !instance._config)
  @ValidateNested()
  private _inputs: Inputs;

  @Allow()
  private _issueForm: IssueForm;

  // State holders
  @Allow()
  private _isConfig?: boolean = undefined;
  @Allow()
  private _isInputs?: boolean = undefined;

  constructor(issueForm: IssueForm) {
    this._issueForm = issueForm;
    this._inputs = new Inputs({});
  }

  get config() {
    return this._config;
  }

  set config(config: Config | undefined | null) {
    this._config = config;
  }

  get inputs() {
    return this._inputs;
  }

  set inputs(inputs: Inputs) {
    this._inputs = inputs;
  }

  //? FIXME: This should be done better...
  setInputs(inputs: TInputs) {
    if (inputs.template)
      this._inputs.template =
        inputs.template?.length === 0 ? undefined : inputs.template;

    if (inputs.section)
      this._inputs.section =
        inputs.section?.length === 0 ? undefined : inputs.section;

    // ! FIXME: Should be handled by zod in future ...
    if (inputs.blockList) {
      if (inputs.blockList.length === 0) {
        this._inputs.blockList = undefined;
        return;
      }

      if (Array.isArray(inputs.blockList) && inputs.blockList.length > 0) {
        if (inputs.blockList[0].length === 0) {
          this._inputs.blockList = undefined;
          return;
        }
      }

      this._inputs.blockList = inputs.blockList;
    }
  }

  get isConfig() {
    if (this._isConfig === undefined) this.isConfig = !!this.config;

    return this._isConfig;
  }

  set isConfig(value: boolean | undefined) {
    this._isConfig = value;
  }

  get isInputs() {
    if (this._isInputs === undefined) {
      // TODO: This needs rework!
      // template is required
      this.isInputs = !!this.inputs?.section && this.inputs.section !== '';
    }

    return this._isInputs;
  }

  set isInputs(value: boolean | undefined) {
    this._isInputs = value;
  }

  private get issueForm() {
    return this._issueForm;
  }

  private set issueForm(issueForm: IssueForm) {
    this._issueForm = issueForm;
  }

  gatherLabels() {
    if (this.isInputs) {
      return this.inputBasedLabels();
    }

    return this.configBasedLabels();
  }

  // Expects that validation method was called in advance
  private inputBasedLabels() {
    const keywords = this.issueForm.listKeywords(
      this.inputs?.section ?? '',
      this.inputs?.blockList ?? ['']
    );

    if (!keywords || keywords?.length === 0) {
      debug(`Section field is empty.`);
      return;
    }

    if (!keywords[0]) {
      debug(`Section field is empty.`);
      return;
    }

    return keywords;
  }

  private configBasedLabels() {
    const labels: string[] = [];

    // Pick correct policy from config based on template input
    const selectedPolicy = this.config?.getTemplatePolicy(
      this.inputs?.template
    );

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

        const keywords = this.issueForm.listKeywords(
          singleID,
          sectionItem.blockList
        );

        if (!keywords || keywords?.length === 0) {
          debug(`Section field is empty.`);
          continue;
        }

        if (!keywords[0]) {
          debug(`Section field is empty.`);
          continue;
        }

        // Apply policy on provided data via issue
        for (const rule of sectionItem.label) {
          if (
            keywords.find(keyword => rule.keys.find(key => keyword === key))
          ) {
            labels.push(rule.name);
          }
        }
      }
    }

    return labels;
  }

  static async validate(instance: Labeler) {
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
