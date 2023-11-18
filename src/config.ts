import { debug, getInput } from '@actions/core';
import { context } from '@actions/github';

import { CustomOctokit } from './octokit';

import { ConfigPolicy, configSchema } from './schema/config';

export class Config {
  path: string;
  policy: ConfigPolicy[] | undefined | null;

  constructor(config: unknown, path: string) {
    this.path = path;

    const parsedConfig = configSchema.parse(config);
    this.policy = parsedConfig?.policy;
  }

  getTemplatePolicy(template: string | undefined) {
    if (this.isPolicyEmpty()) {
      throw new Error(
        `Missing configuration. Please setup 'Advanced Issue Labeler' Action using '${this.path}' file.`
      );
    }
    // ?: When template name is provided look for section that match the template name
    const templatePolicy = this.policy?.find(
      pItem => pItem.template?.find(tItem => tItem === template)
    );

    // If exact policy for template exists ; return it
    if (templatePolicy) return templatePolicy;

    // ?: When template name is undefined look for section that undefined template field
    debug(`Looking for default policy ...`);
    return this.policy?.find(
      pItem =>
        !pItem?.template ||
        (Array.isArray(pItem?.template) && pItem?.template.length === 0)
    );
  }

  static async getConfig(octokit: CustomOctokit): Promise<Config> {
    const path = getInput('config-path', { required: true });

    const retrievedConfig = (
      await octokit.config.get({
        ...context.repo,
        path,
      })
    ).config;

    debug(`Configuration '${path}': ${JSON.stringify(retrievedConfig)}`);

    return new this(retrievedConfig, path);
  }

  isPolicyEmpty() {
    return this.policy === null || this.policy === undefined;
  }
}
