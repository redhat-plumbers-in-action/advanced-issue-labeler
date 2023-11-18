import { describe, it, expect, beforeEach, test } from 'vitest';

import { Config } from '../../src/config';
import {
  configContextFixture,
  IConfigTestContext,
} from './fixtures/config.fixture';

describe('Config Object', () => {
  beforeEach<IConfigTestContext>(context => {
    context.basicConfig = configContextFixture.basicConfig;
    context.configWithTemplate = configContextFixture.configWithTemplate;
    context.configWithMultiplePolicies =
      configContextFixture.configWithMultiplePolicies;
  });

  it<IConfigTestContext>('can be instantiated', context => {
    let configInstance = new Config(null, '');
    expect(configInstance.policy).toMatchInlineSnapshot('undefined');

    configInstance = new Config(context.basicConfig, '');
    expect(configInstance.policy).toMatchInlineSnapshot(`
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

    configInstance = new Config(context.configWithTemplate, '');
    expect(configInstance.policy).toMatchInlineSnapshot(`
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
          "template": [
            "issue-template.yml",
          ],
        },
      ]
    `);

    configInstance = new Config(context.configWithMultiplePolicies, '');
    expect(configInstance.policy).toMatchInlineSnapshot(`
      [
        {
          "section": [
            {
              "block-list": [
                "Other",
              ],
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
            "issue-template.yml",
          ],
        },
        {
          "section": [
            {
              "block-list": [
                "other",
              ],
              "id": [
                "id",
              ],
              "label": [
                {
                  "keys": [
                    "label",
                  ],
                  "name": "label",
                },
              ],
            },
          ],
          "template": [
            "template1.yml",
            "template2.yml",
          ],
        },
      ]
    `);

    expect(configInstance).toBeInstanceOf(Config);
  });

  it<IConfigTestContext>('can get template policy', context => {
    let configInstance = new Config(context.configWithTemplate, '');
    expect(configInstance.getTemplatePolicy('issue-template.yml'))
      .toMatchInlineSnapshot(`
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
            "issue-template.yml",
          ],
        }
      `);

    configInstance = new Config(context.configWithMultiplePolicies, '');
    expect(configInstance.getTemplatePolicy('issue-template.yml'))
      .toMatchInlineSnapshot(`
      {
        "section": [
          {
            "block-list": [
              "Other",
            ],
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
          "issue-template.yml",
        ],
      }
    `);
    expect(configInstance.getTemplatePolicy('template2.yml'))
      .toMatchInlineSnapshot(`
      {
        "section": [
          {
            "block-list": [
              "other",
            ],
            "id": [
              "id",
            ],
            "label": [
              {
                "keys": [
                  "label",
                ],
                "name": "label",
              },
            ],
          },
        ],
        "template": [
          "template1.yml",
          "template2.yml",
        ],
      }
    `);
  });

  test<IConfigTestContext>('is policy empty', context => {
    let configInstance = new Config(null, '');
    expect(configInstance.isPolicyEmpty()).toEqual(true);

    configInstance = new Config(context.basicConfig, '');
    expect(configInstance.isPolicyEmpty()).toEqual(false);
  });
});
