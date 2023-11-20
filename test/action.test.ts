import { describe, expect, test } from 'vitest';

import action from '../src/action';

describe('Integration test', () => {
  test('Smoke', async () => {
    expect(action).toBeInstanceOf(Function);
  });
});
