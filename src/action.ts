import { Context, Probot } from 'probot';
import { getInput, debug, info } from '@actions/core';

import { events } from './events';
import { Config } from './config';
import { Labeler } from './labeler';
import { InputType } from './schema/input';
import { Input } from './input';

const action = (probot: Probot) => {
  probot.on(
    events.issue,
    async (context: Context<(typeof events.issue)[number]>) => {
      const inputs: Partial<InputType> = {};
      inputs.issueForm = getInput('issue-form', {
        required: true,
      }) as unknown as InputType['issueForm'];

      const config = await Config.getConfig(context);

      // If no config was provided try inputs
      if (Config.isConfigEmpty(config)) {
        inputs.section = getInput('section', { required: true });
        inputs.blockList = getInput('block-list').split('\n', 25);
      }

      // Config requires template as well
      inputs.template = getInput('template');

      const labeler = new Labeler(config, new Input(inputs));

      const labels = labeler.gatherLabels();

      // Check if there are some labels to be set
      if (!labels || (Array.isArray(labels) && labels?.length < 1)) {
        info('Nothing to do here. CY@');
        return;
      }

      info(`Labels to be set: ${labels}`);

      const response = await context.octokit.rest.issues.addLabels(
        context.issue({ labels })
      );

      debug(`GitHub API response status: [${response.status}]`);
    }
  );
};

export default action;
