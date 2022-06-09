import { Context, Probot } from 'probot';
import { getInput, debug } from '@actions/core';

const app = (probot: Probot) => {
  probot.on('issues.opened', async (context: Context<'issues.opened'>) => {
    const issueForm = JSON.parse(getInput('issue-form'));
    const section = getInput('section');
    debug(`Issue form: ${issueForm}`);

    const response = await context.octokit.rest.issues.addLabels(
      context.issue({ labels: issueForm[section].split(', ', 10) })
    );

    debug(`GitHub API response: ${response}`);
  });
};

export default app;
