import { describe, it, expect, beforeEach, test } from 'vitest';

import {
  inputsContextFixture,
  IInputsTestContext,
} from './fixtures/input.fixture';

describe('Inputs Object', () => {
  beforeEach<IInputsTestContext>(context => {
    context.inputs = inputsContextFixture.inputs;
  });

  it<IInputsTestContext>('can be instantiated', context =>
    context.inputs.map(inputsItem => expect(inputsItem).toBeDefined()));

  test<IInputsTestContext>('get template()', context =>
    context.inputs.map(inputsItem =>
      expect(inputsItem.template).toMatchSnapshot()
    ));

  test.todo('set template()');

  test<IInputsTestContext>('get section()', context =>
    context.inputs.map(inputsItem =>
      expect(inputsItem.section).toMatchSnapshot()
    ));

  test.todo('set section()');

  test<IInputsTestContext>('get blockList()', context =>
    context.inputs.map(inputsItem =>
      expect(inputsItem.blockList).toMatchSnapshot()
    ));

  test.todo('set blockList()');
});
