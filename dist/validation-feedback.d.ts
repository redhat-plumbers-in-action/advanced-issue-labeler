import { ValidationError } from 'class-validator';
export declare class ValidationFeedback {
    static composeFeedbackObject(data: ValidationError): {
        property: string;
        value: any;
        notes: {
            [type: string]: string;
        } | undefined;
    };
    static composeProperty(data: ValidationError): string;
    static composeValue<T extends keyof ValidationError>(data: ValidationError, name: T): ValidationError[T];
}
