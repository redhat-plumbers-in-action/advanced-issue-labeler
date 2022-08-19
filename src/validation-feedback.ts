import { ValidationError } from 'class-validator';

// eslint-disable-next-line @typescript-eslint/no-extraneous-class
export class ValidationFeedback {
  static composeFeedbackObject(data: ValidationError) {
    if (!data.children?.length) {
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

  static composeProperty(data: ValidationError): string {
    return !data.children?.length
      ? `${data.property}`
      : `${data.property}.${data.children.map(item => {
          return ValidationFeedback.composeProperty(item);
        })}`;
  }

  static composeValue<T extends keyof ValidationError>(
    data: ValidationError,
    name: T
  ): ValidationError[T] {
    return !data.children?.length
      ? data[name]
      : data.children.map(item => {
          return ValidationFeedback.composeValue(item, name);
        })[0];
  }
}
