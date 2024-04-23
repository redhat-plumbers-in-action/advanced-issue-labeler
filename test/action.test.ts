import { Octokit } from '@octokit/core';
import { afterEach, beforeEach, describe, expect, test, vi } from 'vitest';

import action from '../src/action';
import { CustomOctokit } from '../src/octokit';

import {
  basicConfig,
  emptyConfig,
  templateConfig,
} from './unit/config.fixture';
import { basicForm, dropdownForm } from './unit/issue-form.fixture';

function setDefaultInputs() {
  // Path to configuration file
  vi.stubEnv('INPUT_CONFIG-PATH', '.github/advanced-issue-labeler.yml');
  // GitHub token used to set issue labels
  vi.stubEnv('INPUT_TOKEN', 'mock-token');
}

const mocks = vi.hoisted(() => {
  const octokitCore = {
    '@octokit/core': {
      request: vi.fn(),
      config: {
        get: vi.fn(),
      },
    },
  };

  const actionsCore = {
    '@actions/core': {
      error: vi.fn(),
      setOutput: vi.fn(),
    },
  };

  return {
    ...octokitCore,
    ...actionsCore,
  };
});

// Mock @octokit/core module
vi.mock('@octokit/core', () => {
  const Octokit = vi.fn(() => ({
    request: mocks['@octokit/core'].request,
    config: {
      get: mocks['@octokit/core'].config.get,
    },
  }));
  return { Octokit };
});

// Mock @actions/core module
vi.mock('@actions/core', async () => {
  const actual = await vi.importActual('@actions/core');
  return {
    ...(actual as any),
    error: mocks['@actions/core'].error,
    setOutput: mocks['@actions/core'].setOutput,
  };
});

// Mock @actions/github module
vi.mock('@actions/github', () => {
  vi.stubEnv(
    'GITHUB_REPOSITORY',
    'redhat-plumbers-in-action/advanced-issue-labeler'
  );

  return {
    context: {
      repo: {
        owner: process.env['GITHUB_REPOSITORY']?.split('/')[0],
        repo: process.env['GITHUB_REPOSITORY']?.split('/')[1],
      },
      issue: {
        number: 1,
      },
    },
  };
});

