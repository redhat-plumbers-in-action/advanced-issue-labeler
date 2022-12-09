import { validate } from 'class-validator';
import { describe, it, expect, beforeEach, test } from 'vitest';

import { Config } from '../../src/config';
import {
  configContextFixture,
  IConfigTestContext,
  ILabelTestContext,
  IPolicyItemTestContext,
  ISectionItemTestContext,
  labelFixture,
  policyItemFixture,
  sectionItemFixture,
} from './fixtures/config.fixture';

describe('Config Object', () => {
  beforeEach<IConfigTestContext>(context => {
    context.configs = configContextFixture.configs;
    context.invalid = configContextFixture.invalid;
  });

  it<IConfigTestContext>('can be instantiated', context =>
    context.configs.map(configItem => expect(configItem).toBeDefined()));

  test<IConfigTestContext>('get policy()', context =>
    context.configs.map(configItem =>
      expect(configItem.policy).toMatchSnapshot()
    ));

  it<IConfigTestContext>('is valid', async context =>
    context.configs.map(async configItem =>
      expect(Config.validate(configItem)).resolves.toMatchObject([])
    ));

  it<IConfigTestContext>('is invalid', async context =>
    context.invalid.map(async invalidItem =>
      expect(Config.validate(invalidItem)).resolves.toMatchSnapshot()
    ));

  it<IConfigTestContext>('can get template policy', context =>
    context.configs.map(async configItem =>
      expect(
        configItem.getTemplatePolicy('issue-template.yml')
      ).toMatchSnapshot()
    ));

  test<IConfigTestContext>('is config empty', context => {
    context.configs.map(async configItem =>
      expect(Config.isConfigEmpty(configItem)).toEqual(false)
    );

    context.invalid.map(async invalidItem =>
      expect(Config.isConfigEmpty(invalidItem)).toEqual(false)
    );

    expect(Config.isConfigEmpty(null)).toEqual(true);
  });
});

describe('PolicyItem Object', () => {
  beforeEach<IPolicyItemTestContext>(context => {
    context.policyItems = policyItemFixture.policyItems;
    context.invalid = policyItemFixture.invalid;
  });

  it<IPolicyItemTestContext>('can be instantiated', context =>
    context.policyItems.map(policyItem => expect(policyItem).toBeDefined()));

  test<IPolicyItemTestContext>('get template()', context =>
    context.policyItems.map(policyItem =>
      expect(policyItem.template).toMatchSnapshot()
    ));

  test<IPolicyItemTestContext>('get section()', context =>
    context.policyItems.map(policyItem =>
      expect(policyItem.section).toMatchSnapshot()
    ));

  it<IPolicyItemTestContext>('is valid', async context =>
    context.policyItems.map(async policyItem =>
      expect(validate(policyItem)).resolves.toMatchObject([])
    ));

  it<IPolicyItemTestContext>('is invalid', async context =>
    context.invalid.map(async invalidItem =>
      expect(validate(invalidItem)).resolves.toMatchSnapshot()
    ));
});

describe('SectionItem Object', () => {
  beforeEach<ISectionItemTestContext>(context => {
    context.sectionItems = sectionItemFixture.sectionItems;
    context.invalid = sectionItemFixture.invalid;
  });

  it<ISectionItemTestContext>('can be instantiated', context =>
    context.sectionItems.map(sectionItem => expect(sectionItem).toBeDefined()));

  test<ISectionItemTestContext>('get id()', context =>
    context.sectionItems.map(sectionItem =>
      expect(sectionItem.id).toMatchSnapshot()
    ));

  test<ISectionItemTestContext>('get blockList()', context =>
    context.sectionItems.map(sectionItem =>
      expect(sectionItem.blockList).toMatchSnapshot()
    ));

  test<ISectionItemTestContext>('get label()', context =>
    context.sectionItems.map(sectionItem =>
      expect(sectionItem.label).toMatchSnapshot()
    ));

  it<ISectionItemTestContext>('is valid', async context =>
    context.sectionItems.map(async sectionItem =>
      expect(validate(sectionItem)).resolves.toMatchObject([])
    ));

  it<ISectionItemTestContext>('is invalid', async context =>
    context.invalid.map(async invalidItem =>
      expect(validate(invalidItem)).resolves.toMatchSnapshot()
    ));
});

describe('Label Object', () => {
  beforeEach<ILabelTestContext>(context => {
    context.labels = labelFixture.labels;
    context.invalid = labelFixture.invalid;
  });

  it<ILabelTestContext>('can be instantiated', context =>
    context.labels.map(labelItem => expect(labelItem).toBeDefined()));

  test<ILabelTestContext>('get name()', context =>
    context.labels.map(labelItem => expect(labelItem.name).toMatchSnapshot()));

  test<ILabelTestContext>('get keys()', context =>
    context.labels.map(labelItem => expect(labelItem.keys).toMatchSnapshot()));

  it<ILabelTestContext>('is valid', async context =>
    context.labels.map(async labelItem =>
      expect(validate(labelItem)).resolves.toMatchObject([])
    ));

  it<ILabelTestContext>('is invalid', async context =>
    context.invalid.map(async invalidItem =>
      expect(validate(invalidItem)).resolves.toMatchSnapshot()
    ));
});
