import { describe, it, expect, beforeEach } from 'vitest';

import { Inputs } from '../../src/inputs';

describe('IssueForm Object', () => {
  let inputs: Inputs[];

  beforeEach(() => {
    inputs = [new Inputs({})];
  });

  it('can be instantiated', () => {
    inputs.map(item => expect(item).toBeDefined());
  });
});
