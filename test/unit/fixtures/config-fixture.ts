import { Config } from '../../../src/config';
import { TConfigObject } from '../../../src/types';

export interface ConfigTestContext {
  configs: Config[];
  invalid: Config[];
}

export const configContextFixture: ConfigTestContext = {
  configs: [
    new Config({
      policy: [
        {
          section: [
            {
              id: ['type'],
              label: [
                { name: 'bug 🐛', keys: ['Bug Report'] },
                { name: 'RFE 🎁', keys: ['Feature Request'] },
              ],
            },
          ],
        },
      ],
    }),
    new Config({
      policy: [
        {
          template: ['issue-template.yml'],
          section: [
            {
              id: ['type'],
              'block-list': ['Other'],
              label: [
                { name: 'bug 🐛', keys: ['Bug Report'] },
                { name: 'RFE 🎁', keys: ['Feature Request'] },
              ],
            },
          ],
        },
      ],
    }),
    new Config({
      policy: [
        {
          template: ['issue-template.yml'],
          section: [
            {
              id: ['type'],
              'block-list': ['Other'],
              label: [
                { name: 'bug 🐛', keys: ['Bug Report'] },
                { name: 'RFE 🎁', keys: ['Feature Request'] },
              ],
            },
          ],
        },
        {
          template: ['template1.yml', 'template1.yml'],
          section: [
            {
              id: ['id'],
              'block-list': ['other'],
              label: [{ name: 'label', keys: ['label'] }],
            },
          ],
        },
      ],
    }),
    new Config({
      policy: [
        {
          template: ['issue-template.yml', 'template.yml'],
          section: [
            {
              id: ['type'],
              'block-list': ['Other'],
              label: [
                { name: 'bug 🐛', keys: ['Bug Report'] },
                { name: 'RFE 🎁', keys: ['Feature Request'] },
              ],
            },
          ],
        },
        {
          template: ['template1.yml', 'template1.yml'],
          section: [
            {
              id: ['id'],
              'block-list': ['other'],
              label: [{ name: 'label', keys: ['label'] }],
            },
          ],
        },
      ],
    }),
  ],

  invalid: [
    // @ts-expect-error: Let's ignore a type error, it's required for testing
    new Config(),
    // @ts-expect-error: Let's ignore a type error, it's required for testing
    new Config({}),
    new Config({ policy: [] }),
    new Config({
      policy: [
        {
          section: [
            // @ts-expect-error: Let's ignore a type error, it's required for testing
            {
              id: [],
            },
          ],
        },
      ],
    }),
    new Config({
      // @ts-expect-error: Let's ignore a type error, it's required for testing
      policy: [{ template: ['issue-template.yml'] }],
    }),
    new Config({
      policy: [
        {
          template: ['issue-template.yml'],
          section: [
            {
              id: ['type'],
              'block-list': ['Other'],
              label: [
                { name: 'bug 🐛', keys: ['Bug Report'] },
                // @ts-expect-error: Let's ignore a type error, it's required for testing
                { name: 'RFE 🎁' },
              ],
            },
          ],
        },
      ],
    }),
  ],
};
