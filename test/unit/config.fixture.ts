export const emptyConfig = {};

export const basicConfig = {
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
};

export const templateConfig = {
  policy: [
    {
      template: ['bug.yml', 'feature.yml'],
      section: [
        {
          id: ['type'],
          label: [
            { name: 'bug 🐛', keys: ['Bug Report'] },
            { name: 'RFE 🎁', keys: ['Feature Request'] },
          ],
        },
        {
          id: ['severity'],
          label: [
            { name: 'high', keys: ['High'] },
            { name: 'medium', keys: ['Medium'] },
            { name: 'low', keys: ['Low'] },
          ],
        },
      ],
    },
    {
      template: ['custom.yml'],
      section: [
        {
          id: ['type'],
          label: [
            { name: 'custom1', keys: ['Custom 1'] },
            { name: 'custom2', keys: ['Custom 2'] },
          ],
        },
      ],
    },
  ],
};
