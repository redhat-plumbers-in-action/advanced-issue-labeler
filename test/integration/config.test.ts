import { getInput } from '@actions/core';
import { vi, describe, beforeAll, beforeEach, afterAll, test } from 'vitest';
import { context } from '@actions/github';

// import * as fsHelper from '../lib/fs-helper';
// import * as inputHelper from '../lib/input-helper';
// import { IGitSourceSettings } from '../lib/git-source-settings';

// const originalGitHubWorkspace = process.env['GITHUB_WORKSPACE'];
// const gitHubWorkspace = resolve('/checkout-tests/workspace');

// Inputs for mock @actions/core
let inputs = {} as any;

// Shallow clone original @actions/github context
let originalContext = {};

describe('input-helper tests', () => {
  beforeAll(() => {
    // Mock getInput
    vi.fn(getInput).mockImplementation((name: string) => inputs[name]);

    // Mock error/warning/info/debug
    // vi.fn(error).mockImplementation(() => {});
    // vi.fn(warning).mockImplementation(() => {});
    // vi.fn(info).mockImplementation(() => {});
    // vi.fn(debug).mockImplementation(() => {});

    // Mock github context
    vi.spyOn(context, 'repo', 'get').mockImplementation(() => {
      return {
        owner: 'some-owner',
        repo: 'some-repo',
      };
    });
  });

  beforeEach(() => {
    // Reset inputs
    inputs = {};
  });

  afterAll(() => {
    // Restore
    vi.restoreAllMocks();
  });

  test.todo('default configurations');

  // test('issue-form input is set', async () => {
  //   process.env.GITHUB_TOKEN = 'token123';
  //   process.env.GITHUB_RUN_ID = '1';
  //   process.env.GITHUB_EVENT_NAME = 'opened';
  //   process.env.GITHUB_EVENT_PATH = require.resolve(
  //     '../fixtures/new-issue.json'
  //   );

  //   const output = [];
  //   const storeOutput = (data: never) => !!output.push(data);
  //   const origWrite = process.stdout.write;
  //   process.stdout.write = vi.fn(storeOutput);
  //   await run.run(app);
  //   process.stdout.write = origWrite;
  //   expect(output).toMatchInlineSnapshot('[]');
  //   // expect(output).toMatchInlineSnapshot([
  //   //     '::error::[probot/adapter-github-actions] a token must be passed as `env.GITHUB_TOKEN` or `with.GITHUB_TOKEN` or `with.token`, see https://github.com/probot/adapter-github-actions#usage\n',
  //   //   ]);
  // });

  //   it('sets defaults', () => {
  //     const settings: IGitSourceSettings = inputHelper.getInputs();
  //     expect(settings).toBeTruthy();
  //     expect(settings.authToken).toBeFalsy();
  //     expect(settings.clean).toBe(true);
  //     expect(settings.commit).toBeTruthy();
  //     expect(settings.commit).toBe('1234567890123456789012345678901234567890');
  //     expect(settings.fetchDepth).toBe(1);
  //     expect(settings.lfs).toBe(false);
  //     expect(settings.ref).toBe('refs/heads/some-ref');
  //     expect(settings.repositoryName).toBe('some-repo');
  //     expect(settings.repositoryOwner).toBe('some-owner');
  //     expect(settings.repositoryPath).toBe(gitHubWorkspace);
  //   });

  //   it('qualifies ref', () => {
  //     let originalRef = context.ref;
  //     try {
  //       context.ref = 'some-unqualified-ref';
  //       const settings: IGitSourceSettings = inputHelper.getInputs();
  //       expect(settings).toBeTruthy();
  //       expect(settings.commit).toBe('1234567890123456789012345678901234567890');
  //       expect(settings.ref).toBe('refs/heads/some-unqualified-ref');
  //     } finally {
  //       context.ref = originalRef;
  //     }
  //   });

  // it('requires qualified repo', async () => {
  //   process.env.GITHUB_TOKEN = 'token123';
  //   process.env.GITHUB_RUN_ID = '1';
  //   process.env.GITHUB_EVENT_NAME = 'issues.opened';
  //   process.env['INPUT_ISSUE-FORM'] = '{"s": "1"}';
  //   process.env.GITHUB_EVENT_PATH = require.resolve(
  //     '../fixtures/new-issue.json'
  //   );

  //   const output = [];
  //   const storeOutput = (data: never) => !!output.push(data);
  //   const origWrite = process.stdout.write;
  //   process.stdout.write = vi.fn(storeOutput);
  //   await run.run(app);
  //   process.stdout.write = origWrite;
  //   expect(output).toMatchInlineSnapshot(`
  //     [
  //       "::error::Bad credentials%0A{%0A  name: 'HttpError',%0A  id: '1',%0A  status: 401,%0A  response: {%0A    url: 'https://api.github.com/repos/redhat-plumbers-in-action/advanced-issue-labeler/contents/.github%252Fadvanced-issue-labeler.yml',%0A    status: 401,%0A    headers: {%0A      'access-control-allow-origin': '*',%0A      'access-control-expose-headers': 'ETag, Link, Location, Retry-After, X-GitHub-OTP, X-RateLimit-Limit, X-RateLimit-Remaining, X-RateLimit-Used, X-RateLimit-Resource, X-RateLimit-Reset, X-OAuth-Scopes, X-Accepted-OAuth-Scopes, X-Poll-Interval, X-GitHub-Media-Type, X-GitHub-SSO, X-GitHub-Request-Id, Deprecation, Sunset',%0A      connection: 'close',%0A      'content-length': '80',%0A      'content-security-policy': \\"default-src 'none'\\",%0A      'content-type': 'application/json; charset=utf-8',%0A      date: 'Mon, 29 Aug 2022 09:17:49 GMT',%0A      'referrer-policy': 'origin-when-cross-origin, strict-origin-when-cross-origin',%0A      server: 'GitHub.com',%0A      'strict-transport-security': 'max-age=31536000; includeSubdomains; preload',%0A      vary: 'Accept-Encoding, Accept, X-Requested-With',%0A      'x-content-type-options': 'nosniff',%0A      'x-frame-options': 'deny',%0A      'x-github-media-type': 'github.v3; param=raw',%0A      'x-github-request-id': '0E49:5614:308D583:3236650:630C843D',%0A      'x-ratelimit-limit': '60',%0A      'x-ratelimit-remaining': '58',%0A      'x-ratelimit-reset': '1661768213',%0A      'x-ratelimit-resource': 'core',%0A      'x-ratelimit-used': '2',%0A      'x-xss-protection': '0'%0A    },%0A    data: {%0A      message: 'Bad credentials',%0A      documentation_url: 'https://docs.github.com/rest'%0A    }%0A  },%0A  request: {%0A    method: 'GET',%0A    url: 'https://api.github.com/repos/redhat-plumbers-in-action/advanced-issue-labeler/contents/.github%252Fadvanced-issue-labeler.yml',%0A    headers: {%0A      accept: 'application/vnd.github.v3.raw',%0A      'user-agent': 'probot/12.2.4 octokit-core.js/3.6.0 Node.js/16.14.0 (linux; x64)',%0A      authorization: 'token [REDACTED]'%0A    },%0A    request: {}%0A  },%0A  event: {%0A    id: '1',%0A    name: 'issues.opened',%0A    payload: {%0A      head_commit: { id: 'headcommitsha123' },%0A      repository: {%0A        name: 'advanced-issue-labeler',%0A        owner: { login: 'redhat-plumbers-in-action' }%0A      }%0A    }%0A  },%0A  stack: 'HttpError: Bad credentials\\\\n' +%0A    '    at /home/jamacku/Source/forks/advanced-issue-labeler/node_modules/@octokit/request/dist-node/index.js:86:21\\\\n' +%0A    '    at processTicksAndRejections (node:internal/process/task_queues:96:5)\\\\n' +%0A    '    at async Job.doExecute (/home/jamacku/Source/forks/advanced-issue-labeler/node_modules/bottleneck/light.js:405:18)',%0A  type: 'Error'%0A}
  //     ",
  //       "::error::HttpError: Bad credentials%0A        at /home/jamacku/Source/forks/advanced-issue-labeler/node_modules/@octokit/request/dist-node/index.js:86:21%0A        at processTicksAndRejections (node:internal/process/task_queues:96:5)%0A        at async Job.doExecute (/home/jamacku/Source/forks/advanced-issue-labeler/node_modules/bottleneck/light.js:405:18)%0A{%0A  name: 'AggregateError',%0A  event: {%0A    id: '1',%0A    name: 'issues.opened',%0A    payload: {%0A      head_commit: { id: 'headcommitsha123' },%0A      repository: {%0A        name: 'advanced-issue-labeler',%0A        owner: { login: 'redhat-plumbers-in-action' }%0A      }%0A    }%0A  },%0A  errors: [%0A    {%0A      name: 'HttpError',%0A      status: 401,%0A      response: {%0A        url: 'https://api.github.com/repos/redhat-plumbers-in-action/advanced-issue-labeler/contents/.github%252Fadvanced-issue-labeler.yml',%0A        status: 401,%0A        headers: {%0A          'access-control-allow-origin': '*',%0A          'access-control-expose-headers': 'ETag, Link, Location, Retry-After, X-GitHub-OTP, X-RateLimit-Limit, X-RateLimit-Remaining, X-RateLimit-Used, X-RateLimit-Resource, X-RateLimit-Reset, X-OAuth-Scopes, X-Accepted-OAuth-Scopes, X-Poll-Interval, X-GitHub-Media-Type, X-GitHub-SSO, X-GitHub-Request-Id, Deprecation, Sunset',%0A          connection: 'close',%0A          'content-length': '80',%0A          'content-security-policy': \\"default-src 'none'\\",%0A          'content-type': 'application/json; charset=utf-8',%0A          date: 'Mon, 29 Aug 2022 09:17:49 GMT',%0A          'referrer-policy': 'origin-when-cross-origin, strict-origin-when-cross-origin',%0A          server: 'GitHub.com',%0A          'strict-transport-security': 'max-age=31536000; includeSubdomains; preload',%0A          vary: 'Accept-Encoding, Accept, X-Requested-With',%0A          'x-content-type-options': 'nosniff',%0A          'x-frame-options': 'deny',%0A          'x-github-media-type': 'github.v3; param=raw',%0A          'x-github-request-id': '0E49:5614:308D583:3236650:630C843D',%0A          'x-ratelimit-limit': '60',%0A          'x-ratelimit-remaining': '58',%0A          'x-ratelimit-reset': '1661768213',%0A          'x-ratelimit-resource': 'core',%0A          'x-ratelimit-used': '2',%0A          'x-xss-protection': '0'%0A        },%0A        data: {%0A          message: 'Bad credentials',%0A          documentation_url: 'https://docs.github.com/rest'%0A        }%0A      },%0A      request: {%0A        method: 'GET',%0A        url: 'https://api.github.com/repos/redhat-plumbers-in-action/advanced-issue-labeler/contents/.github%252Fadvanced-issue-labeler.yml',%0A        headers: {%0A          accept: 'application/vnd.github.v3.raw',%0A          'user-agent': 'probot/12.2.4 octokit-core.js/3.6.0 Node.js/16.14.0 (linux; x64)',%0A          authorization: 'token [REDACTED]'%0A        },%0A        request: {}%0A      },%0A      event: {%0A        id: '1',%0A        name: 'issues.opened',%0A        payload: {%0A          head_commit: { id: 'headcommitsha123' },%0A          repository: {%0A            name: 'advanced-issue-labeler',%0A            owner: { login: 'redhat-plumbers-in-action' }%0A          }%0A        }%0A      }%0A    }%0A  ],%0A  stack: 'AggregateError: \\\\n' +%0A    '    HttpError: Bad credentials\\\\n' +%0A    '        at /home/jamacku/Source/forks/advanced-issue-labeler/node_modules/@octokit/request/dist-node/index.js:86:21\\\\n' +%0A    '        at processTicksAndRejections (node:internal/process/task_queues:96:5)\\\\n' +%0A    '        at async Job.doExecute (/home/jamacku/Source/forks/advanced-issue-labeler/node_modules/bottleneck/light.js:405:18)\\\\n' +%0A    '    at /home/jamacku/Source/forks/advanced-issue-labeler/node_modules/@octokit/webhooks/dist-node/index.js:187:19\\\\n' +%0A    '    at async /home/jamacku/Source/forks/advanced-issue-labeler/test/integration/config.test.ts:59:5\\\\n' +%0A    '    at async runTest (/home/jamacku/Source/forks/advanced-issue-labeler/node_modules/vitest/dist/chunk-runtime-error.1104e45a.mjs:488:5)\\\\n' +%0A    '    at async runSuite (/home/jamacku/Source/forks/advanced-issue-labeler/node_modules/vitest/dist/chunk-runtime-error.1104e45a.mjs:576:13)\\\\n' +%0A    '    at async runSuite (/home/jamacku/Source/forks/advanced-issue-labeler/node_modules/vitest/dist/chunk-runtime-error.1104e45a.mjs:576:13)\\\\n' +%0A    '    at async runFiles (/home/jamacku/Source/forks/advanced-issue-labeler/node_modules/vitest/dist/chunk-runtime-error.1104e45a.mjs:620:5)\\\\n' +%0A    '    at async startTestsNode (/home/jamacku/Source/forks/advanced-issue-labeler/node_modules/vitest/dist/chunk-runtime-error.1104e45a.mjs:638:3)\\\\n' +%0A    '    at async /home/jamacku/Source/forks/advanced-issue-labeler/node_modules/vitest/dist/entry.mjs:76:9\\\\n' +%0A    '    at async Module.withEnv (/home/jamacku/Source/forks/advanced-issue-labeler/node_modules/vitest/dist/chunk-runtime-error.1104e45a.mjs:259:5)\\\\n' +%0A    '    at async run (/home/jamacku/Source/forks/advanced-issue-labeler/node_modules/vitest/dist/entry.mjs:71:5)\\\\n' +%0A    '    at async file:///home/jamacku/Source/forks/advanced-issue-labeler/node_modules/tinypool/dist/esm/worker.js:99:20',%0A  type: 'Error'%0A}
  //     ",
  //     ]
  //   `);
  // });

  //   it('roots path', () => {
  //     inputs.path = 'some-directory/some-subdirectory';
  //     const settings: IGitSourceSettings = inputHelper.getInputs();
  //     expect(settings.repositoryPath).toBe(
  //       join(gitHubWorkspace, 'some-directory', 'some-subdirectory')
  //     );
  //   });

  //   it('sets ref to empty when explicit sha', () => {
  //     inputs.ref = '1111111111222222222233333333334444444444';
  //     const settings: IGitSourceSettings = inputHelper.getInputs();
  //     expect(settings.ref).toBeFalsy();
  //     expect(settings.commit).toBe('1111111111222222222233333333334444444444');
  //   });

  //   it('sets sha to empty when explicit ref', () => {
  //     inputs.ref = 'refs/heads/some-other-ref';
  //     const settings: IGitSourceSettings = inputHelper.getInputs();
  //     expect(settings.ref).toBe('refs/heads/some-other-ref');
  //     expect(settings.commit).toBeFalsy();
  //   });
});
