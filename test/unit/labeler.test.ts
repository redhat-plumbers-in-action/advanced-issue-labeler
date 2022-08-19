import { describe, it, expect, beforeEach } from 'vitest';

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
});
