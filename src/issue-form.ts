export class IssueForm {
  private _parsed: { [key: string]: string };

  constructor(parsedIssue: {}) {
    this._parsed = parsedIssue;
  }

  private get parsed() {
    return this._parsed;
  }

  isProperty(key: string) {
    return this.parsed.hasOwnProperty(key);
  }

  getProperty(key: string) {
    return this.parsed[key];
  }

  getSafeProperty(key: string) {
    if (!this.isProperty(key)) return undefined;

    return this.getProperty(key);
  }

  listKeywords(key: string, blockList: string[]) {
    const propertySection = this.getSafeProperty(key);

    if (!propertySection) return undefined;

    return propertySection
      .split(', ', 25)
      .filter(label => !this.isCompliant(blockList, label));
  }

  isCompliant(policy: string[], keyword: string) {
    return !!policy.find(rule => keyword === rule);
  }
}
