import { vi } from 'vitest';
import { Config } from '../../../src/config';
import { IssueForm } from '../../../src/issue-form';
import { Labeler } from '../../../src/labeler';

export interface ILabelerTestContext {
  labelers: Labeler[];
}

vi.stubEnv('INPUT_SECTION', 'severity');
vi.stubEnv('INPUT_BLOCK_LIST', '["None","Other"]');

export const labelerContextFixture: ILabelerTestContext = {
  labelers: [
    new Labeler(
      new IssueForm({}),
      new Config(undefined, 'advanced-issue-labeler.yml')
    ),
    // TODO: Add more test objects ...
  ],
};
