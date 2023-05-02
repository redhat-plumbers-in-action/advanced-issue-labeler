import { Input } from '../../../src/input';

export interface IInputsTestContext {
  inputs: Input[];
}

export const inputsContextFixture: IInputsTestContext = {
  inputs: [
    new Input({ issueForm: {}, section: 'section' }),
    new Input({ issueForm: {}, section: 'section', blockList: undefined }),
    new Input({
      issueForm: {},
      section: 'section',
      blockList: ['block1', 'block2'],
    }),
    new Input({ issueForm: {}, section: 'section', template: 'template' }),
  ],
};
