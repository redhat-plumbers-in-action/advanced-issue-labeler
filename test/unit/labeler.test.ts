import { describe, it, expect, beforeEach, test } from 'vitest';
import { IssueForm } from '../../src/issue-form';
import { Labeler } from '../../src/labeler';

import {
  ILabelerTestContext,
  labelerContextFixture,
} from './fixtures/labeler.fixture';

describe('IssueForm Object', () => {
  beforeEach<ILabelerTestContext>(context => {
    context.labelers = labelerContextFixture.labelers;
    context.invalid = labelerContextFixture.invalid;
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

  test('setInputs()', () => {
    let labeler = new Labeler(new IssueForm({}));
    labeler.setInputs({ section: 'section' });
    expect(labeler.inputs).toMatchInlineSnapshot(`
      Inputs {
        "_blockList": undefined,
        "_section": "section",
        "_template": undefined,
      }
    `);

    labeler.setInputs({ blockList: [''], template: 'template' });
    expect(labeler.inputs).toMatchInlineSnapshot(`
      Inputs {
        "_blockList": [
          "",
        ],
        "_section": "section",
        "_template": "template",
      }
    `);

    labeler.setInputs({ blockList: ['block1', 'block2'] });
    expect(labeler.inputs).toMatchInlineSnapshot(`
      Inputs {
        "_blockList": [
          "block1",
          "block2",
        ],
        "_section": "section",
        "_template": "template",
      }
    `);

    // ? Empty values doesn't overwrite exiting values
    labeler.setInputs({ section: '', template: '', blockList: [''] });
    expect(labeler.inputs).toMatchInlineSnapshot(`
      Inputs {
        "_blockList": [
          "",
        ],
        "_section": "section",
        "_template": "template",
      }
    `);

    // ? Undefined values doesn't overwrite exiting values
    labeler.setInputs({
      section: undefined,
      template: undefined,
      blockList: undefined,
    });
    expect(labeler.inputs).toMatchInlineSnapshot(`
      Inputs {
        "_blockList": [
          "",
        ],
        "_section": "section",
        "_template": "template",
      }
    `);
  });

  test<ILabelerTestContext>('get isConfig()', context =>
    context.labelers.map(labelerItem =>
      expect(labelerItem.isConfig).toMatchSnapshot()
    ));

  test.todo('set isConfig()');

  test<ILabelerTestContext>('get isInputs()', context =>
    context.labelers.map(labelerItem =>
      expect(labelerItem.isInputs).toMatchSnapshot()
    ));

  test.todo('set isInputs()');

  // private
  test.todo('get issueForm()');
  test.todo('set issueForm()');

  test.todo('gatherLabels()');

  // private
  test.todo('inputBasedLabels()');
  test.todo('configBasedLabels()');

  it<ILabelerTestContext>('is valid', async context =>
    context.labelers.map(async labelerItem => {
      //! FIXME: There is probably a better way how to do this ...
      labelerItem.setInputs({ section: 'section' });
      expect(Labeler.validate(labelerItem)).resolves.toMatchObject([]);
    }));

  it<ILabelerTestContext>('is invalid', async context =>
    context.invalid.map(async invalidItem =>
      expect(Labeler.validate(invalidItem)).resolves.toMatchSnapshot()
    ));
});