describe('Integration test', () => {
  beforeEach(() => {
    // Mock Action environment
    vi.stubEnv('RUNNER_DEBUG', '1');
    vi.stubEnv(
      'GITHUB_REPOSITORY',
      'redhat-plumbers-in-action/advanced-issue-labeler'
    );

    // Mock GitHub API
    vi.mocked(mocks['@octokit/core'].request).mockImplementation(path => {
      switch (path) {
        case 'POST /repos/{owner}/{repo}/issues/{issue_number}/labels':
          return {
            status: 200,
            data: {},
          };

        default:
          throw new Error(`Unexpected endpoint: ${path}`);
      }
    });

    vi.mocked(mocks['@actions/core'].setOutput).mockImplementation(
      (name, value) => {
        vi.stubEnv(`OUTPUT_${name.toUpperCase()}`, value);
      }
    );
  });

  afterEach(() => {
    vi.restoreAllMocks();
    vi.unstubAllEnvs();
  });

  test('Input based labeling - basic', async () => {
    setDefaultInputs();
    vi.stubEnv('INPUT_ISSUE-FORM', JSON.stringify(basicForm));
    vi.stubEnv('INPUT_SECTION', 'severity');

    vi.mocked(mocks['@octokit/core']).config.get.mockImplementation(
      async (params: { owner: string; repo: string; path: string }) => {
        expect(params).toMatchInlineSnapshot(`
          {
            "owner": "redhat-plumbers-in-action",
            "path": ".github/advanced-issue-labeler.yml",
            "repo": "advanced-issue-labeler",
          }
        `);
        return Promise.resolve({ config: emptyConfig });
      }
    );

    // Run action
    const octokit = new Octokit({ auth: 'mock-token' });
    await action(octokit as CustomOctokit);

    // Check outputs
    expect(process.env['OUTPUT_LABELS']).toMatchInlineSnapshot(`"["High"]"`);
    expect(process.env['OUTPUT_POLICY']).toMatchInlineSnapshot(
      `"{"template":"","section":{"severity":["High"]}}"`
    );

    // Check if the action has set the labels
    expect(vi.mocked(mocks['@octokit/core'].request)).toHaveBeenCalledTimes(1);
    expect(vi.mocked(mocks['@octokit/core'].request)).toHaveBeenCalledWith(
      'POST /repos/{owner}/{repo}/issues/{issue_number}/labels',
      {
        owner: 'redhat-plumbers-in-action',
        repo: 'advanced-issue-labeler',
        issue_number: 1,
        labels: ['High'],
      }
    );
  });

  test('Input based labeling - block-list', async () => {
    setDefaultInputs();
    vi.stubEnv('INPUT_ISSUE-FORM', JSON.stringify(dropdownForm));
    vi.stubEnv('INPUT_SECTION', 'type');
    vi.stubEnv('INPUT_BLOCK-LIST', 'other\nnone\nOther');

    vi.mocked(mocks['@octokit/core']).config.get.mockImplementation(
      async (params: { owner: string; repo: string; path: string }) => {
        expect(params).toMatchInlineSnapshot(`
          {
            "owner": "redhat-plumbers-in-action",
            "path": ".github/advanced-issue-labeler.yml",
            "repo": "advanced-issue-labeler",
          }
        `);
        return Promise.resolve({ config: emptyConfig });
      }
    );

    // Run action
    const octokit = new Octokit({ auth: 'mock-token' });
    await action(octokit as CustomOctokit);

    // Check outputs
    expect(process.env['OUTPUT_LABELS']).toMatchInlineSnapshot(
      `"["Bug Report","Feature Request"]"`
    );
    expect(process.env['OUTPUT_POLICY']).toMatchInlineSnapshot(
      `"{"template":"","section":{"type":["Bug Report","Feature Request"]}}"`
    );

    // Check if the action has set the labels
    expect(vi.mocked(mocks['@octokit/core'].request)).toHaveBeenCalledTimes(1);
    expect(vi.mocked(mocks['@octokit/core'].request)).toHaveBeenCalledWith(
      'POST /repos/{owner}/{repo}/issues/{issue_number}/labels',
      {
        owner: 'redhat-plumbers-in-action',
        repo: 'advanced-issue-labeler',
        issue_number: 1,
        labels: ['Bug Report', 'Feature Request'],
      }
    );
  });

  test('Config based labeling - default template', async () => {
    setDefaultInputs();
    vi.stubEnv('INPUT_ISSUE-FORM', JSON.stringify(dropdownForm));

    vi.mocked(mocks['@octokit/core']).config.get.mockImplementation(
      async (params: { owner: string; repo: string; path: string }) => {
        expect(params).toMatchInlineSnapshot(`
          {
            "owner": "redhat-plumbers-in-action",
            "path": ".github/advanced-issue-labeler.yml",
            "repo": "advanced-issue-labeler",
          }
        `);
        return Promise.resolve({ config: basicConfig });
      }
    );

    // Run action
    const octokit = new Octokit({ auth: 'mock-token' });
    await action(octokit as CustomOctokit);

    // Check outputs
    expect(process.env['OUTPUT_LABELS']).toMatchInlineSnapshot(
      `"["bug 🐛","RFE 🎁"]"`
    );
    expect(process.env['OUTPUT_POLICY']).toMatchInlineSnapshot(
      `"{"template":"","section":{"type":["bug 🐛","RFE 🎁"]}}"`
    );

    // Check if the action has set the labels
    expect(vi.mocked(mocks['@octokit/core'].request)).toHaveBeenCalledTimes(1);
    expect(vi.mocked(mocks['@octokit/core'].request)).toHaveBeenCalledWith(
      'POST /repos/{owner}/{repo}/issues/{issue_number}/labels',
      {
        owner: 'redhat-plumbers-in-action',
        repo: 'advanced-issue-labeler',
        issue_number: 1,
        labels: ['bug 🐛', 'RFE 🎁'],
      }
    );
  });

  test('Config based labeling - advanced example/multiple sections', async () => {
    setDefaultInputs();
    vi.stubEnv('INPUT_ISSUE-FORM', JSON.stringify(dropdownForm));
    vi.stubEnv('INPUT_TEMPLATE', 'bug.yml');

    vi.mocked(mocks['@octokit/core']).config.get.mockImplementation(
      async (params: { owner: string; repo: string; path: string }) => {
        expect(params).toMatchInlineSnapshot(`
          {
            "owner": "redhat-plumbers-in-action",
            "path": ".github/advanced-issue-labeler.yml",
            "repo": "advanced-issue-labeler",
          }
        `);
        return Promise.resolve({ config: templateConfig });
      }
    );

    // Run action
    const octokit = new Octokit({ auth: 'mock-token' });
    await action(octokit as CustomOctokit);

    // Check outputs
    expect(process.env['OUTPUT_LABELS']).toMatchInlineSnapshot(
      `"["bug 🐛","RFE 🎁","high"]"`
    );
    expect(process.env['OUTPUT_POLICY']).toMatchInlineSnapshot(
      `"{"template":"bug.yml","section":{"type":["bug 🐛","RFE 🎁"],"severity":["high"]}}"`
    );

    // Check if the action has set the labels
    expect(vi.mocked(mocks['@octokit/core'].request)).toHaveBeenCalledTimes(1);
    expect(vi.mocked(mocks['@octokit/core'].request)).toHaveBeenCalledWith(
      'POST /repos/{owner}/{repo}/issues/{issue_number}/labels',
      {
        owner: 'redhat-plumbers-in-action',
        repo: 'advanced-issue-labeler',
        issue_number: 1,
        labels: ['bug 🐛', 'RFE 🎁', 'high'],
      }
    );
  });

  test('No labels to set', async () => {
    setDefaultInputs();
    vi.stubEnv('INPUT_ISSUE-FORM', JSON.stringify(basicForm));
    vi.stubEnv('INPUT_SECTION', 'nonexistent');

    vi.mocked(mocks['@octokit/core']).config.get.mockImplementation(
      async (params: { owner: string; repo: string; path: string }) => {
        expect(params).toMatchInlineSnapshot(`
          {
            "owner": "redhat-plumbers-in-action",
            "path": ".github/advanced-issue-labeler.yml",
            "repo": "advanced-issue-labeler",
          }
        `);
        return Promise.resolve({ config: emptyConfig });
      }
    );

    // Run action
    const octokit = new Octokit({ auth: 'mock-token' });
    await action(octokit as CustomOctokit);

    // Check outputs
    expect(process.env['OUTPUT_LABELS']).toMatchInlineSnapshot(`"[]"`);
    expect(process.env['OUTPUT_POLICY']).toMatchInlineSnapshot(
      `"{"template":"","section":{}}"`
    );

    expect(vi.mocked(mocks['@octokit/core'].request)).toHaveBeenCalledTimes(0);
  });

  test('Wrong issue form format', async () => {
    setDefaultInputs();
    vi.stubEnv('INPUT_ISSUE-FORM', 'wrong');
    vi.stubEnv('INPUT_SECTION', 'nonexistent');

    vi.mocked(mocks['@octokit/core']).config.get.mockImplementation(
      async (params: { owner: string; repo: string; path: string }) => {
        expect(params).toMatchInlineSnapshot(`
          {
            "owner": "redhat-plumbers-in-action",
            "path": ".github/advanced-issue-labeler.yml",
            "repo": "advanced-issue-labeler",
          }
        `);
        return Promise.resolve({ config: emptyConfig });
      }
    );

    // Run action
    const octokit = new Octokit({ auth: 'mock-token' });
    try {
      await action(octokit as CustomOctokit);
    } catch (error) {
      expect(error.message).toMatchInlineSnapshot(
        `"Unexpected token 'w', "wrong" is not valid JSON"`
      );
    }

    expect(vi.mocked(mocks['@octokit/core'].request)).toHaveBeenCalledTimes(0);

    // Test wrong JSON format
    vi.stubEnv('INPUT_ISSUE-FORM', JSON.stringify('wrong'));

    // Run action
    try {
      await action(octokit as CustomOctokit);
    } catch (error) {
      expect(error.message).toMatchInlineSnapshot(
        `
        "Incorrect format of provided 'issue-form' input: [
          {
            "code": "invalid_type",
            "expected": "object",
            "received": "string",
            "path": [],
            "message": "Expected object, received string"
          }
        ]"
      `
      );
    }

    expect(vi.mocked(mocks['@octokit/core'].request)).toHaveBeenCalledTimes(0);
  });
});
