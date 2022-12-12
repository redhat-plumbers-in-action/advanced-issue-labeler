import { describe, it, expect, beforeEach, test } from 'vitest';

import { IssueForm } from '../../src/issue-form';

describe('IssueForm Object', () => {
  let issueForms: IssueForm[];

  beforeEach(() => {
    issueForms = [new IssueForm({})];
  });

  it('can be instantiated', () => {
    issueForms.map(item => expect(item).toBeDefined());
  });

  test.todo('get parsed()');

  test.todo('isProperty()');
  test.todo('getProperty()');
  test.todo('getSafeProperty()');
  test.todo('listKeywords()');
  test.todo('isCompliant()');
});
