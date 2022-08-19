import { describe, it, expect, beforeEach } from 'vitest';

import { IssueForm } from '../../src/issue-form';

describe('IssueForm Object', () => {
  let issueForms: IssueForm[];

  beforeEach(() => {
    issueForms = [new IssueForm({})];
  });

  it('can be instantiated', () => {
    issueForms.map(item => expect(item).toBeDefined());
  });
});
