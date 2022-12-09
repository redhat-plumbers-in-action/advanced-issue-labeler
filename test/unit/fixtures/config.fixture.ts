import { Config, Label, PolicyItem, SectionItem } from '../../../src/config';

export interface IConfigTestContext {
  configs: Config[];
  invalid: Config[];
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

export interface IPolicyItemTestContext {
  policyItems: PolicyItem[];
  invalid: PolicyItem[];
}

export const policyItemFixture: IPolicyItemTestContext = {
  policyItems: [
    new PolicyItem({
      section: [
        {
          id: ['type'],
          label: [
            { name: 'bug 🐛', keys: ['Bug Report'] },
            { name: 'RFE 🎁', keys: ['Feature Request'] },
          ],
        },
      ],
    }),
    new PolicyItem({
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
    }),
    new PolicyItem({
      template: ['template1.yml', 'template1.yml'],
      section: [
        {
          id: ['id'],
          'block-list': ['other'],
          label: [{ name: 'label', keys: ['label'] }],
        },
      ],
    }),
    new PolicyItem({
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
    }),
  ],

  invalid: [
    // @ts-expect-error: Let's ignore a type error, it's required for testing
    new PolicyItem(),
    // @ts-expect-error: Let's ignore a type error, it's required for testing
    new PolicyItem({}),
    new PolicyItem({ section: [] }),
    // @ts-expect-error: Let's ignore a type error, it's required for testing
    new PolicyItem({ section: [{ id: [] }] }),
    // @ts-expect-error: Let's ignore a type error, it's required for testing
    new PolicyItem({ template: ['issue-template.yml'] }),
    new PolicyItem({
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
    }),
  ],
};

export interface ISectionItemTestContext {
  sectionItems: SectionItem[];
  invalid: SectionItem[];
}

export const sectionItemFixture: ISectionItemTestContext = {
  sectionItems: [
    new SectionItem({
      id: ['type'],
      label: [
        { name: 'bug 🐛', keys: ['Bug Report'] },
        { name: 'RFE 🎁', keys: ['Feature Request'] },
      ],
    }),
    new SectionItem({
      id: ['type'],
      'block-list': ['Other'],
      label: [
        { name: 'bug 🐛', keys: ['Bug Report'] },
        { name: 'RFE 🎁', keys: ['Feature Request'] },
      ],
    }),
    new SectionItem({
      id: ['id'],
      'block-list': ['other'],
      label: [{ name: 'label', keys: ['label'] }],
    }),
  ],

  invalid: [
    // @ts-expect-error: Let's ignore a type error, it's required for testing
    new SectionItem(),
    // @ts-expect-error: Let's ignore a type error, it's required for testing
    new SectionItem({}),
    // @ts-expect-error: Let's ignore a type error, it's required for testing
    new SectionItem({ id: [] }),
    new SectionItem({
      id: ['type'],
      'block-list': ['Other'],
      label: [
        { name: 'bug 🐛', keys: ['Bug Report'] },
        // @ts-expect-error: Let's ignore a type error, it's required for testing
        { name: 'RFE 🎁' },
      ],
    }),
  ],
};

export interface ILabelTestContext {
  labels: Label[];
  invalid: Label[];
}

export const labelFixture: ILabelTestContext = {
  labels: [new Label({ name: 'bug 🐛', keys: ['Bug Report'] })],

  invalid: [
    // @ts-expect-error: Let's ignore a type error, it's required for testing
    new Label(),
    // @ts-expect-error: Let's ignore a type error, it's required for testing
    new Label({}),
    // @ts-expect-error: Let's ignore a type error, it's required for testing
    new Label({ name: '' }),
    // @ts-expect-error: Let's ignore a type error, it's required for testing
    new Label({ keys: [''] }),
  ],
};
