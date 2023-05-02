import { Config } from '../../../src/config';
import { Input } from '../../../src/input';
import { Labeler } from '../../../src/labeler';

export interface ILabelerTestContext {
  labelers: Labeler[];
}

export const labelerContextFixture: ILabelerTestContext = {
  labelers: [
    new Labeler(
      new Config({
        policy: [
          {
            section: [
              { id: ['dropdown'], label: [{ name: 'label', keys: ['label'] }] },
            ],
          },
        ],
      }),
      new Input({ issueForm: {}, section: 'section' })
    ),
    // TODO: Add more test objects ...
  ],
};
