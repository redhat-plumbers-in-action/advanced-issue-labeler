import { getInput, debug } from '@actions/core';
const app = (probot) => {
    probot.on('issues.opened', async (context) => {
        const issueForm = JSON.parse(getInput('issue-form'));
        const section = getInput('section');
        if (!issueForm.hasOwnProperty(section)) {
            debug(`Issue form doesn't contain section: ${section}`);
            return;
        }
        const labels = issueForm[section].split(', ', 10);
        if (labels.length === 0) {
            debug(`Section field is empty.`);
            return;
        }
        const response = await context.octokit.rest.issues.addLabels(context.issue({ labels: issueForm[section].split(', ', 10) }));
        debug(`GitHub API response: ${response}`);
    });
};
export default app;
//# sourceMappingURL=app.js.map