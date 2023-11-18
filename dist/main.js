import { getInput, setFailed } from '@actions/core';
import '@total-typescript/ts-reset';
import action from './action';
import { getOctokit } from './octokit';
const octokit = getOctokit(getInput('token', { required: true }));
try {
    await action(octokit);
}
catch (error) {
    let message;
    if (error instanceof Error) {
        message = error.message;
    }
    else {
        message = JSON.stringify(error);
    }
    setFailed(message);
}
//# sourceMappingURL=main.js.map