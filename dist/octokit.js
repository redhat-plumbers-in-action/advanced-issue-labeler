import { Octokit } from '@octokit/core';
import { config } from '@probot/octokit-plugin-config';
const CustomOctokit = Octokit.plugin(config);
export function getOctokit(token) {
    var _a;
    return new CustomOctokit({
        auth: token,
        baseUrl: (_a = process.env.GITHUB_API_URL) !== null && _a !== void 0 ? _a : 'https://api.github.com',
    });
}
//# sourceMappingURL=octokit.js.map