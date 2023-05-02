import { debug } from '@actions/core';
import { Context } from 'probot';

import { events } from './events';

import { ConfigPolicy, configSchema } from './schema/config';

export class Config {
  policy: ConfigPolicy[];

  constructor(config: unknown) {
    this.policy = configSchema.parse(config).policy;
  }

  getTemplatePolicy(template: string | undefined) {
    // ?: When template name is provided look for section that match the template name
    const templatePolicy = this.policy.find(pItem =>
      pItem.template?.find(tItem => tItem === template)
    );

    // If exact policy for template exists ; return it
    if (templatePolicy) return templatePolicy;

    // ?: When template name is undefined look for section that undefined template field
    debug(`Looking for default policy ...`);
    return this.policy.find(
      pItem =>
        !pItem?.template ||
        (Array.isArray(pItem?.template) && pItem?.template.length === 0)
    );
  }

  static async getConfig(
    context: {
      [K in keyof typeof events]: Context<(typeof events)[K][number]>;
    }[keyof typeof events]
  ) {
    const retrievedConfig = await context.config('advanced-issue-labeler.yml');

    if (Config.isConfigEmpty(retrievedConfig)) {
      return null;
    }

    return new Config(retrievedConfig);
  }

  static isConfigEmpty(config: unknown) {
    return config === null || config === undefined;
  }
}
