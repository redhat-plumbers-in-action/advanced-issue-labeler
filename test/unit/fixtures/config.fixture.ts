import { Config } from '../../../src/config';

export interface IConfigTestContext {
  configs: Config[];
}

export const configContextFixture: IConfigTestContext = {
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
};
