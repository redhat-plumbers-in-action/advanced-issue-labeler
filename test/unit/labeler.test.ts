import { describe, it, expect, beforeEach, test } from 'vitest';

import { IssueForm } from '../../src/issue-form';
import { Labeler } from '../../src/labeler';

describe('IssueForm Object', () => {
  let labelers: Labeler[];

  beforeEach(() => {
    labelers = [new Labeler(new IssueForm({}))];
  });

  it('can be instantiated', () => {
    labelers.map(item => expect(item).toBeDefined());
  });

  test.todo('get config()');
  test.todo('set config()');
  test.todo('get inputs()');
  test.todo('set inputs()');

  test.todo('setInputs()');

  test.todo('get isConfig()');
  test.todo('set isConfig()');

  test.todo('get isInputs()');
  test.todo('set isInputs()');

  test.todo('get issueForm()');
  test.todo('set issueForm()');

  test.todo('gatherLabels()');

  test.todo('inputBasedLabels()');
  test.todo('configBasedLabels()');

  it.todo('is valid');
  it.todo('is invalid');
});
