import { Context, Probot } from 'probot';
import { getInput, debug } from '@actions/core';

import { events } from './events';
import { Config } from './config';
import { IssueForm } from './issue-form';
import { Labeler } from './labeler';

const app = (probot: Probot) => {
  probot.on(
    events.issue,
    async (context: Context<typeof events.issue[number]>) => {
      const issueFormInput = getInput('issue-form');

      if (!issueFormInput) {
        context.log.error(`Parameter issue-form is required!`);
        return;
      }

      const labeler = new Labeler(new IssueForm(JSON.parse(issueFormInput)));
      labeler.config = await Config.getConfig(context);

      // If no config was provided try inputs
      if (!labeler.isConfig) {
        labeler.inputs = {
          section: getInput('section'),
          blockList: getInput('block-list').split('\n', 25),
        };
      }

      // Config requires template as well
      labeler.inputs = {
        template: getInput('template'),
      };

      const validationResult = await Labeler.validate(labeler);

      if (validationResult.length > 0) {
        for (const [index, message] of validationResult.entries()) {
          // TODO: Probably needs some care:
          probot.log.info(
            `{ property: ${message.property}, value: ${message.value}, notes: ${message.notes}`
          );
          probot.log.warning(`[${index}] ~ Config validation: '${message}'`);
        }
        return;
      }

      const labels = labeler.gatherLabels();

      // Check if there are some labels to be set
      if (!labels || (Array.isArray(labels) && labels?.length < 1)) {
        debug('Nothing to do here. CY@');
        return;
      }

      debug(`Labels to be set: ${labels}`);

      const response = await context.octokit.rest.issues.addLabels(
        context.issue({ labels })
      );

      debug(`GitHub API response: ${response}`);
    }
  );
};

export default app;
