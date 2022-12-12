import { Inputs } from '../../../src/inputs';

export interface IInputsTestContext {
  inputs: Inputs[];
  invalid: Inputs[];
}

export const inputsContextFixture: IInputsTestContext = {
  inputs: [
    new Inputs({ section: 'section' }),
    new Inputs({ section: 'section', blockList: ['block1', 'block2'] }),
    new Inputs({ section: 'section', template: 'template' }),
  ],

  invalid: [
    // @ts-expect-error: Let's ignore a type error, it's required for testing
    new Inputs(),
    new Inputs({}),
    new Inputs({ section: '' }),
    new Inputs({ blockList: [''], section: 'section' }),
    new Inputs({
      blockList: ['block1', 'block2'],
      section: 'section',
      template: '',
    }),
  ],
};
