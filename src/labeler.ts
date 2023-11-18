import { debug, getInput } from '@actions/core';

import { Config } from './config';
import { IssueForm } from './issue-form';

import { BlockList, Section, Template } from './schema/input';

export class Labeler {
  section: Section | undefined = undefined;
  blockList: BlockList | undefined = undefined;
  template: Template;

  isConfig: boolean;
  isInputs: boolean;

  constructor(
    public issueForm: IssueForm,
    public config: Config
  ) {
    // If no config was provided try inputs
    if (this.config.isPolicyEmpty()) {
      debug(`Policy wasn't provided!`);
      this.isConfig = false;
      this.isInputs = true;
      this.section = getInput('section', { required: true });
      this.blockList = getInput('block-list').split('\n', 25);
    } else {
      debug(`Policy was provided!`);
      this.isConfig = true;
      this.isInputs = false;
    }
    // Config requires template as well
    this.template = getInput('template');
  }

  gatherLabels() {
    if (this.isInputs) {
      return this.inputBasedLabels();
    }

    return this.configBasedLabels();
  }

  // Expects that validation method was called in advance
  inputBasedLabels() {
    if (!this.section || !this.blockList) {
      throw new Error('Section or block list is undefined!');
    }

    const keywords = this.issueForm.listKeywords(this.section, this.blockList);

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

  configBasedLabels() {
    const labels: string[] = [];

    // Pick correct policy from config based on template input
    const selectedPolicy = this.config?.getTemplatePolicy(this.template);

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
          sectionItem['block-list']
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
            keywords.find((keyword: string) =>
              rule.keys.find(key => keyword === key)
            )
          ) {
            labels.push(rule.name);
          }
        }
      }
    }

    return labels;
  }
}
