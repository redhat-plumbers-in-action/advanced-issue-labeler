import { Octokit } from '@octokit/core';
import { config } from '@probot/octokit-plugin-config';
const CustomOctokit = Octokit.plugin(config);
export function getOctokit(token) {
    return new CustomOctokit({
        auth: token,
    });
}
//# sourceMappingURL=octokit.js.map