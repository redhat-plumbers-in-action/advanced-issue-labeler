import { IssueFormType } from './schema/input';

export class IssueForm {
  constructor(public parsed: IssueFormType) {}

  isProperty(key: string) {
    return this.parsed.hasOwnProperty(key);
  }

  getSafeProperty(key: string) {
    if (!this.isProperty(key)) return undefined;

    return this.parsed[key];
  }

  listKeywords(key: string, blockList: string[]) {
    let propertySection = this.getSafeProperty(key);

    if (!propertySection) return undefined;

    // Only Checkboxes are in form of array, dropdowns are strings separated by ', '
    if (!Array.isArray(propertySection)) {
      propertySection = propertySection.split(', ', 25);
    }

    return propertySection.filter(label => !this.isCompliant(blockList, label));
  }

  isCompliant(policy: string[], keyword: string) {
    return !!policy.find(rule => keyword === rule);
  }
}
