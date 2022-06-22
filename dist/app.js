import { getInput, debug } from '@actions/core';
const app = (probot) => {
    probot.on('issues.opened', async (context) => {
        const issueForm = JSON.parse(getInput('issue-form'));
        const section = getInput('section');
        const blockList = getInput('block-list').split('\n', 25);
        if (!issueForm.hasOwnProperty(section)) {
            debug(`Issue form doesn't contain section: ${section}`);
            return;
        }
        const keywords = issueForm[section]
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
        let labels = [];
        const config = await context.config('advanced-issue-labeler.yml');
        if (!config) {
            labels = keywords;
        }
        else {
            for (const rule in config === null || config === void 0 ? void 0 : config.policy) {
                let keywordFound = false;
                for (const keyword of keywords) {
                    if (isCompliant(config.policy[rule], keyword)) {
                        keywordFound = true;
                    }
                }
                if (keywordFound)
                    labels.push(rule);
            }
        }
        debug(`Labels to be set: ${labels}`);
        const response = await context.octokit.rest.issues.addLabels(context.issue({ labels }));
        debug(`GitHub API response: ${response}`);
    });
};
function isCompliant(policy, keyword) {
    return !!policy.find(rule => keyword === rule);
}
export default app;
//# sourceMappingURL=app.js.map