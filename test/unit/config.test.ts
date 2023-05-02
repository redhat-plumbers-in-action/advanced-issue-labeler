import { describe, it, expect, beforeEach, test } from 'vitest';

import { Config } from '../../src/config';
import {
  configContextFixture,
  IConfigTestContext,
} from './fixtures/config.fixture';

describe('Config Object', () => {
  beforeEach<IConfigTestContext>(context => {
    context.configs = configContextFixture.configs;
  });

  it<IConfigTestContext>('can be instantiated', context =>
    context.configs.map(configItem => expect(configItem).toBeDefined()));

  test<IConfigTestContext>('get policy()', context =>
    context.configs.map(configItem =>
      expect(configItem.policy).toMatchSnapshot()
    ));

  it<IConfigTestContext>('can get template policy', context =>
    context.configs.map(async configItem =>
      expect(
        configItem.getTemplatePolicy('issue-template.yml')
      ).toMatchSnapshot()
    ));

  test<IConfigTestContext>('isConfigEmpty()', context => {
    context.configs.map(async configItem =>
      expect(Config.isConfigEmpty(configItem)).toEqual(false)
    );

    expect(Config.isConfigEmpty(undefined)).toEqual(true);
    expect(Config.isConfigEmpty(null)).toEqual(true);
  });
});
