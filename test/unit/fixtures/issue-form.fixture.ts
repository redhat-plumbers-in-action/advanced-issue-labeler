import { IssueForm } from '../../../src/issue-form';

export interface IIssueFormTestContext {
  issueForms: IssueForm[];
  blockLists: string[][];
  invalid: IssueForm[];
}

export const issueFormContextFixture: IIssueFormTestContext = {
  issueForms: [
    new IssueForm({}),
    // issue: https://github.com/redhat-plumbers-in-action/advanced-issue-labeler/issues/171
    new IssueForm({
      type: 'Feature Request, none, other',
      description:
        'Security guidelines provided by GitHub: [Security hardening for GitHub Actions ](https://docs.github.com/en/actions/security-guides/security-hardening-for-github-actions#overview)',
      solution:
        "Let's review the document from GitHub regarding GitHub Actions and security. And make Advanced Issue Labeler more secure!\n\nSecurity is a long-term goal, not one of, so it would be great to have some ci check or checkbox in the Pull Request template to ensure that when reviewing new code, we comply with best security policies and guidelines.",
    }),
    // issue: https://github.com/systemd/systemd/issues/25737
    new IssueForm({
      version: '252.3-1',
      distro: 'Arch Linux',
      kernel: '6.0.12-arch1-1 and 5.15.82-1-lts',
      architecture: 'x86_64',
      component: 'bootctl, systemd-boot, other',
      'expected-behaviour': 'System booting correctly with systemd-boot.',
      'unexpected-behaviour':
        'System hangs immediately after choosing the boot-entry, just showing a black screen with the following message in top left corner in red letters:\n\nFailed to open random seed file: Media changed\r\nError opening root path: Invalid Parameter',
      'steps-to-reproduce':
        "- Coming from systemd 251.7-4 (which worked flawlessly) and updating to 252.3-1.\r\n- Running 'bootctl update'\r\n- Reboot\n\nUpdating to 252.3-1 WITHOUT running 'bootctl update' afterwards works fine. The system boots without any problems.\n\nSo the problem seems really systemd-boot related. Maybe something in 'systemd-bootx64.efi\" have changed and my Lenovo E15 Gen 2 doesn't like that.",
      'additional-information': '',
    }),
  ],

  blockLists: [[], ['other'], ['block1', 'block2', 'other', 'none']],

  invalid: [
    // @ts-expect-error: Let's ignore a type error, it's required for testing
    new IssueForm(),
    // @ts-expect-error: Let's ignore a type error, it's required for testing
    new IssueForm(undefined),
    // @ts-expect-error: Let's ignore a type error, it's required for testing
    new IssueForm(null),
    new IssueForm('form'),
  ],
};
