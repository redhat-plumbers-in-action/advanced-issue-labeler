// eslint-disable-next-line @typescript-eslint/no-extraneous-class
export class ValidationFeedback {
    static composeFeedbackObject(data) {
        var _a;
        if (!((_a = data.children) === null || _a === void 0 ? void 0 : _a.length)) {
            return {
                property: data.property,
                value: data.value,
                notes: data.constraints,
            };
        }
        return {
            property: ValidationFeedback.composeProperty(data),
            value: ValidationFeedback.composeValue(data, 'value'),
            notes: ValidationFeedback.composeValue(data, 'constraints'),
        };
    }
    static composeProperty(data) {
        var _a;
        return !((_a = data.children) === null || _a === void 0 ? void 0 : _a.length)
            ? `${data.property}`
            : `${data.property}.${data.children.map(item => {
                return ValidationFeedback.composeProperty(item);
            })}`;
    }
    static composeValue(data, name) {
        var _a;
        return !((_a = data.children) === null || _a === void 0 ? void 0 : _a.length)
            ? data[name]
            : data.children.map(item => {
                return ValidationFeedback.composeValue(item, name);
            })[0];
    }
}
//# sourceMappingURL=validation-feedback.js.map