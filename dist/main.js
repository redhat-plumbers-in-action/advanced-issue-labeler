import { setFailed } from '@actions/core';
import run from '@probot/adapter-github-actions';
import app from './app';
try {
    await run.run(app);
}
catch (error) {
    if (error instanceof Error)
        setFailed(error.message);
}
//# sourceMappingURL=main.js.map