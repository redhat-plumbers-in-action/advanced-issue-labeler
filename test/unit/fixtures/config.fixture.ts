import { ConfigType } from '../../../src/schema/config';

export interface IConfigTestContext {
  basicConfig: ConfigType;
  configWithTemplate: ConfigType;
  configWithMultiplePolicies: ConfigType;
}

export const configContextFixture: IConfigTestContext = {
  basicConfig: {
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
  } as ConfigType,
  configWithTemplate: {
    policy: [
      {
        template: ['issue-template.yml'],
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
  } as ConfigType,
  configWithMultiplePolicies: {
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
        template: ['template1.yml', 'template2.yml'],
        section: [
          {
            id: ['id'],
            'block-list': ['other'],
            label: [{ name: 'label', keys: ['label'] }],
          },
        ],
      },
    ],
  },
};
