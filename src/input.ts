import { z } from 'zod';
import { IssueForm } from './issue-form';
import { inputSchema, InputType, jsonSchema } from './schema/input';

export class Input {
  readonly issueForm: InputType['issueForm'];
  readonly template: InputType['template'];
  readonly section: InputType['section'];
  readonly blockList: InputType['blockList'];

  constructor(input: unknown) {
    const parsedInput = inputSchema.parse(input);

    this.issueForm = parsedInput.issueForm;
    this.template = parsedInput.template;
    this.section = parsedInput.section;
    this.blockList = parsedInput.blockList;
  }
}
