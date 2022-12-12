import { IssueForm } from '../../../src/issue-form';
import { Labeler } from '../../../src/labeler';

export interface ILabelerTestContext {
  labelers: Labeler[];
  invalid: Labeler[];
}

export const labelerContextFixture: ILabelerTestContext = {
  labelers: [
    new Labeler(new IssueForm({})),
    // TODO: Add more test objects ...
  ],

  invalid: [
    // @ts-expect-error: Let's ignore a type error, it's required for testing
    new Labeler(),
    // @ts-expect-error: Let's ignore a type error, it's required for testing
    new Labeler({}),
    // @ts-expect-error: Let's ignore a type error, it's required for testing
    new Labeler(new IssueForm()),
    new Labeler(new IssueForm({})),
  ],
};
