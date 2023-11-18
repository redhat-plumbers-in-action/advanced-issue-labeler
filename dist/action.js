import { getInput, debug, info } from '@actions/core';
import { context } from '@actions/github';
import { Config } from './config';
import { IssueForm } from './issue-form';
import { Labeler } from './labeler';
import { issueFormSchema } from './schema/input';
async function action(octokit) {
    const parsedIssueForm = issueFormSchema.safeParse(JSON.parse(getInput('issue-form', { required: true })));
    if (!parsedIssueForm.success) {
        throw new Error(`Incorrect format of provided 'issue-form' input: ${parsedIssueForm.error.message}`);
    }
    const issueForm = new IssueForm(parsedIssueForm.data);
    const config = await Config.getConfig(octokit);
    const labeler = new Labeler(issueForm, config);
    const labels = labeler.gatherLabels();
    // Check if there are some labels to be set
    if (!labels || (Array.isArray(labels) && (labels === null || labels === void 0 ? void 0 : labels.length) < 1)) {
        info('Nothing to do here. CY@');
        return;
    }
    info(`Labels to be set: ${labels}`);
    const response = await octokit.request('POST /repos/{owner}/{repo}/issues/{issue_number}/labels', Object.assign(Object.assign({}, context.repo), { issue_number: context.issue.number, labels }));
    debug(`GitHub API response status: [${response.status}]`);
}
export default action;
//# sourceMappingURL=action.js.map