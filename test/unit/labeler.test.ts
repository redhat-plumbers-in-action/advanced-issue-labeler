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

  test<ILabelerTestContext>('get inputs()', context =>
    context.labelers.map(labelerItem => {
      expect(labelerItem.section).toMatchSnapshot();
      expect(labelerItem.blockList).toMatchSnapshot();
      expect(labelerItem.template).toMatchSnapshot();
    }));

  test<ILabelerTestContext>('get isConfig()', context =>
    context.labelers.map(labelerItem =>
      expect(labelerItem.isConfig).toMatchSnapshot()
    ));

  test<ILabelerTestContext>('get isInputs()', context =>
    context.labelers.map(labelerItem =>
      expect(labelerItem.isInputs).toMatchSnapshot()
    ));

  test<ILabelerTestContext>('gatherLabels()', context =>
    context.labelers.map(labelerItem =>
      expect(labelerItem.gatherLabels()).toMatchSnapshot()
    ));
});
