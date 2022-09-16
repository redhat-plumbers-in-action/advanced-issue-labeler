export class IssueForm {
    constructor(parsedIssue) {
        this._parsed = parsedIssue;
    }
    get parsed() {
        return this._parsed;
    }
    isProperty(key) {
        return this.parsed.hasOwnProperty(key);
    }
    getProperty(key) {
        return this.parsed[key];
    }
    getSafeProperty(key) {
        if (!this.isProperty(key))
            return undefined;
        return this.getProperty(key);
    }
    listKeywords(key, blockList) {
        const propertySection = this.getSafeProperty(key);
        if (!propertySection)
            return undefined;
        return propertySection
            .split(', ', 25)
            .filter(label => !this.isCompliant(blockList, label));
    }
    isCompliant(policy, keyword) {
        return !!policy.find(rule => keyword === rule);
    }
}
//# sourceMappingURL=issue-form.js.map