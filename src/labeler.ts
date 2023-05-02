import { debug, error } from '@actions/core';

import { Config } from './config';
import { IssueForm } from './issue-form';
import { Input } from './input';

export class Labeler {
  readonly issueForm: IssueForm;

  constructor(
    readonly config: Config | undefined | null,
    readonly inputs: Input
  ) {
    this.issueForm = new IssueForm(inputs.issueForm);
  }

  get isInputBased(): boolean {
    return !!this.inputs?.section && this.inputs?.section !== '';
  }

  gatherLabels() {
    if (this.isInputBased) {
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
}
