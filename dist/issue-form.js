export class IssueForm {
    constructor(parsed) {
        this.parsed = parsed;
    }
    isProperty(key) {
        return this.parsed.hasOwnProperty(key);
    }
    getSafeProperty(key) {
        if (!this.isProperty(key))
            return undefined;
        return this.parsed[key];
    }
    listKeywords(key, blockList) {
        let propertySection = this.getSafeProperty(key);
        if (!propertySection)
            return undefined;
        // Only Checkboxes are in form of array, dropdowns are strings separated by ', '
        if (!Array.isArray(propertySection)) {
            propertySection = propertySection.split(', ', 25);
        }
        return propertySection.filter(label => !this.isCompliant(blockList, label));
    }
    isCompliant(policy, keyword) {
        return !!policy.find(rule => keyword === rule);
    }
}
//# sourceMappingURL=issue-form.js.map