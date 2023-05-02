import { setFailed } from '@actions/core';
import run from '@probot/adapter-github-actions';

import action from './action';

import '@total-typescript/ts-reset';

try {
  await run.run(action);
} catch (error) {
  error instanceof Error
    ? setFailed(error.message)
    : setFailed(error as string);
}
