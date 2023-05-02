import { describe, it, expect, beforeEach, test } from 'vitest';

import {
  ILabelerTestContext,
  labelerContextFixture,
} from './fixtures/labeler.fixture';

describe('IssueForm Object', () => {
  beforeEach<ILabelerTestContext>(context => {
    context.labelers = labelerContextFixture.labelers;
  });

  it<ILabelerTestContext>('can be instantiated', context =>
    context.labelers.map(labelerItem => expect(labelerItem).toBeDefined()));

  test<ILabelerTestContext>('get config()', context =>
    context.labelers.map(labelerItem =>
      expect(labelerItem.config).toMatchSnapshot()
    ));

  test.todo('set config()');

  test<ILabelerTestContext>('get inputs()', context =>
    context.labelers.map(labelerItem =>
      expect(labelerItem.inputs).toMatchSnapshot()
    ));

  test.todo('set inputs()');
  test.todo('set isConfig()');
  test.todo('set isInputs()');

  // private
  test.todo('get issueForm()');
  test.todo('set issueForm()');

  test<ILabelerTestContext>('gatherLabels()', context =>
    context.labelers.map(labelerItem =>
      expect(labelerItem.gatherLabels()).toMatchSnapshot()
    ));

  // private
  test.todo('inputBasedLabels()');
  test.todo('configBasedLabels()');
});
