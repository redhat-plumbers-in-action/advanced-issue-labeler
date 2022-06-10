import { Context, Probot } from 'probot';
import { getInput, debug } from '@actions/core';

const app = (probot: Probot) => {
  probot.on('issues.opened', async (context: Context<'issues.opened'>) => {
    const issueForm: { [key: string]: string } = JSON.parse(
      getInput('issue-form')
    );
    const section = getInput('section');

    if (!issueForm.hasOwnProperty(section)) {
      debug(`Issue form doesn't contain section: ${section}`);
      return;
    }

    const labels: string[] = issueForm[section].split(', ', 10);

    if (labels.length === 0) {
      debug(`Section field is empty.`);
      return;
    }

    if (!labels[0]) {
      debug(`Section field is empty.`);
      return;
    }

    const response = await context.octokit.rest.issues.addLabels(
      context.issue({ labels })
    );

    debug(`GitHub API response: ${response}`);
  });
};

export default app;
