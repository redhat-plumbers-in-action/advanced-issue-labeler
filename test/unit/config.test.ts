import { describe, expect, test } from 'vitest';

import { Config } from '../../src/config';

const emptyConfig = {};

const basicConfig = {
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

const templateConfig = {
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

describe('Test Config class', () => {
  test('Config class is defined', () => {
    const config = new Config(basicConfig, '.github/issue-labeler.yml');

    expect(config.policy).toMatchInlineSnapshot(`
      [
        {
          "section": [
            {
              "block-list": [],
              "id": [
                "type",
              ],
              "label": [
                {
                  "keys": [
                    "Bug Report",
                  ],
                  "name": "bug 🐛",
                },
                {
                  "keys": [
                    "Feature Request",
                  ],
                  "name": "RFE 🎁",
                },
              ],
            },
          ],
          "template": [],
        },
      ]
    `);
    expect(config.path).toMatchInlineSnapshot(`".github/issue-labeler.yml"`);
  });

  describe('getTemplatePolicy()', () => {
    test('default policy', () => {
      const config = new Config(basicConfig, '.github/issue-labeler.yml');
      expect(config.getTemplatePolicy(undefined)).toMatchInlineSnapshot(`
        {
          "section": [
            {
              "block-list": [],
              "id": [
                "type",
              ],
              "label": [
                {
                  "keys": [
                    "Bug Report",
                  ],
                  "name": "bug 🐛",
                },
                {
                  "keys": [
                    "Feature Request",
                  ],
                  "name": "RFE 🎁",
                },
              ],
            },
          ],
          "template": [],
        }
      `);
      expect(config.getTemplatePolicy('')).toMatchInlineSnapshot(`
      {
        "section": [
          {
            "block-list": [],
            "id": [
              "type",
            ],
            "label": [
              {
                "keys": [
                  "Bug Report",
                ],
                "name": "bug 🐛",
              },
              {
                "keys": [
                  "Feature Request",
                ],
                "name": "RFE 🎁",
              },
            ],
          },
        ],
        "template": [],
      }
    `);
      //? NOTE: Return default policy when requested template is not found
      expect(config.getTemplatePolicy('bug.yml')).toMatchInlineSnapshot(`
      {
        "section": [
          {
            "block-list": [],
            "id": [
              "type",
            ],
            "label": [
              {
                "keys": [
                  "Bug Report",
                ],
                "name": "bug 🐛",
              },
              {
                "keys": [
                  "Feature Request",
                ],
                "name": "RFE 🎁",
              },
            ],
          },
        ],
        "template": [],
      }
    `);
    });

    test('get policy for template', () => {
      const config = new Config(templateConfig, '.github/issue-labeler.yml');

      expect(config.getTemplatePolicy('bug.yml')).toEqual(
        config.getTemplatePolicy('feature.yml')
      );
      expect(config.getTemplatePolicy('bug.yml')).toMatchInlineSnapshot(`
        {
          "section": [
            {
              "block-list": [],
              "id": [
                "type",
              ],
              "label": [
                {
                  "keys": [
                    "Bug Report",
                  ],
                  "name": "bug 🐛",
                },
                {
                  "keys": [
                    "Feature Request",
                  ],
                  "name": "RFE 🎁",
                },
              ],
            },
          ],
          "template": [
            "bug.yml",
            "feature.yml",
          ],
        }
      `);

      expect(config.getTemplatePolicy('custom.yml')).toMatchInlineSnapshot(`
        {
          "section": [
            {
              "block-list": [],
              "id": [
                "type",
              ],
              "label": [
                {
                  "keys": [
                    "Custom 1",
                  ],
                  "name": "custom1",
                },
                {
                  "keys": [
                    "Custom 2",
                  ],
                  "name": "custom2",
                },
              ],
            },
          ],
          "template": [
            "custom.yml",
          ],
        }
      `);
    });

    test('error when policy is empty', () => {
      const config = new Config(emptyConfig, '.github/issue-labeler.yml');

      expect(() => config.getTemplatePolicy(undefined)).toThrowError(
        `Missing configuration. Please setup 'Advanced Issue Labeler' Action using '.github/issue-labeler.yml' file.`
      );
    });
  });

  test('isPolicyEmpty()', () => {
    let config = new Config(emptyConfig, '.github/issue-labeler.yml');
    expect(config.isPolicyEmpty()).toBe(true);

    config = new Config(basicConfig, '.github/issue-labeler.yml');
    expect(config.isPolicyEmpty()).toBe(false);
  });
});
