import { Context, Probot } from 'probot';
import { getInput, debug } from '@actions/core';

const app = (probot: Probot) => {
  probot.on('issues.opened', async (context: Context<'issues.opened'>) => {
    const issueForm: { [key: string]: string } = JSON.parse(
      getInput('issue-form')
    );
    const section = getInput('section');
    const blockList = getInput('block-list').split('\n', 25);

    if (!issueForm.hasOwnProperty(section)) {
      debug(`Issue form doesn't contain section: ${section}`);
      return;
    }

    const keywords: string[] = issueForm[section]
      .split(', ', 10)
      .filter(label => !isCompliant(blockList, label));

    if (keywords.length === 0) {
      debug(`Section field is empty.`);
      return;
    }

    if (!keywords[0]) {
      debug(`Section field is empty.`);
      return;
    }

    let labels: string[] = [];
    const config: { policy: { [key: string]: string[] } } | null =
      await context.config('advanced-issue-labeler.yml');

    if (!config) {
      labels = keywords;
    } else {
      for (const rule in config?.policy) {
        let keywordFound = false;

        for (const keyword of keywords) {
          if (isCompliant(config.policy[rule], keyword)) {
            keywordFound = true;
          }
        }

        if (keywordFound) labels.push(rule);
      }
    }

    debug(`Labels to be set: ${labels}`);

    const response = await context.octokit.rest.issues.addLabels(
      context.issue({ labels })
    );

    debug(`GitHub API response: ${response}`);
  });
};

function isCompliant(policy: string[], keyword: string) {
  return !!policy.find(rule => keyword === rule);
}

export default app;
