import { validate } from 'class-validator';
import { describe, it, expect, beforeEach, test } from 'vitest';

import {
  inputsContextFixture,
  IInputsTestContext,
} from './fixtures/inputs.fixture';

describe('Inputs Object', () => {
  beforeEach<IInputsTestContext>(context => {
    context.inputs = inputsContextFixture.inputs;
    context.invalid = inputsContextFixture.invalid;
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

  it<IInputsTestContext>('is valid', async context =>
    context.inputs.map(async inputsItem =>
      expect(validate(inputsItem)).resolves.toMatchObject([])
    ));

  it<IInputsTestContext>('is invalid', async context =>
    context.invalid.map(async invalidItem =>
      expect(validate(invalidItem)).resolves.toMatchSnapshot()
    ));
});
